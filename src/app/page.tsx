import { ApproachSection } from "@/components/sections/approach-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { siteConfig } from "@/data/site-config";
import { getSiteUrl, usableUrl } from "@/lib/utils";

function PersonJsonLd() {
  const sameAs = [siteConfig.social.github, siteConfig.social.linkedin]
    .map((url) => usableUrl(url))
    .filter((url): url is string => url !== null);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: getSiteUrl().toString(),
    image: new URL(siteConfig.photo.portrait.src, getSiteUrl()).toString(),
    email: `mailto:${siteConfig.email}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: siteConfig.education.institution },
    address: { "@type": "PostalAddress", addressLocality: "Padang", addressCountry: "ID" },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      // Static, trusted data; "<" is escaped to keep the script tag safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <HeroSection />
      <ProjectsSection />
      <ApproachSection />
      <SkillsSection />
      <JourneySection />
      <ContactSection />
    </>
  );
}
