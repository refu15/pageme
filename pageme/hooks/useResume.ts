import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ResumeData } from '@/lib/types';
import { useRouter } from 'next/navigation';

export function useResume(userId: string | null) {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        // 1. Initial Fetch
        const fetchResume = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('resume_data')
                    .eq('id', userId)
                    .single();

                if (error) {
                    console.error('Error fetching resume:', error);
                }

                if (data && data.resume_data) {
                    setResumeData(data.resume_data as ResumeData);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();

        // 2. Realtime Subscription
        const channel = supabase
            .channel('resume_updates')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${userId}`,
                },
                (payload) => {
                    console.log('Realtime update received:', payload);
                    if (payload.new && payload.new.resume_data) {
                        setResumeData(payload.new.resume_data as ResumeData);
                        // Optional: Redirect if on onboarding and data arrives
                        // router.push(`/${payload.new.username}`);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, router]);

    return { resumeData, loading };
}
