import avatar from "@/assets/profile/avatar.jpg";
import portrait from "@/assets/profile/portrait.jpg";

/**
 * Central profile configuration.
 *
 * Optional links are `null` until they exist. A `null` value is never
 * rendered as a link, so it is safe to leave a field empty.
 */
export const siteConfig = {
  name: "Reyhan Dwi Saputra",
  shortName: "Reyhan",
  initials: "RDS",
  role: "Software Engineer",
  positioning: "Software Engineer | Backend & Flutter Developer",
  headline: "Engineering solutions. Solving real problems.",
  intro:
    "I build backend systems and Flutter applications that turn ideas into practical digital solutions.",
  description:
    "Information Technology student at Politeknik Negeri Padang, focused on backend development, Flutter mobile applications, and building practical digital solutions through software engineering and problem-solving.",
  location: "Padang, Indonesia",

  /**
   * Profile photos (src/assets/profile). Static imports give next/image the
   * size and a blur placeholder. To change them, replace the two files:
   * avatar.jpg is a square face crop, portrait.jpg a 4:5 portrait.
   */
  photo: {
    avatar,
    portrait,
    alt: "Portrait of Reyhan Dwi Saputra standing on a coastal road with the sea behind him",
  },

  education: {
    institution: "Politeknik Negeri Padang",
    program: "Information Technology",
    degree: "Diploma III",
    gpa: "3.6" as string | null,
    startYear: "2024",
    /** e.g. "2027". Leave null until the date is official. */
    graduationYear: null as string | null,
    /**
     * "student" shows "Information Technology Student" in the hero and
     * "2024 — Present" in the timeline. Switch to "graduate" (and set
     * graduationYear) after graduating, then update `description` too.
     */
    status: "student" as "graduate" | "student",
  },

  email: "reyhandwisaputra1234@gmail.com",
  social: {
    github: "https://github.com/RynNoir",
    linkedin: "https://id.linkedin.com/in/reyhan-dwi-saputra-367a16440" as string | null,
  },

  /** Path inside /public. Set to null to hide every "Download CV" button. */
  cvPath: "/documents/cv.pdf" as string | null,

  /** Shown in the hero only when `enabled` is true. */
  availability: {
    enabled: false,
    label: "Open to junior backend & Flutter roles",
  },
} as const;

export const navigation = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "Approach", id: "approach" },
  { label: "Skills", id: "skills" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];
