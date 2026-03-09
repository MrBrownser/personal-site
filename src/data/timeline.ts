export interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education";
  tags?: string[];
}

export const timeline: TimelineEntry[] = [
  {
    date: "2008 – 2012",
    title: "Telecommunications Engineering",
    organization: "Universitat Pompeu Fabra",
    description:
      "Engineering foundation. Electrical, electronics and communications.",
    type: "education",
  },
  {
    date: "2008 – 2015",
    title: "Data Migrations Technician → Consultor",
    organization: "Sage",
    description:
      "First tech career chapter. Started at Servitel (Sage subsidiary), grew into a consulting role managing projects and data migrations.",
    type: "work",
    tags: ["Data Migration", "Consulting"],
  },
  {
    date: "2015",
    title: "Web Development Bootcamp",
    organization: "Ironhack",
    description:
      "Career pivot into software development. Graduated with a top 5 project at Demo Day.",
    type: "education",
  },
  {
    date: "2015 – 2016",
    title: "Web Developer",
    organization: "Season",
    description:
      "First professional dev role. Built on-demand projects in Ruby on Rails and Drupal, managed deployments and DevOps.",
    type: "work",
    tags: ["Ruby on Rails", "Drupal", "DevOps"],
  },
  {
    date: "2016 – 2017",
    title: "Creative Software Developer",
    organization: "DenDen",
    description:
      "Co-created Forbidden City Game — an augmented reality iOS app built with React Native and Firebase.",
    type: "work",
    tags: ["React Native", "Firebase", "MeteorJS"],
  },
  {
    date: "2017 – 2021",
    title: "Full Stack Engineer",
    organization: "Haufe Group",
    description:
      "Prototyped 2 apps in 6 months, moved to production. Built microservices architecture, CI/CD pipelines, and full DevOps on Azure and Kubernetes.",
    type: "work",
    tags: ["React", "Node.js", "Azure", "Kubernetes", "CI/CD"],
  },
  {
    date: "2021 – Present",
    title: "Full Stack → Sr. Engineer → Lead PM → Head of Product & Tech",
    organization: "Videocation.no",
    description:
      "Grew through 4 roles in ~4 years at a Norwegian e-learning company. Now leading product vision and tech execution.",
    type: "work",
    tags: ["Product Management", "Leadership", "React", "Node.js"],
  },
  {
    date: "2024 – 2025",
    title: "Master's in Digital Product Management",
    organization: "Nuclio Digital School",
    description:
      "Deepened expertise in product strategy, digital business, and innovation management.",
    type: "education",
  },
];
