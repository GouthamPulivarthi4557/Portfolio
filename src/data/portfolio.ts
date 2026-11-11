/**
 * Single source of truth for all portfolio content.
 *
 * Every component reads from this file instead of hard-coding text, so updating
 * the resume means editing data here — never JSX. The types below document the
 * shape of each section and let TypeScript catch typos or missing fields.
 *
 * Source: Goutham_Pulivarthi.pdf (resume). Phone number intentionally omitted.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Profile {
  name: string
  title: string
  location: string
  /** One-liner used under the name in the hero billboard. */
  tagline: string
  /** Short paragraph for the hero / "More Info" panel. */
  summary: string
  yearsOfExperience: string
  /** Domains worked in — shown as genre-style tags in the hero. */
  domains: string[]
  /** Resume "Profile Summary" bullets, kept for the More Info panel. */
  highlights: string[]
}

export interface Contact {
  email: string
  linkedin: string
  /** Display-friendly LinkedIn handle (no protocol). */
  linkedinLabel: string
}

/** One resume bullet, presented as an "episode" of a season. */
export interface Episode {
  /** Short episode-style title summarizing the bullet. */
  title: string
  /** The resume bullet text. */
  description: string
  /** Optional headline metric, highlighted in the UI (e.g. "~20%"). */
  metric?: string
  tech: string[]
}

/** One job, presented as a "season" of the career series. */
export interface Season {
  /** 1-based, chronological (Season 1 = first job). */
  number: number
  company: string
  role: string
  location: string
  start: string
  end: string
  /** Short teaser line for the season card. */
  synopsis: string
  episodes: Episode[]
}

/** A portfolio project, presented as an "Original". */
export interface Project {
  id: string
  title: string
  /** true until real project details are provided — UI shows a "Coming soon" badge. */
  placeholder: boolean
  tagline: string
  description: string
  tech: string[]
  highlights: string[]
  githubUrl?: string
  liveUrl?: string
}

/** A row in the skills section (rendered as a horizontally scrolling row). */
export interface SkillCategory {
  id: string
  title: string
  skills: string[]
}

/** A measurable result, shown in the Hiring Manager "Top 4" impact row. */
export interface ImpactHighlight {
  /** Percentage improvement (the resume states these as approximate). */
  value: number
  /** Short headline completing "~20% …". */
  headline: string
  company: string
  /** Key technology behind the result. */
  tech: string
  /** Resume wording, for the card's fine print. */
  detail: string
}

export interface Education {
  school: string
  degree: string
  location: string
  graduation: string
}

// ─── Site sections ───────────────────────────────────────────────────────────

/**
 * Page sections, in default order. `id` is the DOM id each section renders with,
 * so it doubles as the anchor target for navbar links (#seasons, #contact, ...).
 * `as const` makes TypeScript infer literal types, so SectionId is the union
 * 'home' | 'seasons' | ... rather than plain `string`.
 */
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'impact', label: 'Impact' },
  { id: 'about', label: 'About' },
  { id: 'seasons', label: 'Seasons' },
  { id: 'originals', label: 'Originals' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

// ─── "Who's watching?" viewer profiles ───────────────────────────────────────

export type ViewerProfileId = 'recruiter' | 'engineer' | 'manager'

export interface ViewerProfile {
  id: ViewerProfileId
  label: string
  /** Shown under the tile: why this order suits this viewer. */
  blurb: string
  /** Avatar tile background (Tailwind classes). */
  tileClass: string
  /**
   * Sections to render for this viewer, in order. Home stays first and Contact
   * last for everyone. Sections can also be left out entirely: only the
   * Hiring Manager profile includes 'impact'.
   */
  order: SectionId[]
}

export const viewerProfiles: ViewerProfile[] = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    blurb: 'Experience first, then a quick skills scan',
    tileClass: 'bg-gradient-to-br from-red-500 to-red-800',
    order: ['home', 'seasons', 'skills', 'about', 'originals', 'contact'],
  },
  {
    id: 'engineer',
    label: 'Engineer',
    blurb: 'Projects and tech stack first',
    tileClass: 'bg-gradient-to-br from-sky-500 to-blue-800',
    order: ['home', 'originals', 'skills', 'seasons', 'about', 'contact'],
  },
  {
    id: 'manager',
    label: 'Hiring Manager',
    blurb: 'Measurable impact first, then the story',
    tileClass: 'bg-gradient-to-br from-amber-400 to-orange-700',
    order: ['home', 'impact', 'about', 'seasons', 'originals', 'skills', 'contact'],
  },
]

/** Order used before a profile is picked, or when the visitor skips. */
export const defaultOrder: SectionId[] = ['home', 'seasons', 'originals', 'skills', 'contact']

