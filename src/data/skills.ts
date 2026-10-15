export type SkillIcon = "server" | "smartphone" | "database" | "shield";

export interface Skill {
  name: string;
  /** Short note on where or how the skill was applied. */
  note?: string;
  /** Slug of a project that demonstrates this skill. */
  evidence?: string;
  /**
   * Only confirmed skills are shown. Keep unconfirmed ones here with
   * `confirmed: false` and switch them on once you can back them up.
   */
  confirmed: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: SkillIcon;
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    icon: "server",
    description: "Server-side logic, data access, and access control.",
    skills: [
      { name: "PHP", confirmed: true, evidence: "ppdb-smp" },
      { name: "Laravel", note: "Laravel 13, Breeze, policies, service classes", evidence: "siedu", confirmed: true },
      {
        name: "Authentication & RBAC",
        note: "Role middleware, policies, bcrypt, session auth",
        evidence: "siedu",
        confirmed: true,
      },
      {
        name: "Business logic",
        note: "Quota-based, multi-pathway selection",
        evidence: "ppdb-smp",
        confirmed: true,
      },
      { name: "REST API", confirmed: false },
      { name: "API validation", confirmed: false },
      { name: "Error handling", confirmed: false },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: "smartphone",
    description: "Cross-platform apps with Flutter.",
    skills: [
      { name: "Flutter", confirmed: true },
      { name: "Dart", confirmed: true },
      { name: "State management", confirmed: false },
      { name: "API integration", confirmed: false },
      { name: "Mobile UI implementation", confirmed: false },
    ],
  },
  {
    id: "data-tools",
    title: "Data & Tools",
    icon: "database",
    description: "Databases, version control, and supporting libraries.",
    skills: [
      { name: "MySQL", note: "Relational schema design", evidence: "ppdb-smp", confirmed: true },
      { name: "Git", confirmed: true },
      { name: "VS Code", confirmed: true },
      { name: "Leaflet.js & OpenStreetMap", evidence: "ppdb-smp", confirmed: true },
      { name: "Chart.js", evidence: "ppdb-smp", confirmed: true },
      { name: "GitHub", note: "Branches, pull requests, team repos", evidence: "talentlink", confirmed: true },
      { name: "Postman", confirmed: false },
    ],
  },
  {
    id: "quality",
    title: "Software Quality",
    icon: "shield",
    description: "Practices that keep software safe and maintainable.",
    skills: [
      {
        name: "Security fundamentals",
        note: "CSRF protection, bcrypt, prepared statements",
        evidence: "ppdb-smp",
        confirmed: true,
      },
      {
        name: "Testing & QA",
        note: "Pest feature tests; smoke tests and bug bash at a hackathon",
        evidence: "siedu",
        confirmed: true,
      },
      { name: "Debugging", confirmed: false },
      {
        name: "Code organization",
        note: "Service layer, form requests, policies",
        evidence: "siedu",
        confirmed: true,
      },
      {
        name: "Documentation",
        note: "READMEs, PRD, technical write-ups",
        evidence: "talentlink",
        confirmed: true,
      },
    ],
  },
];

export function getVisibleSkillGroups(): SkillGroup[] {
  return skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.confirmed) }))
    .filter((group) => group.skills.length > 0);
}
