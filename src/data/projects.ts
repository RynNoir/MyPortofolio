import type { Project, ProjectCategory } from "@/types/project";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "software-engineering", label: "Software Engineering" },
];

/**
 * Project data. Every statement below is taken from the resume or from the
 * public repository (README, docs/, and source code). Do not add numbers,
 * users, or results that cannot be verified.
 *
 * To add a project: copy an entry, give it a unique `slug`, and set
 * `published: true` once its content is final.
 */
export const projects: Project[] = [
  {
    // Source: github.com/RynNoir/SIEDU (README, app/Services). Sole contributor.
    slug: "siedu",
    title: "SIEDU — Lecturer Evaluation System",
    published: true,
    featured: true,
    categories: ["backend", "software-engineering"],
    summary:
      "A Laravel application for student evaluations of lecturers in the Department of Information Technology, Politeknik Negeri Padang, with anonymous feedback, role-based dashboards, and semester promotion.",
    context: "Solo project",
    role: "Sole developer",
    period: "2026",
    technologies: ["Laravel 13", "PHP 8.3", "MySQL", "Tailwind CSS v4", "Alpine.js", "htmx", "Pest"],
    highlights: [
      "Four roles (admin, lecturer, student, head of study program) protected by role middleware, policies, and a forced password change on first login.",
      "Anonymous by design: student IDs are never exposed, and written feedback only appears once an assignment reaches a minimum number of respondents.",
      "Semester promotion with a dry-run preview, safe to re-run, and blocked while an evaluation period is still open.",
    ],
    cover: {
      type: "code",
      file: "app/Services/AssignmentResultService.php",
      code: `$threshold = (int) config('evaluation.anonymity_min_respondents');
$impressions = collect();

if ($respondents >= $threshold) {
    // Select eksplisit — tanpa student_id (PRD §8).
    $rows = DB::table('evaluation_impressions as i')
        ->join('evaluations as e', 'i.evaluation_id', '=', 'e.id')
        ->where('e.course_class_assignment_id', $assignment->id)
        ->selectRaw('i.impression_text, i.suggestion_text, ...')
        ->get();
}

return compact('respondents', 'categoryScores', 'impressions');`,
    },
    links: {
      repository: "https://github.com/RynNoir/SIEDU",
      demo: null,
    },
    caseStudy: {
      overview: [
        "SIEDU (Sistem Evaluasi Dosen Terpadu) manages how students evaluate their lecturers in the Department of Information Technology at Politeknik Negeri Padang.",
        "Each evaluation has two parts: a structured questionnaire on a 1–5 star scale grouped by category (subject mastery, interaction, discipline, assessment and feedback, overall), and free-text impressions and suggestions that lecturers see anonymously.",
      ],
      problem: [
        "Evaluations were collected through manual forms or Google Forms. That made it hard to keep students anonymous while still giving lecturers and heads of study programs results they could analyse by category.",
        "The system also had to follow the department's academic structure: classes that move up together as cohorts, a fixed package curriculum per semester, team-taught courses, and both D3 and D4 programs.",
      ],
      solution: [
        "A Laravel application with four roles. Admins manage master data, lecturer assignments, and evaluation periods. Students fill in evaluations for the active period. Lecturers and heads of study programs get dashboards with scores per category, participation rates, and CSV exports.",
        "Anonymity is enforced in the data layer rather than the UI: queries for lecturers never select the student, and written feedback stays hidden until enough students have responded.",
      ],
      features: [
        {
          title: "Structured evaluations",
          description:
            "Star-scale questions grouped by category plus anonymous impressions. Team-taught courses appear as a separate form per lecturer.",
        },
        {
          title: "Evaluation periods",
          description:
            "Periods move from draft to open to closed. Only one period can be open; opening a new one closes the previous one automatically.",
        },
        {
          title: "Bulk student import",
          description:
            "CSV import flow: download a template, upload, preview each row with the reason it would be rejected, then confirm.",
        },
        {
          title: "Role-based dashboards",
          description:
            "Lecturers see results for their own courses with filters by class, period, and rating. Heads of study programs see aggregates locked to their own program and can compare parallel classes.",
        },
        {
          title: "Progress monitoring",
          description:
            "The admin dashboard lists completion per class, lowest first, so admins know which classes need a reminder.",
        },
        {
          title: "Semester promotion & alumni",
          description:
            "Moves active students up one semester at the end of each period, moves cohorts to the next class level, and marks final-semester students as graduates.",
        },
      ],
      stack: [
        { group: "Backend", items: ["PHP 8.3", "Laravel 13", "Laravel Breeze (customised for 4 roles)"] },
        { group: "Database", items: ["MySQL / MariaDB", "12 core tables"] },
        { group: "Frontend", items: ["Blade", "Tailwind CSS v4", "Alpine.js", "htmx", "Vite"] },
        { group: "Quality", items: ["Pest v4", "Laravel Pint"] },
      ],
      contribution: [
        "Built the application end to end as the only contributor to the repository: data model, business logic, role-based access, interface, and tests.",
        "Wrote the supporting documents: a product requirements document, a UI design guideline, and a phased development plan.",
      ],
      architecture: {
        description: "Simplified view based on the repository structure (app/Http, app/Services, app/Console).",
        layers: [
          { label: "Users", items: ["Admin", "Student", "Lecturer", "Head of study program"] },
          {
            label: "HTTP layer",
            items: ["Role middleware", "EnsurePasswordChanged", "Form request validation", "Controllers per role", "Policies"],
          },
          {
            label: "Services",
            items: [
              "AssignmentResultService",
              "EvaluationProgressService",
              "EvaluationExportService",
              "SemesterPromotionService",
              "StudentImportService",
            ],
          },
          { label: "Data & CLI", items: ["MySQL — 12 tables", "php artisan semester:promote"] },
        ],
      },
      flow: {
        title: "Evaluation lifecycle",
        description: "From setting up a period to promoting students, as described in the README.",
        steps: [
          { label: "Set up", detail: "Admins prepare master data and assign lecturers to course, class, and period combinations." },
          { label: "Open a period", detail: "Only one period is open at a time. Opening a new one closes the previous one." },
          {
            label: "Submit",
            detail: "Students evaluate each course–lecturer pair. A unique database constraint blocks double submissions.",
          },
          { label: "Aggregate", detail: "Average scores per category and participation rates are calculated per assignment." },
          {
            label: "Reveal feedback",
            detail: "Impressions are shown, and exported, only after the minimum number of respondents (5 by default) is reached.",
          },
          {
            label: "Close & promote",
            detail: "Promotion runs with a dry-run preview first and is blocked while any period is still open.",
          },
        ],
      },
      challenges: [
        {
          title: "Anonymity without losing usefulness",
          description:
            "Lecturers need specific feedback, but a small class or a narrow filter could reveal who wrote it. No filter is granular enough to identify an individual.",
        },
        {
          title: "Encoding academic rules",
          description:
            "Course semesters must match the class level, semesters 7–8 exist only for D4 programs, and course parity must match the period type.",
        },
        {
          title: "A promotion that can be re-run",
          description:
            "Running promotion twice must not move students twice, so it filters students by the parity of their current semester.",
        },
      ],
      decisions: [
        {
          title: "Constraints in the database",
          description:
            "Unique keys on evaluations prevent double submissions, while assignments are unique per course, lecturer, class, and period so team teaching still works.",
        },
        {
          title: "Business logic in service classes",
          description:
            "Results, progress, exports, imports, and promotion live in dedicated services, keeping controllers thin and the rules testable.",
        },
        {
          title: "CSV that opens cleanly in Excel",
          description:
            "Exports use UTF-8 with BOM, semicolons, and decimal commas so they read correctly in Indonesian-locale Excel, without extra dependencies.",
        },
        {
          title: "Charts without a chart library",
          description: "Score charts and meters are drawn with SVG and CSS.",
        },
      ],
      results: [
        "A Pest test suite covers authentication, role access, admin CRUD, lecturer assignments, evaluation submission, the anonymity threshold, CSV import and export, semester promotion, progress tracking, data deletion integrity, security, and end-to-end flows.",
      ],
    },
  },
  {
    // Source: github.com/rifqimaulanaakbar22/TalentLink-Campus (README, lib/worker).
    // Role taken from the README's "Team responsibilities" table.
    // 1st place at PENS Hackathon 2026 confirmed by Reyhan.
    slug: "talentlink",
    title: "TalentLink — AI Digital Worker for Campus Talent",
    published: true,
    featured: true,
    categories: ["software-engineering"],
    summary:
      "A hackathon prototype of AI digital workers that recommend students for research projects and competition teams. Every recommendation cites evidence that can be opened, and every action waits for human approval.",
    context: "Hackathon team project · 3 members",
    role: "QA & Release Engineer, pitch lead",
    period: "Oct 2026",
    technologies: ["Next.js 16", "React 19", "TypeScript", "SQLite (libSQL)", "Zod", "Vitest", "LLM API"],
    highlights: [
      "Built for the Digital Campus Worker track at PENS Hackathon 2026, where the team won 1st place.",
      "The LLM only reads the request and writes reasons. Scores, eligibility, and ranking are computed in code, and every evidence ID the AI cites is verified.",
      "Owned QA and release: evaluation cases, smoke tests, bug bash, README and technical docs, demo video, and the final release tag.",
    ],
    cover: {
      type: "code",
      file: "lib/worker/verify.ts",
      code: `/** Alasan sah hanya jika punya minimal satu ID
 *  dan semua ID-nya ada di paket kandidat itu. */
function filterReasons(reasons: Reason[], allowed: Set<string>) {
  const kept = reasons.filter(
    (r) =>
      r.evidence_ids.length > 0 &&
      r.evidence_ids.every((id) => allowed.has(id)) &&
      r.text.trim() !== "",
  );
  return { kept, dropped: reasons.length - kept.length };
}`,
    },
    links: {
      repository: "https://github.com/rifqimaulanaakbar22/TalentLink-Campus",
      demo: null,
    },
    caseStudy: {
      overview: [
        "TalentLink Campus is a team of AI \"digital workers\" for a campus, built in two days at PENS Hackathon 2026 (Digital Campus Worker track, 9–10 October 2026, Surabaya). Netra acts as a research talent officer for lecturers; Jaya builds competition teams for student affairs staff.",
        "It is a localhost prototype. All student data is synthetic and labelled as such in the UI, and invitations are simulated: no real email or WhatsApp messages are sent.",
      ],
      problem: [
        "Campuses already hold evidence of student ability — grades, projects, certificates, awards, assistant roles — but it is scattered and rarely used to make decisions.",
        "Lecturers pick research members from memory, staff screen competition requirements by hand, students without formal awards stay invisible, and a general AI chatbot can invent reasons that cannot be trusted for academic decisions.",
      ],
      solution: [
        "Digital workers with a job title, a supervisor, a knowledge base, and limited access rights. AI is used for only two things: understanding the request and writing the reasons. Scoring, filtering, eligibility, and ranking run in code.",
        "Each reason must cite evidence IDs from the candidate's own record. Invalid citations are dropped, the explanation is retried once, and a template reason is used as a fallback. Nothing is sent until a human approves it.",
      ],
      features: [
        {
          title: "Research matching (Netra)",
          description:
            "A lecturer describes a need in plain language and receives an evidence-backed shortlist with a draft invitation. Unclear requests trigger a clarifying question.",
        },
        {
          title: "Competition teams (Jaya)",
          description:
            "Staff paste a competition guidebook; Jaya extracts the requirements, checks eligibility with written reasons, builds teams, and flags conflicts.",
        },
        {
          title: "Evidence panel",
          description: "Every cited evidence ID opens a panel showing the type, title, details, and year of that evidence.",
        },
        {
          title: "Approval gate",
          description: "Sending without approval returns 403. Each decision is recorded with the user who made it.",
        },
        {
          title: "Fairness signals",
          description:
            "Hidden Talent highlights strong students without awards; Fair Exposure flags students who are already heavily involved. Names, gender, and photos are not used for scoring or sent to the AI.",
        },
        {
          title: "Token ledger & budget brake",
          description:
            "Every LLM call is logged with its token usage. The server blocks the comparison mode at 80% of the budget and all new runs at 95%.",
        },
      ],
      stack: [
        { group: "Frontend", items: ["Next.js 16 App Router", "React 19", "Tailwind CSS 4"] },
        { group: "API", items: ["Route Handlers", "Zod 4 validation"] },
        { group: "Data", items: ["SQLite via @libsql/client", "Drizzle schema"] },
        { group: "AI", items: ["OpenAI-compatible LLM gateway", "Qwen models"] },
        { group: "Testing", items: ["Vitest with a mocked LLM"] },
      ],
      contribution: [
        "Validated the problem with mentors and lecturers, and confirmed the API endpoints and submission limits.",
        "Prepared evaluation cases, ran smoke tests, and ran a bug bash.",
        "Wrote the README and the technical write-up (tech.md).",
        "Produced the demo video and slides, led the pitch, and managed the release tag and final commit.",
      ],
      architecture: {
        description: "Simplified from the architecture diagram in the project README.",
        layers: [
          { label: "Browser", items: ["Team", "Assign", "Run detail", "Token ledger", "Login"] },
          {
            label: "Next.js server",
            items: ["proxy.ts session check", "Route Handlers + Zod", "Service layer + budget brake", "Worker pipelines", "LLM client + token ledger"],
          },
          { label: "Data", items: ["SQLite (libSQL)", "Synthetic talent graph"] },
          { label: "External", items: ["LLM gateway (Qwen)"] },
        ],
      },
      flow: {
        title: "Research matching pipeline",
        description: "Seven steps per run. Only parse and explain call the LLM.",
        steps: [
          { label: "Parse", detail: "LLM turns the brief into JSON criteria, or asks a clarifying question when the brief is vague." },
          { label: "Normalize", detail: "Code maps skill names to a catalog through aliases; unknown required skills stop the run." },
          { label: "Search & score", detail: "One SQL query finds eligible students; code scores them 0–100 and adds fairness flags." },
          { label: "Explain", detail: "LLM writes two or three reasons per top candidate, each citing evidence IDs." },
          { label: "Verify", detail: "Code drops reasons with foreign IDs, retries once, then falls back to template reasons." },
          { label: "Brief & approve", detail: "The shortlist waits for the lecturer's approval before a simulated invitation is sent." },
        ],
      },
      decisions: [
        {
          title: "Keep the AI away from the ranking",
          description: "With the LLM limited to parsing and explaining, a run makes at most two LLM calls plus one retry, and ranking stays deterministic.",
        },
        {
          title: "Verify citations, not just format",
          description: "A reason is kept only if every evidence ID it cites belongs to that candidate's package.",
        },
        {
          title: "Isolate untrusted data in prompts",
          description: "Student data is wrapped in <data> tags so instructions hidden inside it are ignored. A planted prompt-injection profile is part of the acceptance tests.",
        },
        {
          title: "Economy mode for tokens",
          description: "Only the top five candidates and at most four evidence items each are sent to the LLM.",
        },
      ],
      results: [
        "Final retest on 10 October 2026: 99 of 99 automated tests passing (Vitest), lint and type checks clean.",
        "In one measured pair of runs against the real API, economy mode used 2,109 tokens versus 15,608 for the comparison mode.",
        "Not done yet, as stated in the README: the evaluation script for precision@3 and committed end-to-end test scripts.",
      ],
    },
  },
  {
    slug: "ppdb-smp",
    title: "PPDB SMP — Student Admission System",
    published: true,
    featured: false,
    categories: ["backend", "software-engineering"],
    summary:
      "A web-based junior high school admission system for Padang City, covering online registration, document verification, automated multi-pathway selection, and result announcement.",
    context: "Academic team project",
    role: "Developer",
    period: "2026",
    technologies: ["PHP", "MySQL", "Leaflet.js", "OpenStreetMap", "Chart.js", "Bootstrap 5"],
    highlights: [
      "Automated selection across four admission pathways with per-school quotas and distance-based prioritization.",
      "Interactive maps with district boundary polygons and markers for 20 public schools.",
      "Admin dashboard with analytics, document verification, and role-based access control.",
    ],
    cover: {
      type: "code",
      file: "admin/seleksi/fungsi_seleksi.php",
      code: `while ($row = mysqli_fetch_assoc($result_1)) {
    if ($lulus_count < $kuota) {
        $status = 'lulus';
        $pilihan_diterima = 1;
        $lulus_count++;
    } else {
        $status = 'tidak_lulus';
        $pilihan_diterima = NULL;
    }
    simpan_hasil_func($conn, $row, $ranking_global, ...);
    $ranking_global++;
}

$sisa_kuota = $kuota - $lulus_count;`,
    },
    links: {
      repository: "https://github.com/RynNoir/PPDB-SMP",
      demo: null,
    },
    caseStudy: {
      overview: [
        "PPDB SMP is a web application for running junior high school admissions (Penerimaan Peserta Didik Baru) in Padang City. It brings registration, document checks, selection, and result announcement into one system with a single database.",
        "It was built as an academic team project. Students register and apply online, school operators verify documents, and super admins run the selection and publish results.",
      ],
      problem: [
        "School admission is a chain of dependent steps: applicants register, upload supporting documents, choose a pathway and schools, get verified, and are then ranked against limited seats. Each admission pathway has different eligibility rules and a different ranking order.",
        "The system had to keep these steps consistent from registration to announcement, apply each pathway's rules the same way for every applicant, and keep school operators limited to their own school's data.",
      ],
      solution: [
        "A PHP and MySQL web application with three entry points sharing one database: a public landing page with school information and maps, a student portal, and an admin panel for super admins and school operators.",
        "Selection runs per school and per pathway, on verified registrations only. Seats are filled from first-choice applicants, and any remaining seats are offered to applicants who listed the school as their second choice. Results are then published for students to check and print.",
      ],
      features: [
        {
          title: "Student portal",
          description:
            "Account registration with NISN/NIK validation, biodata with the home location set on a map, one admission pathway, and two school choices.",
        },
        {
          title: "Document upload & verification",
          description:
            "General documents plus pathway-specific ones (affirmation, achievement certificates, transfer letters), each verified by an operator before selection.",
        },
        {
          title: "Automated multi-pathway selection",
          description:
            "Zoning, achievement, affirmation, and relocation pathways, each with its own eligibility filter and ranking order, bounded by per-school quotas.",
        },
        {
          title: "Interactive maps",
          description:
            "Leaflet.js with OpenStreetMap tiles, GeoJSON boundaries for Padang's 11 districts, and markers for 20 public junior high schools.",
        },
        {
          title: "Admin dashboard & reporting",
          description:
            "Chart.js analytics, quota and schedule management, result publication, PDF report export, and an activity log.",
        },
        {
          title: "Role-based access control",
          description:
            "Super admins manage every school and run selection. School operators only see and verify data from their own school.",
        },
      ],
      stack: [
        { group: "Backend", items: ["PHP", "MySQLi prepared statements", "Session management"] },
        { group: "Database", items: ["MySQL / MariaDB", "11 relational tables"] },
        { group: "Frontend", items: ["Bootstrap 5", "JavaScript"] },
        { group: "Maps & charts", items: ["Leaflet.js", "OpenStreetMap", "Turf.js", "GeoJSON", "Chart.js"] },
        { group: "Security", items: ["CSRF tokens", "bcrypt password hashing", "Role-based access control"] },
      ],
      contribution: [
        "Developed the web-based admission flow covering online registration, document upload, school selection, and result announcement.",
        "Implemented automated selection across four admission pathways (zoning, achievement, affirmation, relocation) with quota management and distance-based prioritization using GPS coordinates.",
        "Integrated interactive maps with Leaflet.js and OpenStreetMap, including district boundary polygons and markers for 20 public schools.",
        "Built the admin dashboard with Chart.js analytics, document verification, and role-based access control (super admin and school operator), secured with CSRF protection, bcrypt hashing, and prepared statements.",
      ],
      architecture: {
        description:
          "Simplified view of the system, derived from the repository structure. All three entry points run on the same PHP application and database.",
        layers: [
          {
            label: "Clients",
            items: ["Public landing page", "Student portal", "Admin panel (super admin · operator)"],
          },
          {
            label: "PHP application",
            items: [
              "Auth, sessions & CSRF",
              "RBAC & per-school data filter",
              "Registration & documents",
              "Selection engine",
              "Reports & export",
            ],
          },
          {
            label: "Data",
            items: ["MySQL — 11 tables", "Uploaded documents"],
          },
          {
            label: "In the browser",
            items: ["Leaflet.js + OpenStreetMap", "Turf.js point-in-polygon", "Chart.js"],
          },
        ],
      },
      flow: {
        title: "Selection pipeline",
        description:
          "How one school and one pathway are processed, as implemented in admin/seleksi/fungsi_seleksi.php.",
        steps: [
          {
            label: "Filter",
            detail:
              "Take only registrations marked as verified for this school, pathway, and academic year.",
          },
          {
            label: "Check eligibility",
            detail:
              "Affirmation, achievement, and relocation applicants need a validated supporting document. Achievement certificates must be at most three years old.",
          },
          {
            label: "Rank",
            detail:
              "Zoning, affirmation, and relocation: distance, then age, then registration time. Achievement: average report grade first, then the same tie-breakers.",
          },
          {
            label: "Fill first choice",
            detail: "Accept applicants in ranked order until the pathway quota is reached.",
          },
          {
            label: "Fill second choice",
            detail:
              "Offer remaining seats to second-choice applicants, ranked by the same rules using their distance to this school.",
          },
          {
            label: "Publish",
            detail: "Store ranking and status for every applicant, then publish results to the student portal.",
          },
        ],
      },
      challenges: [
        {
          title: "Ranking that is deterministic",
          description:
            "Two applicants can share the same distance or grade. Each pathway needed a full ordering so the result never depends on database row order.",
        },
        {
          title: "Using leftover seats fairly",
          description:
            "Seats not taken by first-choice applicants had to go to second-choice applicants without anyone being accepted twice.",
        },
        {
          title: "One admin panel, many schools",
          description:
            "Operators from different schools share the same admin panel but must only see and verify their own school's applicants.",
        },
      ],
      decisions: [
        {
          title: "Ranking rules as ordered sort keys",
          description:
            "Each pathway maps to an explicit ORDER BY with tie-breakers (distance, birth date, registration time), which keeps the rules readable and easy to audit.",
        },
        {
          title: "Two-pass selection per school",
          description:
            "The first pass fills seats from first choices; the second pass only runs when quota remains, using distance to the second-choice school.",
        },
        {
          title: "Direct distance instead of a zoning radius",
          description:
            "Version 1.2.0 removed the radius-based zoning feature and ranks by the direct home-to-school distance, calculated with the Haversine formula.",
        },
        {
          title: "Security at the data layer",
          description:
            "Queries use MySQLi prepared statements, forms carry a per-session CSRF token generated with random_bytes, and passwords are hashed with bcrypt.",
        },
      ],
    },
  },
  {
    // Source: github.com/qifor27/laundry-D-four-system (README, docs/registration-flow.md).
    // Contribution taken from commits by RynNoir (Jan 2026).
    slug: "dfour-laundry",
    title: "D'four Laundry Management System",
    published: true,
    featured: false,
    categories: ["backend"],
    summary:
      "A PHP laundry management system for customers, orders, and pricing, with a portal where customers can follow the status of their laundry.",
    context: "Team project",
    role: "Contributor",
    period: "Dec 2025 — Jan 2026",
    technologies: ["PHP (PDO)", "MySQL", "Tailwind CSS", "JavaScript"],
    highlights: [
      "Dashboard with sales statistics, customer and transaction management, and automatic price calculation per service.",
      "Customer accounts with email verification, password reset, and Google sign-in, linked to existing customer records by phone number.",
      "Reworked the customer dashboard to load a customer's orders by the signed-in user's phone number instead of name matching.",
    ],
    cover: {
      type: "code",
      file: "api/auth/register.php",
      code: `// cek apakah phone sudah ada di customers
$stmt = $db->prepare("select id from customers where phone = ?");
$stmt->execute([$phone]);
$existingCustomer = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existingCustomer){
    // link user customer existing
    $stmt = $db->prepare("UPDATE customers SET user_id = ?,
    registered_at = NOW() WHERE id = ?");
    $stmt->execute([$userId, $existingCustomer['id']]);
} else {
    // Buat customer baru
    ...
}`,
    },
    links: {
      repository: "https://github.com/qifor27/laundry-D-four-system",
      demo: null,
    },
    caseStudy: {
      overview: [
        "D'four Laundry is a management system for a laundry business, built with native PHP, MySQL, and Tailwind CSS. Staff manage customers and orders, and customers can check the progress of their order online.",
        "Customers who first came in as walk-ins can later create an account. Registration links the new account to their existing customer record through their phone number, so their order history follows them.",
      ],
      features: [
        {
          title: "Dashboard",
          description: "Daily and monthly sales statistics, active orders, total customers, and recent transactions.",
        },
        {
          title: "Customers & transactions",
          description:
            "Create, edit, and delete customers; create orders with automatic pricing per service type; update order status and filter by status.",
        },
        {
          title: "Order tracking portal",
          description: "Customers check their order status by phone number, with a visual progress indicator.",
        },
        {
          title: "Customer accounts",
          description: "Email registration with verification, password reset, and Google sign-in.",
        },
      ],
      stack: [
        { group: "Backend", items: ["PHP native", "PDO", "JSON endpoints"] },
        { group: "Database", items: ["MySQL", "customers · transactions · service_types · users"] },
        { group: "Frontend", items: ["Tailwind CSS", "Vanilla JavaScript", "AJAX forms"] },
      ],
      contribution: [
        "Reworked the customer dashboard so it finds the signed-in customer's record and orders through their phone number, replacing a name-based match.",
        "Fixed base-URL resolution in the authentication helpers so pages in nested folders resolve the project root correctly.",
        "Updated the admin seed script to include a phone number, matching the account-to-customer linking model.",
        "Documented the customer registration flow and collected design references for the admin, login, and customer pages.",
      ],
      decisions: [
        {
          title: "Phone number as the linking key",
          description:
            "Walk-in customers are recorded by phone number, so registration matches on it: an existing customer record is linked to the new account, otherwise a new one is created.",
        },
        {
          title: "Basic web security",
          description:
            "PDO prepared statements, input sanitisation, output escaping with htmlspecialchars, CSRF tokens, session management, and foreign key constraints.",
        },
      ],
    },
  },
];

export function getPublishedProjects(): Project[] {
  return projects.filter((project) => project.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getCategoryLabel(id: ProjectCategory): string {
  return projectCategories.find((category) => category.id === id)?.label ?? id;
}
