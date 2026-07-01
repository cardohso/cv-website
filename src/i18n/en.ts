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
    title: 'João Pedro Cardoso — AI Engineering',
    description:
      'AI engineering — LLM evaluation, RAG, and agent systems. Final-year Computer Engineering student at ISEC, Coimbra.',
  },

  nav: {
    brand: 'João Pedro Cardoso',
    skipToContent: 'Skip to content',
    toggleTheme: 'Toggle color theme',
    links: [
      { href: '#projects', label: 'Projects' },
      { href: '#writing', label: 'Research' },
      { href: '#about', label: 'About' },
      { href: '#contact', label: 'Contact' },
    ],
  },

  hero: {
    eyebrow: 'AI Engineering Intern',
    name: 'João Pedro Cardoso',
    tagline: 'AI engineering — LLM evaluation, RAG, reliability',
    intro:
      'A final-year Computer Engineering student working on LLM evaluation and RAG systems. I build the testing and observability layer that tells you whether a generative AI system’s answers are actually reliable, not just plausible — LLM-as-a-Judge pipelines, retrieval metrics, and CI/CD tooling that catch regressions before they reach production.',
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
          'Built a decomposed evaluation suite for a production RAG assistant: instead of one blended quality score, an LLM judge scores every answer on relevance, helpfulness, correctness, and hallucination, each grounded against the source document. Added retrieval-stage metrics (context precision, recall, relevance) so a bad answer can be traced to retrieval or generation, then wired the whole suite into CI with an LLM-driven layer that flags meaningful score drops between runs, not just raw diffs.',
        // NOTE: these tags name tools used on your internship's system (Langfuse,
        // GitHub Actions). The case study prose deliberately keeps them generic and
        // flags "confirm before naming". Confirm it's OK to name your stack publicly,
        // or genericize these before pushing (site auto-deploys to a public URL).
        tags: ['LLM-as-a-Judge', 'Langfuse', 'GitHub Actions', 'Python', 'RAG evaluation'],
        // Internal link to the content-collection case study.
        href: '/case-studies/llm-as-a-judge-evaluation-pipeline',
        external: false,
      },
      {
        featured: false,
        title: 'RAG Retrieval System',
        description:
          'Built and maintained the retrieval layer of a production RAG system: reconciliation tooling to keep a search index consistent with its source documents, a scheduled cleanup job that removes drift automatically, and a set of evaluators (context precision, recall, and relevance) that continuously measure retrieval quality instead of assuming it. The goal was to stop treating retrieval as a black box the model either gets lucky with or doesn’t.',
        // [VERIFY] Describes the infra-and-evaluation side of RAG, not the core
        // retrieval/ranking algorithm. Rewrite if you did more on the core logic.
        // NOTE: these tags name your employer's production stack — confirm before publishing.
        tags: ['Azure AI Search', 'Neo4j', 'LlamaParse', 'Python', 'Kubernetes'],
        href: '', // add a repo/demo link, or leave '' for a non-link card
        external: true,
      },
      {
        featured: false,
        title: 'LLM-Judge Bias & Reliability Research',
        description:
          'Investigated whether the LLM judges scoring the pipeline’s own outputs were biased toward answers from their own model family: reviewed the self-preference bias literature and designed a cross-model benchmarking protocol to test it. Extended that into a reliability study — repeated executions to quantify run-to-run variance in judge scores, and cross-judge comparisons to test whether conclusions hold up under a different evaluator.',
        tags: ['LLM-as-a-Judge', 'Bias evaluation', 'Statistics', 'Claude', 'GPT-4.1'],
        href: '', // add a link if/when there's something public to point to
        external: true,
      },
    ],
  },

  writing: {
    heading: 'Research',
    intro: 'Research and notes on evaluating generative-AI systems.',
    items: [
      {
        // [VERIFY] Title corrected to the CAPSI paper's (the earlier title was your
        // internship report's). [VERIFY] Confirm author order (likely co-authored
        // with your academic — possibly company — supervisor).
        title:
          'Testing and Observability for Non-Deterministic Generative-AI Pipelines: A Due-Diligence Case Study',
        venue: 'CAPSI 2026 — research-in-progress track',
        description:
          'Proposes a testing and observability methodology for production generative-AI pipelines, built around four decomposed, source-grounded LLM-as-a-Judge evaluators (relevance, helpfulness, correctness, hallucination) plus retrieval-stage metrics, wired into CI.',
        // No public PDF yet — keep href empty so it renders as "in review", not a broken link.
        href: '',
        external: true,
        status: 'In review',
      },
    ],
  },

  about: {
    heading: 'About',
    // Each string is a paragraph.
    paragraphs: [
      'I’m a final-year Computer Engineering student at ISEC (Instituto Superior de Engenharia de Coimbra), in Coimbra, Portugal.',
      'I’m currently doing an AI-engineering internship at Salus Optima, building generative AI tools for financial due diligence. My work sits on the layer that makes a production RAG and multi-agent system trustworthy: LLM-as-a-Judge evaluation, retrieval-quality metrics, and CI/CD pipelines that catch regressions before they reach users.',
      'What interests me technically is the gap between an LLM giving an answer and that answer being correct. Non-deterministic systems break most of the testing habits engineers grow up with, so a lot of my work has been rebuilding those habits from scratch: designing evaluators that don’t just agree with each other by default, checking whether a judge model is quietly biased toward its own outputs, and treating statistical rigor (repeated runs, variance, inter-judge agreement) as part of shipping AI, not an afterthought.',
    ],
    photoAlt: 'Portrait of João Pedro Cardoso', // used as the alt text for the profile photo
  },

  contact: {
    heading: 'Get in touch',
    intro:
      'Open to conversations about AI engineering, evaluation, and graduate roles.',
    emailLabel: 'Email',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
  },

  footer: {
    // {year} is replaced at build time.
    copyright: '© {year} João Pedro Cardoso',
    builtWith: 'Built with Astro & Tailwind CSS',
  },

  /**
   * Profile / contact details and asset paths.
   * These are shared across components — fill in the TODOs here once.
   */
  profile: {
    name: 'João Pedro Cardoso',

    // Contact email (used for the hero CTA and contact section).
    email: 'joaocavacocardoso@gmail.com',

    github: 'https://github.com/cardohso',
    githubHandle: 'github.com/cardohso',

    linkedin: 'https://www.linkedin.com/in/cardohso',

    // Profile photo (served from /public).
    photo: '/profile-placeholder.jpeg',
  },
} as const;

export type SiteContent = typeof en;