// ─── Content ─────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: 'Goutham Pulivarthi',
  title: 'Java Full Stack Developer',
  location: 'San Francisco, California',
  tagline: 'Java · Spring Boot · React · Microservices',
  summary:
    'Java Full Stack Developer with 5+ years of experience designing, developing, testing, and deploying enterprise web applications across banking, energy, and payment domains using Java, Spring Boot, Microservices, and RESTful APIs.',
  yearsOfExperience: '5+',
  domains: ['Payments', 'Energy', 'Banking'],
  highlights: [
    'Strong experience building end-to-end applications using React, JavaScript, TypeScript, HTML5, CSS3, Spring MVC, Spring Data JPA, Hibernate, and Spring Security, with a focus on scalable and maintainable application design.',
    'Hands-on experience developing event-driven applications using Apache Kafka, integrating frontend applications with REST APIs, optimizing SQL and relational databases, and implementing secure backend services.',
    'Experienced with AWS, Docker, Kubernetes, Jenkins, Maven, Git, JUnit, Mockito, Postman, CI/CD, and Agile Scrum methodologies, including cross-functional collaboration on AI/ML initiatives.',
    'Strong understanding of Object-Oriented Programming, SOLID principles, Design Patterns, Java Collections, Streams API, Multithreading, debugging, performance optimization, production support, and the end-to-end software development lifecycle.',
  ],
}

export const contact: Contact = {
  email: 'gouthampulivarthi4557@gmail.com',
  linkedin: 'https://www.linkedin.com/in/goutham-pulivarthi',
  linkedinLabel: 'linkedin.com/in/goutham-pulivarthi',
}

