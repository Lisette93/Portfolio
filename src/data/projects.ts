import husplanenMockupImg from "../assets/husplanen-mockup.png";
import optichaingImg from "../assets/optichain.png";
import kanbanImg from "../assets/kanban.png";
import studentPortalImg from "../assets/StudentPortal.png";
import healthAppImg from "../assets/HealthApp.png";
import leksaksbibliotekImg from "../assets/leksaksbibliotek.png";
import vandrandekassarImg from "../assets/vandrandekassar.png";
import alienPlanetImg from "../assets/aliensframe2.png";

export interface CaseStudyImage {
  src?: string;
  alt: string;
  /** "contain" for text/diagram artifacts that shouldn't be cropped; default "cover" for UI screenshots */
  fit?: "cover" | "contain";
}

export interface CaseStudyPanelHeader {
  eyebrow: string;
  title: string;
  meta?: string[];
}

/** research artefacts rendered as real page content instead of a screenshot — one type per deliverable shape */
export type CaseStudyPanel =
  | {
      kind: "competitor";
      header: CaseStudyPanelHeader;
      promiseLabel: string;
      promise: { title: string; body: string };
      features: { title: string; body: string }[];
      stats: { value: string; label: string }[];
      notesLabel: string;
      notes: string[];
      conclusionLabel: string;
      /** supports **bold** spans */
      conclusion: string;
      footnote?: string;
    }
  | {
      kind: "affinity-map";
      header: CaseStudyPanelHeader;
      columns: {
        heading: string;
        highlight?: boolean;
        items: ({ type: "cluster"; tag: string; title: string } | { type: "quote"; text: string })[];
      }[];
      insightLabel: string;
      insight: string;
    }
  | {
      kind: "personas";
      header: CaseStudyPanelHeader;
      personas: {
        initial: string;
        name: string;
        subtitle: string;
        description: string;
        quote: string;
        behavior: string;
        frustrations: string[];
        wants: string[];
        clusterTag: string;
        swatch: string;
        swatchInk: string;
      }[];
      comparisonLabel: string;
      comparisonColumns: string[];
      comparisonRows: { name: string; values: string[] }[];
      closing: string;
    }
  | {
      kind: "problem-statement";
      header: CaseStudyPanelHeader;
      /** supports **bold** spans */
      statement: string;
      failuresLabel: string;
      failures: string[];
      validatedLabel: string;
      validated: string[];
      validatedNote?: string;
      hmwLabel: string;
      hmwNote?: string;
      hmw: { n: string; question: string }[];
    };

export interface CaseStudyPhase {
  n: string;
  title: string;
  /** shown in the "My role in this phase" tag — required, never blank */
  role: string;
  intro: string;
  before: string[];
  did: string[];
  found: string[];
  takeaway: string;
  /** exactly one of images / panels — panels renders research artefacts as real content instead of screenshots */
  images?: CaseStudyImage[];
  panels?: [CaseStudyPanel, CaseStudyPanel];
  /** describes the images row below — omit when a phase has no images */
  caption?: string;
}

export interface CaseStudyChange {
  label: string;
  title: string;
  body: string;
}

export interface CaseStudyCompare {
  intro: string;
  beforeLabel: string;
  afterLabel: string;
  before: CaseStudyImage;
  after: CaseStudyImage;
  changes: CaseStudyChange[];
}

export interface CaseStudyAlternative {
  label: string;
  badge: "Chosen" | "Considered" | "Dropped";
  title: string;
  body: string;
  why: string;
  img: CaseStudyImage;
}

export interface CaseStudyAlternatives {
  intro: string;
  decision: string;
  options: CaseStudyAlternative[];
}

export interface CaseStudyScreen extends CaseStudyImage {
  caption: string;
}

export interface CaseStudyDeliverable {
  label: string;
  title: string;
  body: string;
}

export interface CaseStudyDelivery {
  intro: string;
  prototypeHref?: string;
  screens: CaseStudyScreen[];
  deliverables: CaseStudyDeliverable[];
}

export interface CaseStudyReflection {
  n: string;
  title: string;
  points: string[];
}

export interface CaseStudy {
  eyebrow: string;
  tagline: string;
  heroImage: CaseStudyImage;
  /** exactly 3 — the short version, read standalone */
  summary: { label: string; body: string }[];
  overview: { heading: string; body: string[]; contribution: string };
  facts: { label: string; value: string }[];
  tools: string[];
  /** 3-5 — layout must not assume a count */
  phases: CaseStudyPhase[];
  compare?: CaseStudyCompare;
  alternatives?: CaseStudyAlternatives;
  delivery: CaseStudyDelivery;
  /** exactly 4 — Results / What I'd do differently / What I learned / Next steps */
  reflections: CaseStudyReflection[];
  /** derived colours: section backgrounds / role-tag background / label ink */
  tintSoft: string;
  accentSoft: string;
  accentInk: string;
}

export interface Project {
  id: string;
  title: string;
  category: "UX PROJECT" | "FRONTEND PROJECT";
  year: string;
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
  image?: string;
  imagePad?: string;
  /** presence of this is what creates a /projects/:id case study page */
  caseStudy?: CaseStudy;
  /** "Current project" pill — presence pins the card above the regular grid */
  status?: string;
  /** meta line next to the status pill, e.g. "In UX / prototype stage" */
  stage?: string;
}

