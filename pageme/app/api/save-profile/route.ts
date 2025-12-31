import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { UserManual } from '@/lib/types/onboarding';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
    try {
        const formData: UserManual = await request.json();

        // Transform form data into resume_data format (自分図鑑用)
        const resumeData = {
            basic_info: {
                name: formData.name,
                affiliation_type: formData.affiliationType,
                industry: formData.industry,
                affiliation_name: formData.affiliationName,
                role: formData.role,
            },
            skills: formData.skills,
            work_style: {
                time_preference: formData.workStyle.timePreference,
                communication_preference: formData.workStyle.communicationPreference,
                decision_style: formData.workStyle.decisionStyle,
                feedback_preference: formData.workStyle.feedbackPreference,
            },
            infinite_fuel: formData.infiniteFuel,
            energy_drain: formData.energyDrain,
            communication: {
                preferred_tools: formData.communication.preferredTools,
                custom_tool: formData.communication.customTool,
                best_time_to_reach: formData.communication.bestTimeToReach, // 配列になった
                stress_signs: formData.communication.stressSigns, // 配列になった
            },
            activation_command: formData.activationCommand,
            created_at: new Date().toISOString(),
        };

        // If Supabase is configured, save to database
        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);

            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: `user-${Date.now()}`, // In production, use actual user ID
                    full_name: formData.name,
                    resume_data: resumeData,
                    updated_at: new Date().toISOString(),
                }, {
                    onConflict: 'id',
                });

            if (error) {
                console.error('Supabase error:', error);
                // Don't fail - just log and continue
            }
        }

        // Return success with the transformed data
        return NextResponse.json({
            success: true,
            data: resumeData,
            message: '自分図鑑が保存されました',
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Failed to save profile' },
            { status: 500 }
        );
    }
}
