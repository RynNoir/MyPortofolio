export type ProjectCategory = "backend" | "mobile" | "software-engineering";

export type ProjectCover =
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      /** A real excerpt from the project's source code, shown in an editor-style frame. */
      type: "code";
      file: string;
      code: string;
    };

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectStackGroup {
  group: string;
  items: string[];
}

export interface ArchitectureLayer {
  label: string;
  items: string[];
}

export interface FlowStep {
  label: string;
  detail: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  device: "desktop" | "mobile";
}

/**
 * Every case-study field is optional. The detail page renders only the
 * sections that have content, so leave a field out rather than filling it
 * with placeholder text.
 */
export interface CaseStudy {
  overview?: string[];
  problem?: string[];
  solution?: string[];
  features?: ProjectFeature[];
  stack?: ProjectStackGroup[];
  contribution?: string[];
  architecture?: {
    description?: string;
    layers: ArchitectureLayer[];
  };
  flow?: {
    title: string;
    description?: string;
    steps: FlowStep[];
  };
  challenges?: ProjectFeature[];
  decisions?: ProjectFeature[];
  results?: string[];
  lessons?: string[];
  screenshots?: ProjectScreenshot[];
}

export interface Project {
  slug: string;
  title: string;
  /** Hidden from the website until set to true. */
  published: boolean;
  featured: boolean;
  categories: ProjectCategory[];
  /** One or two sentences for cards and metadata. */
  summary: string;
  /** e.g. "Academic team project" */
  context?: string;
  role?: string;
  period?: string;
  technologies: string[];
  /** Two to four short highlights shown on the project card. */
  highlights: string[];
  cover: ProjectCover;
  links: {
    repository?: string | null;
    demo?: string | null;
  };
  caseStudy: CaseStudy;
}