/** Career as a series — ordered chronologically, Season 1 first. */
export const seasons: Season[] = [
  {
    number: 1,
    company: 'HSBC',
    role: 'Associate Java Developer',
    location: 'Hyderabad, India',
    start: 'March 2020',
    end: 'July 2023',
    synopsis:
      'The origin story: enterprise banking applications, Core Java fundamentals, and the first Spring Boot microservices.',
    episodes: [
      {
        title: 'Banking on the Full Stack',
        description:
          'Developed and maintained enterprise banking web applications using Java, Spring, Spring Boot, JavaScript, and HTML5/CSS3, implementing functionality across frontend and backend application layers.',
        tech: ['Java', 'Spring', 'Spring Boot', 'JavaScript', 'HTML5', 'CSS3'],
      },
      {
        title: 'Speaking JSON and XML',
        description:
          'Built and consumed REST APIs for communication between web applications, backend services, and downstream systems, supporting JSON and XML-based integrations.',
        tech: ['REST APIs', 'JSON', 'XML'],
      },
      {
        title: 'Reusable by Design',
        description:
          'Developed reusable frontend components and JavaScript functionality for application forms, data presentation, client-side validation, and user interactions.',
        tech: ['JavaScript', 'Client-Side Validation'],
      },
      {
        title: 'Breaking Up the Monolith',
        description:
          'Implemented backend services using Spring Boot and Microservices, supporting modular application development and independent service enhancements for banking workflows.',
        tech: ['Spring Boot', 'Microservices'],
      },
      {
        title: 'The Persistence Layer',
        description:
          'Implemented database functionality using SQL, JDBC, Hibernate, and JPA, supporting efficient data access and transactional processing across enterprise banking applications.',
        tech: ['SQL', 'JDBC', 'Hibernate', 'JPA'],
      },
      {
        title: 'Core Java Chronicles',
        description:
          'Applied Core Java concepts including Collections, Streams, Multithreading, Generics, Exception Handling, and OOP to develop reliable backend components and business services.',
        tech: ['Collections', 'Streams', 'Multithreading', 'Generics', 'OOP'],
      },
      {
        title: 'Hunting Bottlenecks',
        description:
          'Analyzed SQL queries and backend processing to identify performance bottlenecks, contributing to approximately 12% improvement in response times and more efficient data processing.',
        metric: '~12% faster responses',
        tech: ['SQL', 'Performance Tuning'],
      },
      {
        title: 'Sprint by Sprint',
        description:
          'Worked in Agile Scrum teams, participating in sprint planning, daily stand-ups, backlog refinement, code reviews, release activities, application debugging, and production issue resolution.',
        tech: ['Agile Scrum', 'Code Reviews', 'Production Support'],
      },
    ],
  },
  {
    number: 2,
    company: 'Chevron',
    role: 'Software Engineer – Java',
    location: 'San Ramon, California',
    start: 'May 2024',
    end: 'May 2025',
    synopsis:
      'A new setting in the energy sector: full stack enterprise apps with Spring Boot and React, deployed on AWS.',
    episodes: [
      {
        title: 'Powering Enterprise Apps',
        description:
          'Developed enterprise full stack applications using Java, Spring Boot, React, and JavaScript, implementing backend business services and frontend functionality for internal enterprise applications.',
        tech: ['Java', 'Spring Boot', 'React', 'JavaScript'],
      },
      {
        title: 'Front Meets Back',
        description:
          'Designed and integrated REST APIs using Spring Boot and connected React-based frontend applications with backend services through structured JSON-based communication.',
        tech: ['Spring Boot', 'REST APIs', 'React', 'JSON'],
      },
      {
        title: 'Component Library',
        description:
          'Developed reusable React components and JavaScript functionality for application screens, forms, data presentation, client-side validation, and user interactions.',
        tech: ['React', 'JavaScript'],
      },
      {
        title: 'Modular Services',
        description:
          'Implemented modular backend services using Spring Boot and Microservices, applying object-oriented design principles and reusable components to improve application maintainability.',
        tech: ['Spring Boot', 'Microservices', 'OOP'],
      },
      {
        title: 'Query Tuning',
        description:
          'Implemented database functionality using SQL and relational database technologies, optimizing queries and indexes to improve data-access efficiency and application response times.',
        tech: ['SQL', 'Indexing'],
      },
      {
        title: 'Into the Cloud',
        description:
          'Leveraged AWS cloud services and deployment practices to support scalable Java applications, cloud-based environments, application monitoring, and enterprise software delivery.',
        tech: ['AWS'],
      },
      {
        title: 'Following the Logs',
        description:
          'Analyzed application logs, database queries, and backend execution paths to identify performance bottlenecks, contributing to approximately 15% improvement in response times.',
        metric: '~15% faster responses',
        tech: ['Performance Tuning', 'Root Cause Analysis'],
      },
      {
        title: 'Ship It',
        description:
          'Used Git, Maven, and Jenkins throughout the software development lifecycle while participating in Agile Scrum ceremonies, code reviews, CI/CD activities, production support, and cross-functional technical discussions.',
        tech: ['Git', 'Maven', 'Jenkins', 'CI/CD'],
      },
    ],
  },
  {
    number: 3,
    company: 'Visa',
    role: 'Senior Java Developer',
    location: 'San Francisco, California',
    start: 'May 2025',
    end: 'Present',
    synopsis:
      'Now streaming: secure, event-driven payment platforms with Spring Boot, Kafka, React, and Kubernetes.',
    episodes: [
      {
        title: 'Payments at Scale',
        description:
          'Developed scalable full stack payment applications using Java, Spring Boot, React, and TypeScript, translating business requirements into reusable backend services and responsive frontend components.',
        tech: ['Java', 'Spring Boot', 'React', 'TypeScript'],
      },
      {
        title: 'Secure by Default',
        description:
          'Designed and implemented secure RESTful APIs using Spring Boot, Spring MVC, Spring Data JPA, and Spring Security, integrating backend services with React-based user interfaces and downstream payment systems.',
        tech: ['Spring MVC', 'Spring Data JPA', 'Spring Security', 'REST APIs'],
      },
      {
        title: 'Typed Components',
        description:
          'Built reusable React components using TypeScript and JavaScript for application workflows, forms, data presentation, and user interactions, improving frontend maintainability and development efficiency.',
        tech: ['React', 'TypeScript', 'JavaScript'],
      },
      {
        title: 'Event Stream',
        description:
          'Implemented event-driven processing using Apache Kafka, developing producers and consumers for asynchronous communication between microservices and improving transaction processing efficiency by approximately 20%.',
        metric: '~20% more efficient',
        tech: ['Apache Kafka', 'Microservices', 'Event-Driven Architecture'],
      },
      {
        title: 'Milliseconds Matter',
        description:
          'Optimized SQL queries, database access, and backend processing for transaction services, using query tuning and indexing techniques to reduce API response times by approximately 18%.',
        metric: '~18% faster APIs',
        tech: ['SQL', 'Indexing', 'Query Tuning'],
      },
      {
        title: 'Containers & Clusters',
        description:
          'Deployed and supported cloud-based Java microservices using AWS, Docker, and Kubernetes, contributing to scalable application environments and reliable application delivery.',
        tech: ['AWS', 'Docker', 'Kubernetes'],
      },
      {
        title: 'The Pipeline',
        description:
          'Contributed to CI/CD pipelines using Jenkins, Maven, and Git while participating in Agile Scrum ceremonies, code reviews, production issue resolution, and end-to-end feature delivery.',
        tech: ['Jenkins', 'Maven', 'Git', 'CI/CD'],
      },
      {
        title: 'Crossover Event: AI/ML',
        description:
          'Partnered with cross-functional teams on AI/ML initiatives, supporting integration of backend services and APIs with data-driven solutions while evaluating application requirements and technical dependencies.',
        tech: ['API Integration', 'AI/ML'],
      },
    ],
  },
]

