export interface ResumeData {
  character: CharacterCardData;
  basic_info: BasicInfo;
  work_experience: WorkExperience[];
  about_me: AboutMe;
  timeline_items: TimelineItem[];
}

export interface CharacterCardData {
  name: string;
  avatar_url: string;
  mp_skills: {
    title: string;
    description: string;
  }[];
  debuffs: {
    title: string;
    description: string;
  }[];
  activation_command: {
    type: string;
    description: string;
  };
}

export interface BasicInfo {
  full_name: string;
  tagline: string;
  // Unified Affiliation Info
  affiliation: {
    organization: string; // School or Company
    department: string;   // Faculty or Dept
    role: string;         // Grade or Job Title
    period: string;       // Grad year or "Present"
    status: "student" | "professional"; // To toggle icons/labels if needed
  };
  links: {
    url: string;
    label: string;
  }[];
  qualifications: string[];
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface AboutMe {
  strengths: string[];
  vision: string;
}

export interface TimelineItem {
  title: string;
  content: string;
}
