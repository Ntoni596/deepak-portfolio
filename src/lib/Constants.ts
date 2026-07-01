import type { NavLink, SocialLink } from "@/types/index";

export const SITE = {
  name: "Deepak Joshi",
  title: "Deepak Joshi — Frontend Developer & UI/UX Designer",
  description:
    "Melbourne-based frontend developer building production interfaces with React, Next.js, and Tailwind. Available for new opportunities.",
  url: "https://deepakjoshi.dev",
  email: "joshi.rai.deepak@gmail.com",
  github: "https://github.com/Ntoni596",
  linkedin: "https://linkedin.com/in/deepakjoshinz",
  location: "Melbourne, AU",
};

export const NAV_LINKS: NavLink[] = [
  { label: "projects", href: "#projects" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: SITE.github, mono: "github.com/Ntoni596" },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    mono: "linkedin.com/in/deepakjoshinz",
  },
  { label: "Email", href: `mailto:${SITE.email}`, mono: SITE.email },
];
