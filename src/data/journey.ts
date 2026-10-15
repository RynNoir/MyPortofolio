import { siteConfig } from "@/data/site-config";

const { education } = siteConfig;

export type JourneyKind = "education" | "organization" | "achievement" | "certification" | "project";

export interface JourneyItem {
  kind: JourneyKind;
  title: string;
  organization: string;
  /** Leave out when unknown. Never guess dates. */
  period?: string;
  location?: string;
  description?: string;
  points?: string[];
  credentialUrl?: string | null;
  /** Slug of a related project; renders a link to its case study. */
  projectSlug?: string;
}

export const journeyKindLabels: Record<JourneyKind, string> = {
  education: "Education",
  organization: "Organization",
  achievement: "Achievement",
  certification: "Certification",
  project: "Project",
};

/** Timeline entries, newest first. */
export const timeline: JourneyItem[] = [
  {
    kind: "achievement",
    title: "1st Place — PENS Hackathon 2026",
    organization: "Politeknik Elektronika Negeri Surabaya (PENS)",
    period: "Oct 2026",
    description: "Winner of the Digital Campus Worker category with TalentLink, an AI digital worker that matches students to research and competition teams.",
    projectSlug: "talentlink",
  },
  {
    kind: "organization",
    title: "Public Relations Department",
    organization: "BEM KM Politeknik Negeri Padang",
    period: "Sep 2025 — Oct 2025",
    location: "Padang, Indonesia",
    points: [
      "Coordinated the scheduling and allocation of campus buildings for student organizations, keeping event transitions free of scheduling conflicts.",
      "Drafted and managed official venue lease proposals and compliance documents for university approval.",
      "Acted as the liaison between the Student Executive Board, university administration, and student organizations, and resolved venue and logistics issues during live events.",
    ],
  },
  {
    kind: "education",
    title: `${education.degree}, ${education.program}`,
    organization: education.institution,
    period: `${education.startYear} — ${education.graduationYear ?? (education.status === "graduate" ? "Graduated" : "Present")}`,
    location: "Padang, Indonesia",
    description: education.gpa ? `GPA ${education.gpa}` : undefined,
  },
  {
    kind: "education",
    title: "Natural Science",
    organization: "SMA Negeri 01 Pancung Soal",
    period: "2021 — 2024",
  },
];

export const certifications: JourneyItem[] = [
  {
    kind: "certification",
    title: "HCIA-Cloud Service V3.5 Course",
    organization: "Huawei Talent",
    credentialUrl: null,
  },
  {
    kind: "certification",
    title: "HCIA-Cloud Computing V5.5 Course",
    organization: "Huawei Talent",
    credentialUrl: null,
  },
];
