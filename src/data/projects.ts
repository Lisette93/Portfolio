import optichaingImg from "../assets/optichain.png";
import kanbanImg from "../assets/kanban.png";
import studentPortalImg from "../assets/StudentPortal.png";
import healthAppImg from "../assets/HealthApp.png";

export interface Project {
  id: string;
  title: string;
  category: "UX PROJECT" | "FRONTEND PROJECT";
  shortDesc: string;
  longDesc: string;
  tags: string[];
  color: string;
  accentColor: string;
  rotation: string;
  featured: boolean;
  links: { label: string; url: string }[];
  deliverables?: string[];
  size?: "large" | "medium" | "small";
  image?: string; // optional screenshot shown in the card preview
}

export const projects: Project[] = [
  {
    id: "health-app",
    title: "Health App",
    category: "UX PROJECT",
    shortDesc:
      "UX project where I designed a health and wellness app from empathy mapping through to an interactive Figma prototype.",
    longDesc:
      "A solo end-to-end UX project where I designed a health and wellness app. The full process: empathy maps, user personas, problem statements, design goals, user scenarios, journey maps, wireframes, and a polished interactive Figma prototype.",
    tags: ["Figma", "User Research", "Prototyping", "Solo Project", "FigJam"],
    deliverables: [
      "Empathy map",
      "User persona",
      "Problem statement",
      "Design goals",
      "User scenario",
      "Journey map",
      "Wireframes",
      "Interactive prototype",
    ],
    color: "#7A9E87",
    accentColor: "#e8f0ea",
    rotation: "-1.2deg",
    featured: true,
    size: "medium",
    image: healthAppImg,
    links: [
      {
        label: "View prototype",
        url: "https://www.figma.com/proto/aOfhdCWcCwQ6GXwmK1gE7k/Untitled?node-id=1-2&viewport=628%2C82%2C0.94&t=tDE5v0ztQ2VRHeg3-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
      },
    ],
  },
  {
    id: "toy-library",
    title: "Toy Library",
    category: "UX PROJECT",
    shortDesc:
      "Group project — UX design for a toy library service, from user research and personas through to an interactive prototype.",
    longDesc:
      "A collaborative UX project designing a toy library platform. Working as a team, we conducted user research, built empathy maps and personas, mapped user journeys, created wireframes, and delivered an interactive Figma prototype.",
    tags: ["Figma", "User Research", "Prototyping", "Group Project", "FigJam"],
    deliverables: [
      "Empathy map",
      "User persona",
      "Problem statement",
      "User scenario",
      "Journey map",
      "Wireframes",
      "Interactive prototype",
    ],
    color: "#C4956A",
    accentColor: "#f5ede4",
    rotation: "1deg",
    featured: false,
    size: "medium",
    links: [{ label: "View prototype", url: "#" }],
  },
  {
    id: "wandering-bags",
    title: "Wandering Bags",
    category: "UX PROJECT",
    shortDesc:
      "Group project where we designed a UX concept for a clothing sharing service where garments travel between people in the local community",
    longDesc:
      "A collaborative UX project designing a platform for circular clothing sharing. People lend and borrow clothes within their local community as a sustainable alternative to fast fashion. As a team we went through the full process: research, empathy mapping, personas, journey mapping, wireframes, and an interactive Figma prototype. I was responsible for the empathy map, problem statement, design goals and prototyping.",
    tags: ["Figma", "User Research", "Prototyping", "Group Project", "FigJam"],
    deliverables: [
      "Empathy map",
      "User persona",
      "Problem statement",
      "User scenario",
      "Journey map",
      "Wireframes",
      "Interactive prototype",
    ],
    color: "#8B9EA8",
    accentColor: "#e4eaed",
    rotation: "-0.6deg",
    featured: false,
    size: "medium",
    links: [{ label: "View prototype", url: "#" }],
  },
  {
    id: "optichain",
    title: "OptiChain — Business Website",
    category: "FRONTEND PROJECT",
    shortDesc:
      "Full website built from scratch during my first LIA internship. Information architecture, Elementor, SEO and Google Analytics.",
    longDesc:
      "Built the entire OptiChain website from scratch during my LIA 1 internship. Responsible for the full scope: information architecture, content structure, responsive design, contact forms, email integration, SEO optimisation, and Google Analytics setup.",
    tags: [
      "WordPress",
      "Elementor",
      "SEO",
      "Google Analytics",
      "Responsive Design",
    ],
    color: "#C9A87C",
    accentColor: "#f5ede4",
    rotation: "1deg",
    featured: true,
    size: "medium",
    image: optichaingImg,
    links: [{ label: "Live website", url: "#" }],
  },
  {
    id: "kanban-board",
    title: "Kanban Board",
    category: "FRONTEND PROJECT",
    shortDesc:
      "Drag-and-drop task manager with TypeScript, React, and dnd-kit. Built for intuitive flow and real UX feedback.",
    longDesc:
      "A fully functional Kanban task management app. Drag-and-drop powered by dnd-kit, reusable component architecture in TypeScript, and strong UX attention — visual feedback on every interaction, fully responsive on mobile and desktop.",
    tags: ["TypeScript", "React", "dnd-kit", "Responsive"],
    color: "#D4897A",
    accentColor: "#edddd8",
    rotation: "-0.8deg",
    featured: true,
    size: "medium",
    image: kanbanImg,
    links: [
      { label: "GitHub", url: "#" },
      { label: "Live demo", url: "https://lisette93.github.io/KanbanBoard/" },
    ],
  },
  {
    id: "student-portal",
    title: "Student Portal",
    category: "FRONTEND PROJECT",
    shortDesc:
      "Interactive student portal with filtering, search, and API integration built in React and JavaScript.",
    longDesc:
      "An interactive portal with real filtering, search functionality, and API integration. Focus on clean component structure and user-friendly interaction patterns. Fully responsive across devices.",
    tags: ["JavaScript", "React", "REST API", "Filtering", "Search"],
    color: "#9E8A7A",
    accentColor: "#ede8e4",
    rotation: "1.5deg",
    featured: false,
    size: "small",
    image: studentPortalImg,
    links: [
      { label: "GitHub", url: "#" },
      { label: "Live demo", url: "https://lisette93.github.io/StudentPortal/" },
    ],
  },
];
