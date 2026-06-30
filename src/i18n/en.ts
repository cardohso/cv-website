/**
 * English content dictionary.
 *
 * This file is the single source of truth for all visible copy + links.
 * Everything here is plain data so that adding a European Portuguese ("pt")
 * version later is just: copy this file to `pt.ts`, translate the strings,
 * and register it in `index.ts`.
 *
 * Look for `TODO` markers below — those are the values only you can fill in.
 */

export const en = {
  meta: {
    lang: 'en',
    title: 'João Cardoso — AI Engineering',
    description:
      'AI engineering — LLM evaluation, RAG, and agent systems. Final-year Computer Engineering student at ISEC, Coimbra.',
  },

  nav: {
    brand: 'João Cardoso',
    skipToContent: 'Skip to content',
    toggleTheme: 'Toggle color theme',
    links: [
      { href: '#projects', label: 'Projects' },
      { href: '#writing', label: 'Writing' },
      { href: '#about', label: 'About' },
      { href: '#contact', label: 'Contact' },
    ],
  },

  hero: {
    eyebrow: 'AI Engineering Intern',
    name: 'João Cardoso',
    tagline: 'AI engineering — LLM evaluation, RAG, agent systems',
    intro:
      'I build and measure the reliability of LLM-powered systems. Currently an AI engineering intern working on LLM evaluation pipelines, retrieval-augmented generation, and agent orchestration. Final-year Computer Engineering student at ISEC in Coimbra, Portugal.',
    ctaEmailLabel: 'Email me',
    ctaGitHubLabel: 'GitHub',
  },

  projects: {
    heading: 'Projects',
    intro: 'Selected work in evaluation, retrieval, and agent systems.',
    featuredBadge: 'Anchor project',
    viewCaseStudy: 'Read the case study',
    items: [
      {
        // ---- ANCHOR PROJECT: most prominent card, links to the case study ----
        featured: true,
        title: 'LLM-as-a-Judge Evaluation Pipeline',
        description:
          'A testing-and-observability system that measures the reliability of a RAG assistant using decomposed LLM-as-a-Judge evaluators (Relevance, Helpfulness, Correctness, Hallucination) plus retrieval-stage metrics — wired into CI for automated regression detection.',
        tags: ['LLM-as-a-Judge', 'Evaluation', 'Langfuse', 'CI/CD', 'RAG'],
        // Internal link to the content-collection case study.
        href: '/case-studies/llm-as-a-judge-evaluation-pipeline',
        external: false,
      },
      {
        featured: false,
        title: 'RAG Retrieval System',
        // TODO: replace with a real description of your RAG work.
        description:
          'TODO: short description of the retrieval-augmented generation system — data sources, chunking/embedding strategy, retrieval evaluation, and what problem it solves.',
        tags: ['RAG', 'Embeddings', 'Retrieval'],
        href: '', // TODO: link to a repo, demo, or future case study (leave '' to render a non-link card)
        external: true,
      },
      {
        featured: false,
        title: 'Agent Orchestration',
        // TODO: replace with a real description of your agent work.
        description:
          'TODO: short description of the agent-orchestration work — tools, planning/routing, guardrails, and the outcome.',
        tags: ['Agents', 'Orchestration', 'Tooling'],
        href: '', // TODO
        external: true,
      },
    ],
  },

  writing: {
    heading: 'Selected writing',
    intro: 'Research and notes on evaluating generative-AI systems.',
    items: [
      {
        title:
          'Validation and Testing of Generative AI Systems for Due Diligence',
        venue: 'CAPSI 2026 — research in progress',
        description:
          'A testing & observability methodology using decomposed LLM-as-a-Judge evaluators to validate generative-AI systems applied to due diligence.',
        // TODO: add the public link once the paper is available.
        href: '', // TODO: CAPSI paper URL
        external: true,
        status: 'Research in progress',
      },
    ],
  },

  about: {
    heading: 'About',
    // Each string is a paragraph.
    paragraphs: [
      'I’m a final-year Computer Engineering student at ISEC (Instituto Superior de Engenharia de Coimbra), currently doing an internship focused on AI engineering.',
      'My day-to-day is LLM evaluation pipelines, retrieval-augmented generation, and agent orchestration — with a particular interest in how you measure and trust the output of these systems rather than just shipping them.',
      'European Portuguese is my first language; I work comfortably in English. Outside of that, I care about clean, fast, accessible software and tools that make systems observable.',
    ],
    photoAlt: 'Portrait of João Cardoso', // used as the alt text for the profile photo
  },

  contact: {
    heading: 'Get in touch',
    intro:
      'Open to conversations about AI engineering, evaluation, and internships or graduate roles.',
    emailLabel: 'Email',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
  },

  footer: {
    // {year} is replaced at build time.
    copyright: '© {year} João Cardoso',
    builtWith: 'Built with Astro & Tailwind CSS',
  },

  /**
   * Profile / contact details and asset paths.
   * These are shared across components — fill in the TODOs here once.
   */
  profile: {
    name: 'João Cardoso',

    // TODO: your contact email (used for the hero CTA and contact section).
    email: 'TODO@example.com',

    github: 'https://github.com/cardohso',
    githubHandle: 'github.com/cardohso',

    // TODO: your LinkedIn profile URL.
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'

    // Profile photo: drop a real image in /public and update this path.
    // A placeholder SVG ships in /public/profile-placeholder.svg.
    photo: '/profile-placeholder.svg',
  },
} as const;

export type SiteContent = typeof en;
