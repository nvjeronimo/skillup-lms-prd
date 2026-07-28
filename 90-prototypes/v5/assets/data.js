// V5 Prototype data — sourced directly from Figma file Wz2TCYFVr0hD8tJNiLajLt
// Screens: 1460:178 (My Learning), 1505:192 (Program Detail), 1463:178 (Course PD),
// 1465:178 (Live VILT), 1485:1323 (Live Sessions Upcoming), 1485:1498 (Completed)

window.V5_DATA = {
  today: "APR 21, 2026",
  user: { name: "John Smith", role: "Learner", initials: "JS" },

  // =====================================================================
  // MY LEARNING (1460:178)
  // =====================================================================
  myLearning: {
    liveBanner: {
      course: "UX Research and Design Thinking",
      topic: "Module 2 — Agile Coach Q&A",
      elapsed: "23 min elapsed (of 60 min)",
    },
    kpis: [
      { bar: "var(--mod-live)", label: "In Progress", value: "3" },
      { bar: "var(--mod-notstarted)", label: "Not Started", value: "1" },
      { bar: "var(--mod-milestone)", label: "Live Session Today", value: "1" },
    ],
    scopeFilter: ["All", "Programs", "Courses"],
    subTabs: [
      { label: "In Progress", count: 3, active: true },
      { label: "Completed", count: 1 },
      { label: "Expired", count: 1 },
    ],

    // AIDM program card — blue border, expanded course list
    aidmCard: {
      id: "aidm",
      title: "AI-Driven Digital Marketing Certificate",
      delivery: "Flexible + Live Sessions",
      meta: "Intermediate · 7 courses · Starts March 29, 2025",
      startsBadge: "Starts in 14 days",
      progressPct: 6,
      status: "In Progress",
      courses: [
        { num: 1, state: "active", title: "Digital Marketing Fundamentals and the AI Mindset",
          prep: true, live: "🎥 MAR 25 · 3pm", progress: 45, cta: "Continue" },
        { num: 2, state: "available", title: "AI-Driven Content and Brand Communication",
          prep: true, live: "🎥 APR 2 · 6pm", cta: "Start" },
        { num: 3, state: "locked", title: "SEO, GEO, and Organic Growth with AI", unlock: "Mar 29" },
        { num: 4, state: "locked", title: "Paid Advertising and Media", unlock: "Mar 29" },
        { num: 5, state: "locked", title: "Social Media and Ecommerce Marketing", unlock: "Mar 29" },
        { num: 6, state: "locked", title: "Email, CRM, and Lifecycle Marketing with AI", unlock: "Mar 29" },
        { num: 7, state: "locked", title: "Capstone Project: AI-First Marketing System", unlock: "Mar 29" },
      ],
    },

    // Four single-course cards
    singleCourses: [
      {
        id: "ux-research",
        title: "UX Research and Design Thinking",
        delivery: "Flexible + Live Sessions",
        meta: "3 modules · 9 lessons · 3 live sessions · 14h",
        progress: 67,
        status: "In Progress",
        crumb: {
          module: "Module 2: User Interview Techniques",
          lesson: "Lesson 3: Synthesizing Research Findings",
          topic: "Topic: Affinity Mapping Exercise (2 of 4)",
        },
        nextLive: { title: "Research Presentation Workshop", chip: "🎥 MAR 28 at 3pm", badge: "UPCOMING" },
      },
      {
        id: "pm-ai",
        title: "Project Management with AI Tools",
        delivery: "Flexible + Live Sessions",
        meta: "4 modules · 12 lessons · 4 live sessions · 18h",
        progress: 35,
        status: "In Progress",
        crumb: {
          module: "Module 2: Agile Methodology",
          lesson: "Lesson 2: Sprint Planning and Execution",
          topic: "Topic: Backlog Prioritization (1 of 3)",
        },
        nextLive: { title: "Agile Coach Q&A", chip: "🎥 TODAY · 6:00 PM", badge: "LIVE TODAY", isLiveToday: true },
      },
      {
        id: "ba-python",
        title: "Business Analytics with Python",
        delivery: "Flexible + Live Sessions",
        meta: "5 modules · 15 lessons · 5 live sessions · 22h",
        status: "Not Started",
        notStarted: true,
        cta: "Start Course",
        nextLive: { title: "Data Visualization Workshop", chip: "🎥 MAR 30 at 3pm", badge: "UPCOMING" },
      },
      {
        id: "leadership",
        title: "Leadership in Remote Teams",
        delivery: "Flexible + Live Sessions",
        meta: "3 modules · 8 lessons · 2 live sessions · 10h",
        progress: 52,
        status: "In Progress",
        inlineLive: "🎥 APR 3 · 4pm",
        crumb: {
          module: "Module 2: Building Trust Remotely",
          lesson: "Lesson 1: Async Communication",
          topic: "Topic: Norms Worksheet (1 of 3)",
        },
      },
    ],
  },

  // =====================================================================
  // PROGRAM DETAIL (1505:192) — AI-Driven Digital Marketing Certificate
  // =====================================================================
  program: {
    breadcrumb: ["My Learning", "AI-Driven Digital Marketing Certificate"],
    startsBadge: "Starts in 14 days",
    title: "AI-Driven Digital Marketing Certificate",
    subtitle: "A professional certificate program in digital marketing powered by AI. Covers strategy, content, SEO, paid media, social commerce, email marketing, and a capstone project with live expert sessions.",

    progress: {
      pct: 27,
      kpis: [
        { label: "CONTENT", value: "24h/89h", sub: "consumed" },
        { label: "COURSES", value: "1/7", sub: "completed" },
        { label: "MODULES", value: "9/28", sub: "32% complete" },
        { label: "LESSONS", value: "12/64", sub: "completed" },
        { label: "NEXT LIVE SESSIONS", value: "Apr 23", sub: "Thu · 6pm", accent: true },
      ],
    },

    continueCard: {
      title: "Keyword research workshop",
      meta: "Course 1 · Module 2 · Topic 6 of 10",
    },

    milestoneStrip: [
      { bar: "var(--mod-live)", label: "Next milestone", value: "Capstone Brief · Jun 15" },
      { bar: "var(--mod-milestone)", label: "Benefits/Services", value: "Mentoring · Coaching · Community +2" },
      { bar: "var(--mod-asmt)", label: "Next Live Session", value: "Thu Apr 23 at 6pm" },
    ],

    tabs: ["Courses", "Live Sessions", "Calendar", "Mentoring", "Certificates", "About"],
    prepBanner: "Program starts March 29, 2025. Course 1 is available now as preparation track. Complete it before the start date.",

    courses: [
      { num: 0, state: "completed", title: "Foundations Preparation",
        meta: "4 modules · 12 lessons · Completed Feb 28", progress: 100, cta: "Revisit" },
      { num: 1, state: "active", title: "Digital Marketing Fundamentals and the AI Mindset",
        prep: true, meta: "4 modules · 12 lessons · 5 live sessions", progress: 45, cta: "Continue" },
      { num: 2, state: "available", title: "AI-Driven Content and Brand Communication",
        prep: true, meta: "4 modules · 12 lessons · 5 live sessions", cta: "Start" },
      { num: 3, state: "locked", title: "SEO, GEO, and Organic Growth with AI",
        meta: "4 modules · 11 lessons · 5 live sessions", unlock: "Mar 29" },
      { num: 4, state: "locked", title: "Paid Advertising and Media",
        meta: "4 modules · 11 lessons · 5 live sessions", unlock: "Mar 29" },
      { num: 5, state: "locked", title: "Social Media and Ecommerce Marketing",
        meta: "5 modules · 14 lessons · 6 live sessions", unlock: "Mar 29" },
      { num: 6, state: "locked", title: "Email, CRM, and Lifecycle Marketing with AI",
        meta: "3 modules · 7 lessons · 4 live sessions", unlock: "Mar 29" },
      { num: 7, state: "locked", title: "Capstone Project: AI-First Marketing System",
        meta: "4 modules · 5 lessons · 2 live sessions", unlock: "Mar 29" },
    ],

    infoCards: [
      {
        bar: "var(--mod-live)", title: "Program Milestones",
        subtitle: "Key dates across the 8-month journey",
        rows: [
          { date: "Mar 29", label: "Kickoff & Orientation Week" },
          { date: "Jun 15", label: "Capstone Project Brief Released" },
          { date: "Sep 10", label: "Industry Expert Panel · Live" },
          { date: "Oct 20", label: "Capstone Final Review" },
          { date: "Nov 29", label: "Certification Awarded" },
        ],
      },
      {
        bar: "var(--mod-asmt)", title: "Live Experiences",
        subtitle: "55h across 7 courses · 65% of content",
        rows: [
          { num: "32", label: "Live Sessions across all courses" },
          { num: "8", label: "Industry Expert Panels" },
          { num: "12", label: "Workshops & Masterclasses" },
          { num: "•", label: "Weekly Office Hours · Tue & Thu" },
          { num: "•", label: "Capstone Live Showcase" },
        ],
      },
      {
        bar: "var(--mod-benefit)", title: "Program Benefits",
        subtitle: "Included with enrollment",
        rows: [
          { num: "✦", label: "1:1 Mentoring · 8 sessions" },
          { num: "✦", label: "Career Coaching & Portfolio Review" },
          { num: "✦", label: "Peer Community Slack Channel" },
          { num: "✦", label: "Alumni Network Access" },
          { num: "✦", label: "Certificate of Completion" },
        ],
      },
    ],
  },

  // =====================================================================
  // COURSE PD (1463:178) — Course 1: Digital Marketing Fundamentals
  // =====================================================================
  course1: {
    breadcrumb: ["My Learning", "AI-Driven Digital Marketing Certificate", "Digital Marketing Fundamentals and the AI Mindset"],
    affiliation: { program: "AI-Driven Digital Marketing Certificate", position: "Course 1 of 7" },
    title: "Digital Marketing Fundamentals and the AI Mindset",
    subtitle: "Master the foundations of digital marketing with an AI-first approach. Covers digital strategy, customer journeys, prompt engineering, and agentic AI applied to marketing.",

    progress: {
      pct: 27,
      kpis: [
        { label: "MODULES", value: "2/4", sub: "in progress" },
        { label: "LESSONS", value: "1/10", sub: "attended" },
        { label: "TOPICS", value: "9/36", sub: "25% complete" },
        { label: "LIVE SESSIONS", value: "2/13", sub: "attended" },
        { label: "NEXT LIVE SESSIONS", value: "Apr 23", sub: "Thu · 6pm", accent: true },
      ],
    },

    continueCard: {
      title: "Keyword research workshop",
      meta: "Course 1 · Module 2 · Topic 6 of 10",
    },

    tabs: ["Modules", "Live Sessions", "Instructors", "Reviews", "About"],

    modules: [
      {
        num: 1, state: "completed",
        title: "Module 1: Modern Digital Marketing Landscape",
        meta: "4 lessons · 1 live · 2h",
      },
      {
        num: 2, state: "active", expanded: true,
        title: "Module 2: Customer Journeys and Growth Thinking",
        meta: "3 lessons · 1 live · 3h",
        progress: 60,
        lessons: [
          {
            num: 1, state: "completed",
            title: "Digital Channel Foundations",
            meta: "Video + Reading + Activity · 26 min",
            topics: [
              { done: true, label: "Introduction to Digital Channels (6 min, Video)" },
              { done: true, label: "Paid Channels (5 min, Reading)" },
              { done: true, label: "Organic Channels (5 min, Reading)" },
              { done: true, label: "Channel Selection Challenge (10 min, Activity)" },
            ],
          },
          {
            num: 2, state: "inprogress",
            title: "Digital Audience",
            meta: "Podcast + Activity · 20 min",
            topics: [
              { done: true, label: "Role of Audience Understanding (10 min, Podcast)" },
              { current: true, label: "Mapping Audience to Brands (10 min, Activity)" },
            ],
          },
          {
            num: 3, state: "upcoming", isVilt: true,
            title: "Industry Expert Session",
            meta: "Live Session · 2h 15min",
            topics: [
              { label: "Digital Target Audience (45 min, VILT) · Thu Apr 30, 2026 · 6:00 PM" },
              { label: "Effective Use of Digital Channels (30 min, VILT) · Thu Apr 23, 2026 · 6:00 PM" },
              { label: "Customer Journey Mapping (30 min, VILT) · Thu May 7, 2026 · 6:00 PM" },
              { label: "Digital Customer Journey Intervention (30 min, VILT) · Thu May 14, 2026 · 6:00 PM" },
            ],
          },
        ],
      },
      {
        num: 3, state: "available",
        title: "Module 3: Prompting as a Professional Marketing Skill",
        meta: "3 lessons · 1 live · 3h 30min",
      },
      {
        num: 4, state: "locked",
        title: "Module 4: Final Project, Assessment, and Wrap-Up",
        meta: "2 lessons · 2 live · 3h 10min",
      },
    ],
  },

  // =====================================================================
  // IMMERSIVE / LIVE VILT (1465:178)
  // =====================================================================
  immersive: {
    course: "Digital Marketing Fundamentals and the AI Mindset",
    module: "Module 2: Customer Journeys and Growth Thinking",
    liveBadge: "● LIVE NOW",
    elapsed: "23 min elapsed",

    moduleStepper: [
      { num: 1, state: "done" },
      { num: 2, state: "current" },
      { num: 3, state: "pending" },
      { num: 4, state: "pending" },
    ],

    lesson: {
      lessonLabel: "Lesson 3: Industry Expert Session",
      topicTitle: "Effective Use of Digital Channels",
      duration: "Duration: 30 min",
    },

    meta: "LIVE · 1h 30min · David Chen · Started at 3:00 PM EST",
    instructor: "David Chen (Instructor)",
    you: "You",
    participants: "87 participants",

    tabs: [
      { label: "Live Session", active: true },
      { label: "Resources", count: 3 },
      { label: "💬 Chat", count: 12 },
      { label: "📎 Resources", count: 6 },
    ],

    controls: ["🎤 Muted", "📷 Camera Off", "✋ Raise Hand"],
    recordingNotice: "This session is being recorded. Recording will be available after the session.",

    topicStepper: {
      label: "Topic 1 of 4",
      pills: [
        { state: "done" },
        { state: "current" },
        { state: "pending" },
        { state: "pending" },
      ],
    },

    sidebar: {
      moduleTitle: "Module 2: Customer Journeys and Growth Thinking",
      moduleProgress: 45,
      lessons: [
        {
          num: 1, title: "Lesson 1: Digital Channel Foundations",
          meta: "Video 1 · Reading 2 · Activity 1",
        },
        {
          num: 2, title: "Lesson 2: Digital Audience",
          meta: "Podcast 1 · Activity 1",
        },
        {
          num: 3, expanded: true, isVilt: true,
          title: "Lesson 3: Industry Expert Session",
          meta: "VILT · 4 sessions · 2h 15min",
          topics: [
            { state: "done", label: "Digital Target Audience · Apr 30, 6pm" },
            { state: "current", label: "Effective Use of Digital Channels · Apr 23, 6pm" },
            { state: "pending", label: "Customer Journey Mapping · May 7, 6pm" },
            { state: "pending", label: "Digital Customer Journey Intervention · May 14, 6pm" },
          ],
        },
      ],
    },
  },

  // =====================================================================
  // LIVE SESSIONS — as Course PD tab (1485:1323 upcoming, 1485:1498 completed)
  // =====================================================================
  liveSessionsUpcoming: {
    thisWeek: [
      {
        date: { m: "APR", d: "23" },
        title: "Industry Expert Session — AI Content Ops",
        badge: "LIVE TODAY",
        liveToday: true,
        path: "Module 2: Customer Journeys · Lesson 3: Industry Expert Session",
        instructor: "Sarah Chen",
        time: "12:00 PM - 1:30 PM EST",
      },
      {
        date: { m: "APR", d: "25" },
        title: "Live Q&A — Prompt patterns for marketers",
        path: "Module 3: Prompting · Lesson 2: Prompt Patterns",
        instructor: "Sarah Chen",
        time: "2:00 PM - 3:00 PM EST",
      },
    ],
    next30: [
      {
        date: { m: "APR", d: "27" },
        title: "Brand Voice Systems Workshop",
        path: "Module 4: Campaign Design · Lesson 2: Brand Voice",
        instructor: "James Park",
        time: "2:00 PM - 4:00 PM EST",
      },
      {
        date: { m: "APR", d: "29" },
        title: "AI Content Development Lab",
        path: "Module 4: Campaign Design · Lesson 3: Content Lab",
        instructor: "James Park",
        time: "3:00 PM - 5:00 PM EST",
      },
      {
        date: { m: "APR", d: "30" },
        title: "Course Wrap-Up and Q&A",
        path: "Module 4: Campaign Design · Lesson 3: Wrap-Up",
        instructor: "Sarah Chen",
        time: "3:00 PM - 4:30 PM EST",
      },
    ],
  },

  liveSessionsCompleted: {
    recent: [
      {
        date: { m: "APR", d: "17" },
        title: "Visual Content and AI Advertising",
        path: "Module 3: Prompting · Lesson 3: Visual Content & Ads",
        instructor: "James Park",
        time: "11:00 AM - 1:00 PM EST",
      },
      {
        date: { m: "APR", d: "16" },
        title: "AI Content Tools and Prompting",
        path: "Module 3: Prompting · Lesson 2: Content Tools",
        instructor: "Lisa Patel",
        time: "3:00 PM - 5:00 PM EST",
      },
      {
        date: { m: "APR", d: "14" },
        title: "Brand Voice and Consistency Lab",
        path: "Module 3: Prompting · Lesson 1: Brand Voice in AI",
        instructor: "David Tan",
        time: "9:00 AM - 11:00 AM EST",
      },
      {
        date: { m: "APR", d: "10" },
        title: "Customer Journey Mapping Workshop",
        path: "Module 2: Customer Journeys · Lesson 3: Journey Mapping",
        instructor: "Emily Chen",
        time: "1:00 PM - 3:00 PM EST",
      },
      {
        date: { m: "APR", d: "9" },
        title: "Digital Channels and Target Audience",
        path: "Module 1: Modern Digital Landscape · Lesson 2: Channels & Audience",
        instructor: "Sarah Chen",
        time: "10:00 AM - 12:00 PM EST",
      },
      {
        date: { m: "APR", d: "2" },
        title: "AI Mindset for Marketers",
        path: "Module 1: Modern Digital Landscape · Lesson 2: AI Mindset",
        instructor: "Sarah Chen",
        time: "12:00 PM - 1:30 PM EST",
      },
    ],
  },
};