export const projects: Project[] = [
  {
    id: "husplanen",
    title: "Husplanen",
    category: "UX PROJECT",
    year: "2026",
    status: "Current project",
    stage: "In UX / prototype stage",
    shortDesc:
      "A fullstack app I'm building from scratch — UX and design mostly locked, and I'm building it out screen by screen right now.",
    longDesc:
      "Husplanen is my thesis project: an AI-powered home maintenance app for homeowners who are drowning in a mental list of things that need fixing. You dump your tasks in free text, and the app turns that into a prioritized, explained plan. It's the only project on here where I own both the UX and the build, from research through to the code.",
    tags: ["Figma", "UX Design", "Prototyping", "React", "TypeScript", "Fullstack"],
    deliverables: [
      "User research",
      "User flows",
      "Wireframes",
      "Interactive prototype",
      "Design system",
    ],
    color: "#A66B70",
    accentColor: "#F0DFDD",
    rotation: "-0.9deg",
    featured: true,
    size: "large",
    image: husplanenMockupImg,
    links: [],
    caseStudy: {
      eyebrow: "UX case study",
      tagline:
        "Turning a messy brain-dump of home-maintenance tasks into a plan you can actually act on — still a work in progress.",
      heroImage: { src: husplanenMockupImg, alt: "Husplanen — current wireframes and prototype screens" },
      tintSoft: "#F5EAE7",
      accentSoft: "#E5CECD",
      accentInk: "#8D5B5F",
      summary: [
        {
          label: "The problem",
          body: "Homeowners build up a running mental list of things that need doing, but no real system for knowing what matters most or when. Existing tools either want tidy, structured input from day one, or don't help you prioritize at all.",
        },
        {
          label: "My approach",
          body: "Husplanen takes whatever a homeowner throws at it — in free text, unsorted — and turns it into a plan: prioritized, sized by effort, with reminders for the stuff that repeats. Free-text input has to stay the easy way in, but it can't be the whole product, so Husplanen suggests a full plan from the dump and you confirm it in bulk (\"Does this look right?\"), with the option to go step-by-step if you'd rather. That trade-off between frictionless and actually useful matters more here because I'm also the one building what I design.",
        },
        {
          label: "Where it stands",
          body: "The information architecture and navigation are locked, the design system is built in Figma, and the core screens — home, tasks, rooms, timeline, onboarding — are designed. The build is underway alongside the design work. Kalender's level of detail is still an open question, and nothing has been user-tested yet.",
        },
      ],
      overview: {
        heading: "A home maintenance app that turns a brain-dump into a plan",
        body: [
          "Homeowners — especially couples sharing a house — build up a mental backlog of things that need doing, but rarely have a system for it. Husplanen lets you dump everything you're thinking about in free text, then uses AI to sort it into categorized, prioritized tasks with a reason attached, so you know not just what to do but why it matters right now.",
          "I'm working UX-first: research and interviews before personas, personas before information architecture, IA before any real interface design. I'm building it as a Next.js PWA with a Postgres database, letting the Claude API handle the categorizing and prioritizing.",
        ],
        contribution:
          "Solo project — I'm doing the research, the UX, the interface design and the fullstack build myself. Every decision on this page is mine, including the ones I'd defend differently in a team.",
      },
      facts: [
        { label: "My role", value: "UX designer & fullstack developer — solo" },
        { label: "Team", value: "Solo project" },
        { label: "Timeline", value: "Ongoing since August 2026, through December 2026" },
        { label: "Context", value: "Self-initiated — thesis project (Yrkeshögskolan Borås)" },
        { label: "Platform", value: "Web app (PWA), mobile-first, built for shared household use" },
        { label: "Status", value: "In UX / prototype stage" },
      ],
      tools: [
        "Figma",
        "FigJam",
        "User interviews",
        "Wireframing",
        "Prototyping",
        "React",
        "TypeScript",
        "Next.js",
        "Neon (Postgres)",
        "Claude API",
        "Vercel",
      ],
      phases: [
        {
          n: "01",
          title: "Problem & discovery",
          role: "Researcher — planning and running interviews",
          intro:
            "Before designing anything, I needed to understand how people actually deal with home maintenance today, and what's missing from the tools already out there.",
          before: [
            "No formal research yet — just a hunch that free-text input could lower the barrier to logging tasks.",
          ],
          did: [
            "Interviewed four real homeowners (anonymized as D1–D4 for the thesis)",
            "Reviewed the main Swedish competitor, Villaägarnas 'Min Villa'",
          ],
          found: [
            "Every participant talked about maintenance as something they manage with a partner, not alone — 'we' language came up across all four interviews.",
            "No competitor offers free-text dump onboarding or actively distributes responsibility between household members.",
          ],
          takeaway:
            "The real opportunity isn't the free-text input itself — it's reliable relief built on good house data. The dump is just the door in.",
          panels: [
            {
              kind: "affinity-map",
              header: {
                eyebrow: "Discovery · Affinity mapping",
                title: "Four interviews, twelve clusters",
                meta: ["D1–D4 · anonymized", "25 August 2026"],
              },
              columns: [
                {
                  heading: "The burden of remembering",
                  items: [
                    { type: "cluster", tag: "Cluster 1", title: "Mental load" },
                    { type: "cluster", tag: "Cluster 11", title: "No overview of the whole house" },
                    { type: "quote", text: "Hard to get a good overview — easy to just keep writing new lists." },
                    { type: "quote", text: "It turns into a long list. No deadline." },
                  ],
                },
                {
                  heading: "What stops you",
                  items: [
                    { type: "cluster", tag: "Cluster 2", title: "Cost is invisible before the decision" },
                    { type: "cluster", tag: "Cluster 6", title: "Effort, time and tedium" },
                    { type: "cluster", tag: "Cluster 12", title: "Projects don't break down into steps" },
                    { type: "quote", text: "Now I have six hours — what can I actually get done?" },
                  ],
                },
                {
                  heading: "What would drive you",
                  items: [
                    { type: "cluster", tag: "Cluster 4", title: "Pattern recognition: 'every X years'" },
                    { type: "cluster", tag: "Cluster 13", title: "Motivation sequencing" },
                    { type: "cluster", tag: "Cluster 14", title: "Calendar summarizing" },
                    { type: "cluster", tag: "Cluster 15", title: "Prioritization criteria" },
                    { type: "quote", text: "I don't get reminded early enough — I've already missed the chance to plan." },
                  ],
                },
                {
                  heading: "The household",
                  highlight: true,
                  items: [
                    { type: "cluster", tag: "Cluster 5", title: "All four spoke in 'we'" },
                    { type: "cluster", tag: "Cluster 3", title: "Resistance from the already-organized partner" },
                    { type: "cluster", tag: "Cluster 10", title: "Photo-based input" },
                    { type: "quote", text: "The binder system 'works okay' — but isn't searchable. — D4" },
                  ],
                },
              ],
              insightLabel: "What the clusters say",
              insight:
                "It's not the input that's the problem. It's cost, capacity, pattern, prioritization, searchable history and shared responsibility — six things a to-do list doesn't do.",
            },
            {
              kind: "competitor",
              header: {
                eyebrow: "Discovery · Competitor analysis",
                title: "Villaägarna · Min Villa",
                meta: ["Reviewed: public product area", "minvilla.villaagarna.se"],
              },
              promiseLabel: "What the service promises",
              promise: {
                title: "A personal maintenance plan at signup",
                body: "The account builds the plan for you. Then it guides you through inspecting the house, step by step, and helps out when something needs fixing.",
              },
              features: [
                { title: "Track & fix", body: "Descriptions of inspection and maintenance." },
                { title: "Document", body: "Status under control, documented in the service." },
                { title: "Save money", body: "Membership discounts and offers." },
                { title: "Talk to experts", body: "Advice on construction and legal questions." },
              ],
              stats: [
                { value: "468 kr", label: "membership / year" },
                { value: "30 442", label: "maintenance plans created" },
                { value: "14 days", label: "free trial account" },
              ],
              notesLabel: "My notes",
              notes: [
                "The plan is made for you — good proactivity, but it starts from the house, not from what you can actually handle right now. No filtering by time or effort.",
                "No cost indication before you commit — \"save money\" means discounts, not a price picture for a task.",
                "One account = one homeowner. The household as a unit doesn't show up anywhere in the offering — no way to split tasks between partners.",
                "Documentation exists — but the promise is to store it, not to find it again. Searchability is still unsolved.",
              ],
              conclusionLabel: "Takeaway",
              conclusion:
                "Min Villa covers **what needs doing** to the house. The gap is **who** does it, **when** you actually have the energy, **what it costs** — and finding your way back to it afterward.",
              footnote:
                "To verify in the demo account: reminder lead time, whether the plan is fully editable, and how documents are searched back.",
            },
          ],
          caption: "Four real interviews and a competitor review shaped the direction from here.",
        },
        {
          n: "02",
          title: "Users & framing",
          role: "UX researcher / designer",
          intro: "From the interviews, I built personas and a problem statement I could actually design against.",
          before: ["Started with a synthetic set of three personas, before any real interview data existed."],
          did: [
            "Replaced the synthetic personas with two grounded in real interviews: Karl (the improviser) and Sara (the systematic)",
            "Wrote the problem statement and a set of How-Might-We questions",
          ],
          found: [
            "Shared household use turned out to be the norm across interviews, not an edge case — that changed how central the 'Hushåll' (household) concept needed to be.",
          ],
          takeaway:
            "Karl and Sara need very different things from the same data — Karl needs low friction, Sara needs structure — so the app has to serve both without forcing either into the other's mode.",
          panels: [
            {
              kind: "personas",
              header: {
                eyebrow: "Definition · Personas",
                title: "Karl and Sara",
                meta: ["Grounded in D1–D4 · replaces the synthetic personas", "Finalized 25 August 2026"],
              },
              personas: [
                {
                  initial: "K",
                  name: "Karl",
                  subtitle: "The improviser · D1, D2",
                  description:
                    "Shares a household with a partner. No established system — maintenance is handled verbally or on loose notes. The house is both a joy and overwhelming.",
                  quote: "I have basically no energy to think strategically about what matters most.",
                  behavior:
                    "Jumps between things instead of focusing. Simplifies projects on the fly to get them done — uses what's already at home.",
                  frustrations: [
                    "Doesn't know what things cost before deciding",
                    "No help breaking a big project into steps",
                    "No clear starting point; everything feels equally big",
                  ],
                  wants: [
                    "Filtering by time and effort: \"what can I fit into six hours?\"",
                    "Rough cost ranges before deciding",
                    "Projects split into steps, not whole tasks",
                    "Easy to get started — not a new system to maintain",
                  ],
                  clusterTag: "Clusters 1, 2, 6, 10, 12",
                  swatch: "#F5EAE7",
                  swatchInk: "#8D5B5F",
                },
                {
                  initial: "S",
                  name: "Sara",
                  subtitle: "The systematic · D3, D4",
                  description:
                    "Shares a household with a partner. Already has a spreadsheet and calendar, reads up on maintenance intervals herself. The system still isn't enough — the list gets long and passive.",
                  quote:
                    "An invisible, super-competent caretaker who makes sure the house is always in perfect shape — before problems even appear.",
                  behavior:
                    "Prioritizes by urgency, risk of damage to the house, and what everyday life demands. Still puts off boring tasks.",
                  frustrations: [
                    "Knows what needs doing, but nothing drives it forward",
                    "Reminders come too late to book a contractor",
                    "\"Cleaning up is tedious\" — gets postponed despite good structure",
                  ],
                  wants: [
                    "A forward-driving mechanism, not just a list",
                    "Pattern recognition: \"this usually needs doing every X years\"",
                    "Sequencing: an easy task before a hard one",
                    "Proactivity — not having to track intervals herself",
                  ],
                  clusterTag: "Clusters 3, 4, 6, 11, 13, 14, 15",
                  swatch: "#E8ECE4",
                  swatchInk: "#5C7A63",
                },
              ],
              comparisonLabel: "What sets them apart",
              comparisonColumns: ["Tool today", "Core blocker", "Prioritizes by", "Wants help with"],
              comparisonRows: [
                {
                  name: "Karl",
                  values: ["None / verbal / loose notes", "Doesn't know where to start", "Effort, time, cost", "Getting started, breaking things down"],
                },
                {
                  name: "Sara",
                  values: ["Spreadsheet / calendar", "Structure exists, follow-through doesn't", "Urgency, damage risk, tedium", "Being reminded in time, seeing patterns"],
                },
              ],
              closing:
                "Same core problem, different tool maturity — a nuance for design, not two separate audiences. Both share a household with a partner.",
            },
            {
              kind: "problem-statement",
              header: {
                eyebrow: "Definition · Problem statement",
                title: "The locked problem",
                meta: ["Locked 25 August 2026", "D1–D4 + three synthetic interviews"],
              },
              statement:
                "Homeowners carry the responsibility alone to **remember, judge, prioritize and plan** home maintenance. Information about the house — receipts, warranties, work done, dates — is scattered across folders and email, and becomes unreachable exactly when it's needed most.",
              failuresLabel: "How today's tools fall short",
              failures: [
                "No real overview across multiple tasks at once",
                "No forward-looking warning in good time — not for big projects, and not for routines like waste collection",
                "No help breaking a project into manageable steps",
              ],
              validatedLabel: "Validated in the interviews",
              validated: [
                "Reduced mental load",
                "Overview across multiple tasks",
                "Reminders with good lead time",
                "Breaking things into steps",
                "Shared household responsibility (4/4)",
                "Searchable maintenance history",
              ],
              validatedNote:
                "Not confirmed: active assignment of responsibility — the mechanism was barely tested. Built as designed, but with extra attentiveness.",
              hmwLabel: "How might we",
              hmwNote: "one question per validated need",
              hmw: [
                { n: "01", question: "How might we show roughly what a task will cost before someone decides?" },
                { n: "02", question: "How might we let the house suggest its own maintenance instead of requiring someone to remember the intervals?" },
                { n: "03", question: "How might we match tasks to the time and energy a user actually has right now?" },
                { n: "04", question: "How might we remind early enough that it's still possible to plan — not just on the day?" },
                { n: "05", question: "How might we make the house's history searchable years later — by room, task and year?" },
                { n: "06", question: "How might we split responsibility across a household without anyone having to nag the other?" },
              ],
            },
          ],
          caption: "Karl and Sara, built from real interviews rather than assumptions.",
        },
        {
          n: "03",
          title: "Flows & architecture",
          role: "Information architect / UX designer",
          intro:
            "Once I knew who I was designing for, I needed to decide the shape of the app itself — what lives where, and what doesn't make it into the bottom nav.",
          before: ["Personas and problem statement done, but no structure for the app yet."],
          did: [
            "Mapped the overall navigation, the Plan tab in detail, and the Hushåll (household) flow",
            "Decided on the bottom nav — Hem, Plan (with Åtgärder and Rum sub-tabs), Tidslinje, Kalender — with Hushåll living outside it, behind the avatar/settings, since it's about people and roles rather than daily tasks",
          ],
          found: [
            "Still open: whether the calendar gets its own detailed design in this round, or waits for a later pass.",
          ],
          takeaway:
            "Keeping Hushåll out of the bottom nav was the right call — it's not something people tap into daily the way Plan or Kalender are.",
          caption: "The navigation structure, locked before any visual design started.",
        },
        {
          n: "04",
          title: "Wireframes & prototype — in progress",
          role: "UX/UI designer & frontend developer",
          intro: "This is where I am right now: building out the actual screens in Figma, one flow at a time.",
          before: ["IA and navigation locked, but no visual design system yet."],
          did: [
            "Built the Figma design system — Fraunces for headings, DM Sans for body text, a sand/terra/green palette, four radius tokens and five spacing steps",
            "Designed the footer nav component in its four states, the onboarding flow, the Hem (home) screen, Plan with its Åtgärder and Rum sub-tabs, the new-room flow, an individual task/åtgärd detail screen, and Tidslinje including adding a new entry",
            "Started building the app alongside the design work — several of these screens already exist in code, not just Figma",
          ],
          found: [
            "Building in code while I'm still designing keeps surfacing real questions early — spacing, edge cases, states — stuff a Figma-only process would let slide.",
          ],
          takeaway:
            "Designing and building in parallel keeps me honest — a screen that looks done in Figma still has to hold up once it's real code.",
          images: [
            { alt: "Onboarding flow — step 1", src: "/images/husplanen/onboarding.png" },
            { alt: "Hem (home) screen", src: "/images/husplanen/home.png" },
          ],
          caption: "Phase 04, live — this is what exists today, not a finished result.",
        },
      ],
      delivery: {
        intro:
          "This covers the UX groundwork: a locked information architecture, a working design system, and designed screens for onboarding, the home screen, tasks, rooms and the timeline. The build is running alongside the design work rather than waiting for it to finish.",
        screens: [
          {
            alt: "Onboarding flow — step 1",
            src: "/images/husplanen/onboarding.png",
            caption: "Onboarding — step 1.",
          },
          {
            alt: "Onboarding flow — step 2",
            src: "/images/husplanen/onboarding2.png",
            caption: "Onboarding — step 2.",
          },
          {
            alt: "Onboarding flow — step 3",
            src: "/images/husplanen/onboarding3.png",
            caption: "Onboarding — step 3.",
          },
          {
            alt: "Free-text dump screen, part of onboarding",
            src: "/images/husplanen/dump.png",
            caption: "Dump everything, no structure required.",
          },
          {
            alt: "Hem (home) screen",
            src: "/images/husplanen/home.png",
            caption: "Home — what needs your attention right now.",
          },
          {
            alt: "Plan — Åtgärder sub-tab, tasks sorted by priority",
            src: "/images/husplanen/plan-atgarder.png",
            caption: "A plan with reasons attached, not just a list.",
          },
          {
            alt: "Plan — Rum sub-tab",
            src: "/images/husplanen/plan-rum.png",
            caption: "Tasks grouped by room.",
          },
          {
            alt: "New room flow",
            src: "/images/husplanen/nytt-rum.png",
            caption: "Adding a new room to the house.",
          },
          {
            alt: "Task/åtgärd detail screen",
            src: "/images/husplanen/atgards-detalj.png",
            caption: "One task, with the reasoning behind it.",
          },
          {
            alt: "Tidslinje, the house's history over time",
            src: "/images/husplanen/tidslinje.png",
            caption: "Tidslinje — the house's history in one searchable place.",
          },
          {
            alt: "Tidslinje — adding a new entry",
            src: "/images/husplanen/tidslinje-add.png",
            caption: "Logging something that's already been done.",
          },
        ],
        deliverables: [
          {
            label: "Prototype",
            title: "Clickable in Figma",
            body: "Covers onboarding, home, the full Plan flow (Åtgärder + Rum), task detail and Tidslinje.",
          },
          {
            label: "Foundations",
            title: "Type, colour, components",
            body: "Fraunces + DM Sans, a warm sand/terra/green palette, and a small token system for radius and spacing — built to hold up once the whole app exists.",
          },
          {
            label: "Build",
            title: "Fullstack implementation",
            body: "Next.js PWA with a Neon Postgres database and the Claude API handling categorization and prioritization, deployed on Vercel. Several screens are already implemented in code alongside the ongoing design work.",
          },
        ],
      },
      reflections: [
        {
          n: "01",
          title: "Where it stands",
          points: [
            "IA, personas and the design system are locked, and several screens already exist in code as well as Figma. Nothing has been in front of a real user yet — that's the gap I'm most aware of right now.",
          ],
        },
        {
          n: "02",
          title: "What's been hardest",
          points: [
            "Keeping the free-text dump from becoming the whole story. It's the easiest part to get excited about, but the real value is the structured house data underneath it — I have to keep reminding myself of that when deciding what to design next.",
          ],
        },
        {
          n: "03",
          title: "What I've learned so far",
          points: [
            "Villaägarnas 'Min Villa' plans from the house, not from the person — proactive, but it assumes energy and time you may not actually have right now. That gap is what free-text-plus-prioritization is really solving, more than the input method itself.",
          ],
        },
        {
          n: "04",
          title: "Next steps",
          points: [
            "Decide how much Kalender needs in this round, keep building out the screens that are already designed, and move into Validering (user testing) once there's enough built to test.",
          ],
        },
      ],
    },
  },
  {
    id: "health-app",
    title: "Health App",
    category: "UX PROJECT",
    year: "2025",
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
    color: "#B0745C",
    accentColor: "#EFDDD3",
    rotation: "-1.2deg",
    featured: true,
    size: "medium",
    image: healthAppImg,
    links: [
      {
        label: "View prototype",
        url: "https://www.figma.com/proto/aOfhdCWcCwQ6GXwmK1gE7k/Untitled?node-id=1-2&viewport=628%2C82%2C0.94&t=tDE5v0ztQ2VRHeg3-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
      },
      {
        label: "View process",
        url: "https://www.figma.com/board/1ApnxeZ99IipRoxmbckh5I/HealthApp?node-id=0-1&t=Xj4j2HziYOiH5cGL-1",
      },
    ],
    caseStudy: {
      eyebrow: "UX case study",
      tagline:
        "A one-week solo project: designing a wellness app for people who quit every wellness app — from four interviews to a tested Figma prototype.",
      heroImage: { src: healthAppImg, alt: "Health App — hi-fi screens from the final Figma prototype" },
      tintSoft: "#F4E9E1",
      accentSoft: "#E5CDC1",
      accentInk: "#96634E",
      summary: [
        {
          label: "The problem",
          body: "People download a wellness app in a burst of motivation and stop opening it within a week — not because the content is bad, but because every session assumes 45 free minutes and a clear head.",
        },
        {
          label: "My decision",
          body: "A mood-first home screen instead of a category browse. The interviews showed people open the app already undecided and low on energy, so choosing a feeling had to be easier than choosing a workout.",
        },
        {
          label: "The outcome",
          body: "[3 of 4] testers started a session unaided, in three taps. The structure held under testing; the copy didn't — and that turned out to be the cheap fix.",
        },
      ],
      overview: {
        heading: "A wellness app for people who never make it past week one",
        body: [
          "Wellness apps assume you arrive with energy, time and a plan. The people I talked to arrived with none of those — they downloaded something in a burst of motivation and quietly stopped opening it a week later. I wanted to know what actually happens in that week.",
          "Working alone over one week, I ran lean research, built a persona to keep myself honest, and designed a mood-first flow that gets someone into a session in three taps. The result is an interactive Figma prototype covering the full launch-to-session flow.",
        ],
        contribution:
          "Sole designer end to end — I ran the interviews, did the synthesis, made every design call, and tested the prototype myself. The trade-offs on this page are mine to defend.",
      },
      facts: [
        { label: "My role", value: "UX designer — sole designer, end to end" },
        { label: "Team", value: "Solo project" },
        { label: "Timeline", value: "1 week" },
        { label: "Context", value: "[Course project / self-initiated]" },
        { label: "Platform", value: "iOS app — Figma prototype" },
      ],
      tools: [
        "Figma",
        "FigJam",
        "User interviews",
        "Empathy mapping",
        "Personas",
        "User flows",
        "Wireframing",
        "Prototyping",
        "Usability testing",
      ],
      phases: [
        {
          n: "01",
          title: "Research & discovery",
          role: "Interviewer",
          intro:
            "One week total, so research had to be small and decisive: find out why people quit, not everything about wellness.",
          before: [
            "Wellness apps were everywhere, but I had no evidence about why people abandon them.",
            'The brief was broad — "a health app" — with no defined user and no defined problem.',
            "No existing research to lean on, and no team to divide the work with.",
          ],
          did: [
            "Ran [4] short interviews with people who had tried and quit a fitness or wellness app.",
            "Reviewed [3] existing wellness apps, focused on onboarding and how a session starts.",
            "Kept every note in one FigJam board so synthesis could start the same day.",
          ],
          found: [
            "Time is the real blocker",
            "Onboarding asks too much",
            "Streaks create guilt",
            "Wanted: short sessions",
          ],
          takeaway:
            "People didn't quit because the content was bad — they quit because every session assumed they had 45 minutes and a clear head.",
        },
        {
          n: "02",
          title: "Empathy mapping & personas",
          role: "Synthesiser",
          intro:
            "Turning four conversations into one shared picture — the phase where I decide who I am not designing for.",
          before: [
            "Raw quotes from four interviews, no pattern yet.",
            "Real risk of designing for myself instead of the people I'd talked to.",
          ],
          did: [
            "Built an empathy map — says, thinks, does, feels — straight from the interview quotes.",
            "Clustered it into [3] recurring needs and named the tension between them.",
            "Wrote one primary persona and deliberately skipped a secondary one.",
          ],
          found: [
            "Primary: the depleted beginner",
            "Need: low-effort entry",
            "Need: progress without pressure",
            "Out of scope: advanced athletes",
          ],
          takeaway:
            "The persona became a filter: every later decision had to answer one question — does this lower the effort of starting?",
          images: [
            { src: "/images/health-app/behov.png", alt: "Needs analysis — Behov", fit: "contain" },
            { src: "/images/health-app/onskningar.png", alt: "Needs analysis — Önskningar", fit: "contain" },
            { src: "/images/health-app/persona-sofia.png", alt: "User persona — Sofia, 38", fit: "contain" },
            { src: "/images/health-app/problemformulering.png", alt: "Problem statement", fit: "contain" },
            { src: "/images/health-app/design-goals.png", alt: "Design goals", fit: "contain" },
          ],
          caption: "The needs analysis and persona, plus the problem statement and design goals they led to.",
        },
        {
          n: "03",
          title: "Ideation & information architecture",
          role: "Decision-maker",
          intro:
            "A clear user and a clear need, but no product shape yet — this is where the structure got decided.",
          before: [
            "Too many plausible features competing for the home screen.",
            "No flow: it was unclear how someone got from opening the app to actually moving.",
          ],
          did: [
            "Sketched [8] home-screen concepts on paper in one sitting, then killed six.",
            "Mapped the user flow from launch to finished session.",
            "Cut the feature list to three: pick a mood, start a session, see progress.",
          ],
          found: ["Mood-first home screen", "Max 3 taps to start", "Progress as calm, not streaks"],
          takeaway:
            "I chose a mood-first entry over a category browse, because the interviews showed people open the app already undecided.",
          images: [
            { src: "/images/health-app/user-journey.png", alt: "User journey — trigger to result", fit: "contain" },
          ],
          caption: "The user journey the ideation converged on.",
        },
        {
          n: "04",
          title: "Prototype & user testing",
          role: "Test lead",
          intro: "The last phase, and the only one that could tell me whether any of the above was right.",
          before: [
            "The prototype felt obvious to me — I had built it.",
            "Two questions I couldn't answer alone: was the mood step understood, and was session length clear?",
          ],
          did: [
            "Wired an interactive Figma prototype for the core flow.",
            "Tested with [4] people on one task: start a session that fits 15 minutes.",
            "Logged every hesitation, then iterated twice.",
          ],
          found: [
            "[3 of 4] finished unaided",
            "Mood labels reworded",
            "Duration moved up the card",
            "Fixed: unclear back behaviour",
          ],
          takeaway: "Testing changed the copy far more than the layout — the structure held, the words didn't.",
          images: [
            { src: "/images/health-app/reflection-process.png", alt: "Reflection on process and method", fit: "contain" },
            { src: "/images/health-app/reflection-design-decision.png", alt: "Reflection on a key design decision", fit: "contain" },
          ],
          caption: "Written mid-process — on method, and on the decision to leave gamification out.",
        },
      ],
      compare: {
        intro:
          "One screen changed more than any other after testing. Same structure, different words and hierarchy — worth showing side by side because the fix was cheap and the effect wasn't.",
        beforeLabel: "First hi-fi version",
        afterLabel: "After two rounds of testing",
        before: { alt: "Session card before testing — mood names and duration at the bottom" },
        after: { alt: "Session card after testing — reworded moods, duration moved up" },
        changes: [
          {
            label: "Change 01",
            title: "Mood labels rewritten",
            body: '"Restore" and "Power" meant nothing to testers cold. Reworded to describe how you feel, not what the session is called.',
          },
          {
            label: "Change 02",
            title: "Duration moved up",
            body: "Session length sat at the bottom of the card. Moved next to the title — the single thing everyone looked for first.",
          },
          {
            label: "Change 03",
            title: "Back behaviour fixed",
            body: "Leaving a session dropped people to the home screen. Now it returns to the list they came from.",
          },
        ],
      },
      alternatives: {
        intro:
          "The entry point was the real decision on this project — how someone chooses what to do in the first five seconds. I built out three and compared them against the same persona.",
        decision:
          "I chose mood-first over browse because the persona's blocker was decision-making, not content — accepting that it scales worse as the library grows, which is why browse stayed as a second route in.",
        options: [
          {
            label: "Direction A",
            badge: "Chosen",
            title: "Mood first",
            body: "The home screen asks how you feel, then offers two or three sessions that match.",
            why: "Won because interviewees described opening the app undecided and low on energy. Choosing a feeling is easier than choosing a workout.",
            img: { alt: "Direction A — mood-first home screen" },
          },
          {
            label: "Direction B",
            badge: "Considered",
            title: "Browse by category",
            body: "A conventional library — yoga, strength, breathing — with filters.",
            why: "Familiar and scalable, but it puts the decision on someone who told me they can't make it. Kept as a secondary tab instead.",
            img: { alt: "Direction B — browse-by-category home screen" },
          },
          {
            label: "Direction C",
            badge: "Dropped",
            title: "Guided weekly plan",
            body: "A fixed programme that tells you what to do each day.",
            why: "Dropped early: it recreates exactly the pressure and guilt that made people stop using their last app.",
            img: { alt: "Direction C — guided weekly plan concept" },
          },
        ],
      },
      delivery: {
        intro:
          "An interactive Figma prototype covering the full flow from launch to a finished session, plus the small set of foundations it was built on.",
        prototypeHref:
          "https://www.figma.com/proto/aOfhdCWcCwQ6GXwmK1gE7k/Untitled?node-id=1-2&viewport=628%2C82%2C0.94&t=tDE5v0ztQ2VRHeg3-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
        screens: [
          { src: "/images/health-app/home-screen.png", alt: "Hi-fi mood-first home screen", caption: "Home — pick how you feel" },
          { src: "/images/health-app/session-list.png", alt: "Hi-fi session list screen", caption: "Sessions — matched to the mood" },
        ],
        deliverables: [
          {
            label: "Prototype",
            title: "Clickable in Figma",
            body: "[X] screens, the complete launch-to-session flow clickable end to end.",
          },
          {
            label: "Foundations",
            title: "Type, colour, components",
            body: "A deliberately small system: one type scale, one warm palette, the four components the flow needed.",
          },
          {
            label: "Handoff",
            title: "Documented decisions",
            body: "Each design call written down with the research it came from — the basis for this case study.",
          },
        ],
      },
      reflections: [
        {
          n: "01",
          title: "Results",
          points: [
            "[3 of 4] testers started a session unaided, with no guidance from me.",
            "The structure held up under testing; the copy did not — and that was the cheapest thing to fix.",
            "Delivered a clickable prototype of the full core flow in one week, working alone.",
          ],
        },
        {
          n: "02",
          title: "What I'd do differently",
          points: [
            "Test at wireframe stage. I waited for hi-fi, so I was fixing wording in polished screens — slower and more precious than it needed to be.",
            "Recruit one participant outside my own network. A friendly sample is a soft sample.",
          ],
        },
        {
          n: "03",
          title: "What I learned",
          points: [
            "A persona is only useful if it can say no to a feature. Mine did, twice.",
            "Working solo, writing decisions down was what kept me honest — there was nobody to argue with.",
          ],
        },
      ],
    },
  },
  {
    id: "toy-library",
    title: "Toy Library",
    category: "UX PROJECT",
    year: "2025",
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
    color: "#B08F54",
    accentColor: "#F0E5D3",
    rotation: "1deg",
    featured: false,
    size: "medium",
    image: leksaksbibliotekImg,
    links: [
      { label: "View prototype", url: "https://www.figma.com/proto/IjWeaK8KZZXxvIS2Qh8A82/Enh%C3%B6rningstanternas-snygg-figma?node-id=6-53&scaling=scale-down&content-scaling=fixed&t=PkdXdtJGKdC2eiJ-1&page-id=0%3A1" },
      { label: "View process", url: "https://www.figma.com/board/q5SayjTnDSilmJgYNY9813/Enh%C3%B6rningstanterna?node-id=0-1&t=XFQxekg8yjtSyhUP-1" },
    ],
    caseStudy: {
      eyebrow: "UX case study",
      tagline:
        "[Placeholder tagline] — a group project designing a toy library service, from user research through to an interactive Figma prototype.",
      heroImage: { alt: "Toy Library — hi-fi screens from the final Figma prototype" },
      tintSoft: "#F5EDE1",
      accentSoft: "#E6D8C0",
      accentInk: "#967A47",
      summary: [
        { label: "The problem", body: "[Placeholder — the specific problem the team identified, confirmed against the research]" },
        { label: "My decision", body: "[Placeholder — the design decision you personally pushed for, and why]" },
        { label: "The outcome", body: "[Placeholder — what testing or delivery showed]" },
      ],
      overview: {
        heading: "[Placeholder overview heading]",
        body: [
          "[Placeholder — one or two sentences on the problem space and who the team designed for.]",
          "[Placeholder — how the team worked and what the prototype covers.]",
        ],
        contribution:
          "[Placeholder — name your specific contribution on this group project: which research, which decisions, which screens were yours.]",
      },
      facts: [
        { label: "My role", value: "[Placeholder — e.g. UX designer / researcher on a team of N]" },
        { label: "Team", value: "Group project" },
        { label: "Timeline", value: "[Placeholder]" },
        { label: "Context", value: "[Course project]" },
        { label: "Platform", value: "[Placeholder] — Figma prototype" },
      ],
      tools: ["Figma", "FigJam", "User interviews", "Empathy mapping", "Personas", "Journey mapping", "Wireframing", "Prototyping"],
      phases: [
        {
          n: "01",
          title: "Research & discovery",
          role: "[Placeholder — your role in this phase]",
          intro: "[Placeholder — what the team needed to learn before designing anything.]",
          before: ["[Placeholder — where things stood before research]"],
          did: ["[Placeholder — what the team actually did]"],
          found: ["[Placeholder finding]", "[Placeholder finding]"],
          takeaway: "[Placeholder — one-sentence takeaway from this phase]",
          images: [
            { alt: "[Placeholder — research board or interview notes]" },
            { alt: "[Placeholder — competitor teardown]" },
          ],
          caption: "[Placeholder caption]",
        },
        {
          n: "02",
          title: "Personas & journey mapping",
          role: "[Placeholder — your role in this phase]",
          intro: "[Placeholder — how research turned into a shared user picture.]",
          before: ["[Placeholder]"],
          did: ["[Placeholder — empathy map and persona work]", "[Placeholder — journey mapping]"],
          found: ["[Placeholder finding]", "[Placeholder finding]"],
          takeaway: "[Placeholder — one-sentence takeaway from this phase]",
          images: [
            { alt: "[Placeholder — empathy map]" },
            { alt: "[Placeholder — persona or journey map]" },
          ],
          caption: "[Placeholder caption]",
        },
        {
          n: "03",
          title: "Wireframes & prototype",
          role: "[Placeholder — your role in this phase]",
          intro: "[Placeholder — how the team went from journey map to screens.]",
          before: ["[Placeholder]"],
          did: ["[Placeholder — wireframing]", "[Placeholder — building the interactive prototype]"],
          found: ["[Placeholder finding]"],
          takeaway: "[Placeholder — one-sentence takeaway from this phase]",
          images: [
            { alt: "[Placeholder — wireframes]" },
            { alt: "[Placeholder — hi-fi prototype screens]" },
          ],
          caption: "[Placeholder caption]",
        },
      ],
      delivery: {
        intro: "[Placeholder — what the final prototype covers end to end.]",
        prototypeHref:
          "https://www.figma.com/proto/IjWeaK8KZZXxvIS2Qh8A82/Enh%C3%B6rningstanternas-snygg-figma?node-id=6-53&scaling=scale-down&content-scaling=fixed&t=PkdXdtJGKdC2eiJ-1&page-id=0%3A1",
        screens: [
          { alt: "[Placeholder hi-fi screen]", caption: "[Placeholder caption]" },
          { alt: "[Placeholder hi-fi screen]", caption: "[Placeholder caption]" },
          { alt: "[Placeholder hi-fi screen]", caption: "[Placeholder caption]" },
        ],
        deliverables: [
          { label: "Prototype", title: "Clickable in Figma", body: "[Placeholder — scope of the clickable flow]" },
          { label: "Foundations", title: "Type, colour, components", body: "[Placeholder — the design system basics used]" },
          { label: "Handoff", title: "Documented decisions", body: "[Placeholder — what was documented for the team/course]" },
        ],
      },
      reflections: [
        { n: "01", title: "Results", points: ["[Placeholder — what shipped and how it performed]"] },
        { n: "02", title: "What I'd do differently", points: ["[Placeholder]"] },
        { n: "03", title: "What I learned", points: ["[Placeholder]"] },
        { n: "04", title: "Next steps", points: ["[Placeholder]"] },
      ],
    },
  },
  {
    id: "wandering-bags",
    title: "Wandering Bags",
    category: "UX PROJECT",
    year: "2025",
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
    color: "#8B8A6F",
    accentColor: "#E6E1D5",
    rotation: "-0.6deg",
    featured: false,
    size: "medium",
    image: vandrandekassarImg,
    links: [
      { label: "View prototype", url: "https://www.figma.com/proto/4v4lv65dPbsVzXCG7tLwdw/SLUTPROJEKT-UX-EH-Vandrande-kasse?node-id=274-59&p=f&viewport=1283%2C92%2C0.05&t=x5QYZ6A7kJKgASg2-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=274%3A59&show-proto-sidebar=1&page-id=270%3A114" },
      { label: "View process", url: "https://www.figma.com/board/kFk0DvIAUoYUJZQyRIx6tW/FigJam-vandrande-kasse-UX-EH?node-id=0-1&t=wFc7L0nAhoThB8RX-1" },
    ],
    caseStudy: {
      eyebrow: "UX case study",
      tagline:
        "A group project designing a circular clothing-sharing concept — garments travel between neighbours instead of into landfill.",
      heroImage: { alt: "Wandering Bags — hi-fi screens from the final Figma prototype" },
      tintSoft: "#F0EBE3",
      accentSoft: "#D8D4C6",
      accentInk: "#76755E",
      summary: [
        { label: "The problem", body: "[Placeholder — the specific problem the team identified about clothes-sharing behaviour, confirmed against the research]" },
        {
          label: "My decision",
          body: "I owned the empathy map, problem statement and design goals, then carried them into prototyping — [placeholder: name the specific design call this led to].",
        },
        { label: "The outcome", body: "[Placeholder — what testing or delivery showed]" },
      ],
      overview: {
        heading: "A circular alternative to fast fashion, built around trust between neighbours",
        body: [
          "Wandering Bags is a concept for garments that travel between people in the same local community instead of being bought new and thrown away. [Placeholder — one more sentence on the specific behaviour or barrier the team designed around.]",
          "As a team we went through research, empathy mapping, personas, journey mapping, wireframes and an interactive Figma prototype. [Placeholder — how the team divided the work.]",
        ],
        contribution:
          "I was responsible for the empathy map, the problem statement, the design goals and the prototyping — the thread connecting what we learned from people to what we actually built.",
      },
      facts: [
        { label: "My role", value: "UX designer — empathy map, problem statement, design goals, prototyping" },
        { label: "Team", value: "Group project" },
        { label: "Timeline", value: "[Placeholder]" },
        { label: "Context", value: "[Course project]" },
        { label: "Platform", value: "[Placeholder] — Figma prototype" },
      ],
      tools: ["Figma", "FigJam", "User interviews", "Empathy mapping", "Journey mapping", "Wireframing", "Prototyping"],
      phases: [
        {
          n: "01",
          title: "Research & empathy mapping",
          role: "Empathy mapper",
          intro: "[Placeholder — what the team wanted to understand about how people currently pass on clothes.]",
          before: ["[Placeholder — where things stood before research]"],
          did: ["Built the empathy map the team's personas were based on.", "[Placeholder — other research activities]"],
          found: ["[Placeholder finding]", "[Placeholder finding]"],
          takeaway: "[Placeholder — one-sentence takeaway from this phase]",
          images: [
            { alt: "[Placeholder — empathy map]" },
            { alt: "[Placeholder — interview or research notes]" },
          ],
          caption: "[Placeholder caption]",
        },
        {
          n: "02",
          title: "Problem framing & design goals",
          role: "Problem framer",
          intro: "[Placeholder — how the team narrowed research into a problem worth solving.]",
          before: ["[Placeholder]"],
          did: ["Wrote the problem statement and design goals the rest of the team designed against.", "[Placeholder — journey mapping]"],
          found: ["[Placeholder finding]"],
          takeaway: "[Placeholder — one-sentence takeaway from this phase]",
          images: [
            { alt: "[Placeholder — problem statement / design goals artefact]" },
            { alt: "[Placeholder — journey map]" },
          ],
          caption: "[Placeholder caption]",
        },
        {
          n: "03",
          title: "Wireframes & prototyping",
          role: "Prototyper",
          intro: "[Placeholder — how the design goals became a clickable flow.]",
          before: ["[Placeholder]"],
          did: ["Built the wireframes and the interactive Figma prototype from the agreed design goals."],
          found: ["[Placeholder finding]"],
          takeaway: "[Placeholder — one-sentence takeaway from this phase]",
          images: [
            { alt: "[Placeholder — wireframes]" },
            { alt: "[Placeholder — hi-fi prototype screens]" },
          ],
          caption: "[Placeholder caption]",
        },
      ],
      delivery: {
        intro: "[Placeholder — what the final prototype covers end to end.]",
        prototypeHref:
          "https://www.figma.com/proto/4v4lv65dPbsVzXCG7tLwdw/SLUTPROJEKT-UX-EH-Vandrande-kasse?node-id=274-59&p=f&viewport=1283%2C92%2C0.05&t=x5QYZ6A7kJKgASg2-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=274%3A59&show-proto-sidebar=1&page-id=270%3A114",
        screens: [
          { alt: "[Placeholder hi-fi screen]", caption: "[Placeholder caption]" },
          { alt: "[Placeholder hi-fi screen]", caption: "[Placeholder caption]" },
          { alt: "[Placeholder hi-fi screen]", caption: "[Placeholder caption]" },
        ],
        deliverables: [
          { label: "Prototype", title: "Clickable in Figma", body: "[Placeholder — scope of the clickable flow]" },
          { label: "Foundations", title: "Type, colour, components", body: "[Placeholder — the design system basics used]" },
          { label: "Handoff", title: "Documented decisions", body: "The problem statement and design goals I wrote, carried through to the final prototype." },
        ],
      },
      reflections: [
        { n: "01", title: "Results", points: ["[Placeholder — what shipped and how it performed]"] },
        { n: "02", title: "What I'd do differently", points: ["[Placeholder]"] },
        { n: "03", title: "What I learned", points: ["[Placeholder]"] },
        { n: "04", title: "Next steps", points: ["[Placeholder]"] },
      ],
    },
  },
  {
    id: "optichain",
    title: "OptiChain — Business Website",
    category: "FRONTEND PROJECT",
    year: "2024",
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
    color: "#BC9767",
    accentColor: "#F1E7DA",
    rotation: "1deg",
    featured: true,
    size: "medium",
    image: optichaingImg,
    links: [{ label: "Live website", url: "https://optichain.se/" }],
  },
  {
    id: "kanban-board",
    title: "Kanban Board",
    category: "FRONTEND PROJECT",
    year: "2025",
    shortDesc:
      "Drag-and-drop task manager with TypeScript, React, and dnd-kit. Built for intuitive flow and real UX feedback.",
    longDesc:
      "A fully functional Kanban task management app. Drag-and-drop powered by dnd-kit, reusable component architecture in TypeScript, and strong UX attention — visual feedback on every interaction, fully responsive on mobile and desktop.",
    tags: ["TypeScript", "React", "dnd-kit", "Responsive"],
    color: "#A9705C",
    accentColor: "#EBDCD6",
    rotation: "-0.8deg",
    featured: true,
    size: "medium",
    image: kanbanImg,
    links: [
      { label: "GitHub", url: "https://github.com/Lisette93/KanbanBoard" },
      { label: "Live demo", url: "https://lisette93.github.io/KanbanBoard/" },
    ],
  },
  {
    id: "alien-planet",
    title: "Alien Planet",
    category: "FRONTEND PROJECT",
    year: "2025",
    shortDesc:
      "Group project where we built a fullstack alien database with React, TypeScript and Node.js — I was responsible for the frontend, component design, filtering and AI-generated visuals.",
    longDesc:
      "Alien Planet is a fullstack school project built as a team using an agile workflow — daily standups, sprints, sprint reviews and retrospectives tracked via a GitHub Projects kanban board. The app is a database of alien species and their home planets, with a 1:N relationship between planet and aliens.\n\nI handled the frontend together with a classmate: card components for aliens and planets, client-side filtering with useMemo, and TypeScript interfaces for the full data model. I also took ownership of the visual identity — generating AI images with a dark neon aesthetic in purples, blues and teals that runs throughout the entire app.",
    tags: ["React", "TypeScript", "Node.js", "Fullstack", "Agile", "Git"],
    color: "#8E8078",
    accentColor: "#E8E0DA",
    rotation: "0.8deg",
    featured: false,
    size: "medium",
    image: alienPlanetImg,
    imagePad: "p-4",
    links: [
      { label: "Live demo", url: "https://alien-planet.onrender.com/" },
      { label: "GitHub", url: "https://github.com/MattiasKopparberg/Alien-planet" },
    ],
  },
  {
    id: "student-portal",
    title: "Student Portal",
    category: "FRONTEND PROJECT",
    year: "2024",
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
      { label: "GitHub", url: "https://github.com/Lisette93/StudentPortal" },
      { label: "Live demo", url: "https://lisette93.github.io/StudentPortal/" },
    ],
  },
];