/**
 * "Originals" — personal/portfolio projects.
 * PLACEHOLDERS: replace with real projects. Keep `placeholder: true` until then
 * so the UI can visibly mark them as coming soon.
 */
export const projects: Project[] = [
  {
    id: 'placeholder-1',
    title: '[Placeholder] Project One',
    placeholder: true,
    tagline: 'Replace with a one-line pitch for your first project.',
    description:
      'PLACEHOLDER — describe what the project does, the problem it solves, and your role in building it.',
    tech: ['Java', 'Spring Boot', 'React'],
    highlights: ['PLACEHOLDER — key feature or result', 'PLACEHOLDER — technical challenge you solved'],
  },
  {
    id: 'placeholder-2',
    title: '[Placeholder] Project Two',
    placeholder: true,
    tagline: 'Replace with a one-line pitch for your second project.',
    description:
      'PLACEHOLDER — describe what the project does, the problem it solves, and your role in building it.',
    tech: ['Apache Kafka', 'Microservices', 'Docker'],
    highlights: ['PLACEHOLDER — key feature or result', 'PLACEHOLDER — technical challenge you solved'],
  },
  {
    id: 'placeholder-3',
    title: '[Placeholder] Project Three',
    placeholder: true,
    tagline: 'Replace with a one-line pitch for your third project.',
    description:
      'PLACEHOLDER — describe what the project does, the problem it solves, and your role in building it.',
    tech: ['React', 'TypeScript', 'AWS'],
    highlights: ['PLACEHOLDER — key feature or result', 'PLACEHOLDER — technical challenge you solved'],
  },
]

/** Technical Skills, one row per resume category. */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    skills: ['Java 8+', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3', 'JSON', 'XML'],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      'Spring Boot',
      'Spring MVC',
      'Spring Framework',
      'Spring Data JPA',
      'Spring Security',
      'Hibernate',
      'JPA',
      'JDBC',
      'Microservices',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Responsive Web Design',
      'React Components',
      'Client-Side Validation',
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & APIs',
    skills: [
      'REST APIs',
      'RESTful Web Services',
      'Microservices',
      'Distributed Systems',
      'Event-Driven Architecture',
      'API Integration',
      'JSON',
      'XML',
    ],
  },
  {
    id: 'messaging',
    title: 'Messaging',
    skills: ['Apache Kafka', 'Event-Driven Processing', 'Asynchronous Processing', 'Producers', 'Consumers'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    skills: ['AWS', 'EC2', 'S3', 'RDS', 'EKS', 'CloudWatch', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD'],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: [
      'Oracle',
      'PostgreSQL',
      'MySQL',
      'Relational Databases',
      'SQL Query Optimization',
      'Indexing',
      'Database Performance Tuning',
    ],
  },
  {
    id: 'testing-tools',
    title: 'Testing, Build & Version Control',
    skills: ['JUnit', 'Mockito', 'Postman', 'Maven', 'Git', 'GitHub'],
  },
  {
    id: 'practices',
    title: 'Development Practices',
    skills: [
      'Agile Scrum',
      'SDLC',
      'Object-Oriented Programming',
      'SOLID Principles',
      'Design Patterns',
      'Java Collections',
      'Java Streams',
      'Multithreading',
      'Exception Handling',
      'Debugging',
      'Production Support',
      'Root Cause Analysis',
      'Performance Optimization',
    ],
  },
]

/**
 * Impact highlights, ranked by size. Numbers come straight from the resume
 * bullets (each stated there as "approximately").
 */
export const impactHighlights: ImpactHighlight[] = [
  {
    value: 20,
    headline: 'faster transaction processing',
    company: 'Visa',
    tech: 'Apache Kafka',
    detail: 'Event-driven Kafka producers and consumers between microservices improved transaction processing efficiency.',
  },
  {
    value: 18,
    headline: 'lower API response times',
    company: 'Visa',
    tech: 'SQL tuning & indexing',
    detail: 'Query tuning and indexing for transaction services reduced API response times.',
  },
  {
    value: 15,
    headline: 'faster response times',
    company: 'Chevron',
    tech: 'Performance analysis',
    detail: 'Analyzing logs, queries and backend execution paths removed performance bottlenecks.',
  },
  {
    value: 12,
    headline: 'faster response times',
    company: 'HSBC',
    tech: 'SQL optimization',
    detail: 'Analyzing SQL queries and backend processing removed performance bottlenecks.',
  },
]

export const education: Education[] = [
  {
    school: 'California State University, Long Beach',
    degree: 'Master of Science in Computer Science',
    location: 'Long Beach, California',
    graduation: 'May 2025',
  },
]
