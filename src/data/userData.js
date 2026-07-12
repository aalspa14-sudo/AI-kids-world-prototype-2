/**
 * ============================================================
 * USER_DATA — Master Content Configuration (Prototype 2)
 * ============================================================
 * Same data-driven architecture as prototype 1: ALL content
 * lives here. Additions for the new design: hero.trustRow,
 * hero.bookCover (drop-in image slot), characters, stats, and featureTiles.
 * Drone content is IDENTICAL to prototype 1 by design.
 */

export const USER_DATA = {
  brand: {
    name: "AI-Kids World",
    tagline: "Learn · Create · Grow",
    logoEmoji: "🤖",
    amazonUrl: "https://www.amazon.com", // TODO: replace with real listing
  },

  nav: {
    links: [
      { label: "Book", href: "#book" },
      { label: "Parents", href: "#parents" },
      { label: "Activities", href: "#activities" },
    ],
    playgroundCta: {
      label: "Playground 🚀",
      tag: "Coming Soon",
      targetId: "waitlist",
    },
  },

  hero: {
    // "AI Kids" renders letter-by-letter in rainbow colors; "World" in navy.
    headlineRainbow: "AI Kids",
    headlineDark: "World",
    subheadline: [
      { text: "Where Young Minds " },
      { text: "Learn", color: "blue" },
      { text: ", " },
      { text: "Create", color: "purple" },
      { text: " and " },
      { text: "Grow", color: "green" },
      { text: " with Artificial Intelligence " },
      { text: "Safely.", color: "gold" },
    ],
    subcopy:
      "The safest AI learning ecosystem for kids and tweens under 13. Explore. Imagine. Innovate. Shape the future.",
    primaryCta: { label: "Buy on Amazon", emoji: "📚" },
    secondaryCta: { label: "Try the Activities", emoji: "🎮", targetId: "activities" },
    trustRow: [
      { icon: "ShieldCheck", label: "100% Safe & Secure", color: "green" },
      { icon: "Users", label: "Parent Monitoring", color: "blue" },
      { icon: "Lock", label: "Privacy by Design", color: "purple" },
    ],
    rating: { stars: 5, text: "Loved by 2,000+ young explorers & their parents" },
    /**
     * BOOK COVER SLOT — drop the real cover art into
     * prototype-2/public/book-cover.png and it automatically replaces the
     * placeholder cover on the floating book. Delete the file to fall back.
     */
    bookCover: {
      src: "/book-cover.png",
      alt: "AI Kids World book cover",
      // Shown on the placeholder cover until the real art is dropped in.
      placeholderTitle: "AI Kids World",
      placeholderTagline: "Learn · Create · Grow",
      placeholderEmoji: "🤖",
    },
  },

  stats: [
    { value: "50+", label: "AI Courses", icon: "GraduationCap", color: "purple" },
    { value: "200+", label: "AI Tools", icon: "Briefcase", color: "blue" },
    { value: "1000+", label: "Projects", icon: "FolderOpen", color: "green" },
    { value: "25K+", label: "Young Learners", icon: "Users", color: "gold" },
    { value: "99.9%", label: "Safe & Secure", icon: "ShieldCheck", color: "cyan" },
  ],

  featureTiles: [
    { icon: "Brain", title: "Learn AI", text: "Understand what AI is and how it works.", color: "purple" },
    { icon: "Palette", title: "Create", text: "Create images, videos, stories and more.", color: "gold" },
    { icon: "Code2", title: "Code", text: "Build apps, games and bring ideas to life.", color: "blue" },
    { icon: "Gamepad2", title: "Play & Explore", text: "Play AI games, solve challenges and win.", color: "pink" },
    { icon: "Sprout", title: "Grow", text: "Build future skills and shape your future.", color: "green" },
  ],

  floaties: [
    { emoji: "🪐", top: "16%", left: "5%", delay: "0s" },
    { emoji: "🚀", top: "28%", left: "93%", delay: "1.2s" },
    { emoji: "⭐", top: "70%", left: "4%", delay: "2.1s" },
    { emoji: "✨", top: "82%", left: "94%", delay: "3s" },
    { emoji: "🛸", top: "50%", left: "96%", delay: "1.8s" },
  ],

  /**
   * MEET THE CHARACTERS — three book characters, shown right above the
   * For Parents section. IMAGE SLOTS: drop each character's art into
   * prototype-2/public/characters/<file>.png and it automatically replaces
   * the emoji placeholder. Names/descriptions are yours to rewrite.
   */
  characters: {
    badge: { emoji: "🌟", text: "Meet the Characters" },
    heading: "Your crew for the AI adventure",
    subcopy: "Three friends from the book who guide every mission, chapter by chapter.",
    cast: [
      {
        name: "Byte the Drone",
        role: "Mission Guide",
        emoji: "🤖",
        color: "gold",
        image: { src: "/characters/byte.png", alt: "Byte the drone" },
        description:
          "A zippy orange drone with a big heart and a bigger battery. Byte explains how AI really works — and gets things hilariously wrong so kids can spot the mistakes.",
      },
      {
        name: "Character Two",
        role: "The Curious One",
        emoji: "🧒",
        color: "blue",
        image: { src: "/characters/character-2.png", alt: "Character two" },
        description:
          "Placeholder description — tell readers who this character is, what makes them special, and what they teach kids along the way.",
      },
      {
        name: "Character Three",
        role: "The Inventor",
        emoji: "👧",
        color: "purple",
        image: { src: "/characters/character-3.png", alt: "Character three" },
        description:
          "Placeholder description — tell readers who this character is, what makes them special, and what they teach kids along the way.",
      },
    ],
  },

  forParents: {
    badge: { emoji: "🛡️", text: "For Parents" },
    heading: "Why not just hand them ChatGPT?",
    intro:
      "Because tools like ChatGPT were built for adults. Most AI chatbots require users to be 13+, can produce unpredictable content, and collect data that isn't designed with children in mind. Kids deserve a better on-ramp.",
    points: [
      {
        icon: "ShieldCheck",
        chip: "chipA",
        title: "A safe, monitored sandbox",
        text: "Our upcoming Safe AI Playground has no open-ended chatbot. Every activity is hand-built, reviewed, and runs on curated content — nothing unpredictable ever reaches your child.",
      },
      {
        icon: "BookOpen",
        chip: "chipB",
        title: "Concepts before chatbots",
        text: "The book teaches how AI actually works — prediction, patterns, and data — so kids become critical thinkers about AI instead of passive consumers of it.",
      },
      {
        icon: "Eye",
        chip: "chipC",
        title: "Parents stay in the loop",
        text: "No accounts for kids, no data harvesting, no dark patterns. Parents sign up, parents supervise, and progress reports go to you — not to an ad network.",
      },
    ],
    reassurance:
      "Think of it as swimming lessons for the AI era: a shallow, lifeguarded pool — not the open ocean.",
  },

  bookPreview: {
    badge: { emoji: "📖", text: "Peek Inside" },
    heading: "Flip through a few pages",
    subcopy: "Real spreads from the book — big ideas, zero jargon, lots of laughs.",
    pages: [
      {
        emoji: "🤖",
        chapter: "Chapter 1",
        title: "What IS a Robot Brain?",
        text: "Meet Byte the drone! Discover why a computer 'brain' is really just a super-fast pattern-spotting machine — and why it still can't tie its own shoelaces.",
        accent: "cyan",
      },
      {
        emoji: "🔮",
        chapter: "Chapter 3",
        title: "The Great Guessing Game",
        text: "AI doesn't 'know' the next word — it guesses it! Play along as Byte predicts the end of a sentence and gets it hilariously wrong.",
        accent: "green",
      },
      {
        emoji: "👀",
        chapter: "Chapter 5",
        title: "How Computers See",
        text: "To a computer, your cat photo is just a giant grid of numbers. Learn how machines find edges, shapes, and eventually... whiskers.",
        accent: "pink",
      },
      {
        emoji: "🧭",
        chapter: "Chapter 8",
        title: "Being the Boss of AI",
        text: "AI is a tool, and YOU are the pilot. Learn the three golden rules for using AI safely, fairly, and honestly.",
        accent: "gold",
      },
    ],
  },

  activities: {
    badge: { emoji: "🎮", text: "Mission Training" },
    heading: "Play with real AI ideas",
    subcopy:
      "No AI backend, no chatbots — just hands-on games that teach how the machines actually think.",

    predictOMatic: {
      id: "predict-o-matic",
      title: "The Predict-O-Matic",
      tagline: "How language AI guesses the next word",
      icon: "Sparkles",
      chip: "chipA",
      baseSentence: "The astronaut flew their rocket to the",
      explainer:
        "Large Language Models don't 'know' anything — they pick the next word based on probability. Higher % = more likely. But sometimes the silly word wins!",
      completedMessage: "🎉 Sentence complete! That's exactly how AI writes — one probable (or silly) word at a time.",
      steps: [
        {
          options: [
            { word: "Moon", probability: 75 },
            { word: "Mars", probability: 20 },
            { word: "giant space pickle", probability: 5 },
          ],
        },
        {
          options: [
            { word: "to search for", probability: 70 },
            { word: "to high-five", probability: 20 },
            { word: "to babysit", probability: 10 },
          ],
        },
        {
          options: [
            { word: "sparkly", probability: 65 },
            { word: "grumpy", probability: 25 },
            { word: "invisible", probability: 10 },
          ],
        },
        {
          options: [
            { word: "moon rocks.", probability: 80 },
            { word: "aliens.", probability: 15 },
            { word: "socks.", probability: 5 },
          ],
        },
      ],
    },

    pixelDecoder: {
      id: "pixel-decoder",
      title: "The Pixel-Art Decoder",
      tagline: "How computer vision sees with numbers",
      icon: "ScanSearch",
      chip: "chipC",
      explainer:
        "Computers can't 'see' pictures — they see grids of numbers. Sweep the magnifying lens over the sensor grid to reveal the numbers. 0 = bright, 9 = dark. Can you spot the hidden shape before the scan finishes?",
      revealedMessage: "🔍 Scan complete! Your brain found the edges — the letter A — exactly like an AI's edge-detection filter does.",
      hiddenShapeName: "the letter A",
      // 10x10 brightness matrix: 0 = white/empty, 9 = black. Forms a letter 'A'
      // with softer edge values (4) so kids see how edges 'fade' in sensor data.
      grid: [
        [0, 0, 0, 4, 9, 9, 4, 0, 0, 0],
        [0, 0, 4, 9, 9, 9, 9, 4, 0, 0],
        [0, 4, 9, 9, 4, 4, 9, 9, 4, 0],
        [0, 4, 9, 4, 0, 0, 4, 9, 4, 0],
        [4, 9, 9, 4, 4, 4, 4, 9, 9, 4],
        [4, 9, 9, 9, 9, 9, 9, 9, 9, 4],
        [9, 9, 4, 0, 0, 0, 0, 4, 9, 9],
        [9, 9, 4, 0, 0, 0, 0, 4, 9, 9],
        [9, 4, 0, 0, 0, 0, 0, 0, 4, 9],
        [9, 4, 0, 0, 0, 0, 0, 0, 4, 9],
      ],
    },
  },

  certificate: {
    badge: { emoji: "🏅", text: "Unlockable Reward" },
    heading: "Earn your AI Explorer Certificate",
    subcopy:
      "Finish the book missions and playground training to unlock an official, printable certificate — signed by Byte the drone himself.",
    certTitle: "AI Explorer Certificate",
    certSubtitle: "AI Kids World Academy · Class of 2026",
    placeholderName: "Your Name Here",
    skills: [
      { emoji: "🔮", label: "Prediction Pro" },
      { emoji: "👀", label: "Vision Decoder" },
      { emoji: "🛡️", label: "Safety Captain" },
    ],
  },

  waitlist: {
    badge: { emoji: "🎯", text: "Mission Control" },
    heading: "Join the Safe AI Playground waitlist",
    subcopy:
      "Parents: be first in line when the Playground launches. Early crew members unlock rewards for the whole community as the list grows!",
    inputPlaceholder: "parent@example.com",
    buttonLabel: "Reserve My Spot",
    buttonEmoji: "🎒",
    successTitle: "Success! You're on the list 🎒",
    successText:
      "Welcome to the launch crew! Check your inbox for a confirmation and a free printable activity.",
    trustRow: "No spam, ever. Parent emails only. Unsubscribe anytime.",
    currentSignups: 812,
    milestones: [
      { count: 500, emoji: "🎨", reward: "Free printable coloring pack" },
      { count: 1000, emoji: "📖", reward: "Bonus mini-chapter for everyone" },
      { count: 2500, emoji: "🚀", reward: "Playground early-access beta" },
    ],
  },

  /**
   * Byte THE DRONE.
   * This character uses the playful orange maker-drone design shown
   * in the interactive companion SVG.
   */
  drone: {
    name: "Byte",
    colors: {
      body: "#ff8a2a",
      bodyDark: "#e06612",
      accent: "#ffd54a",
      eye: "#22e3ff",
      propeller: "#a49dd6",
    },
    greeting: "Hi! I'm Byte, your mission drone. Click me!",
    dialogue: [
      "Optimizing Byte levels... done. I feel 12% zippier!",
      "Warning: high concentration of clean code detected here.",
      "Fun fact: I see this page as 1,048,576 tiny numbers.",
      "Did you try the Predict-O-Matic? I got 'space pickle' three times.",
      "My battery is at 99%. The other 1% is pure enthusiasm.",
      "Scanning for cookies... the chocolate-chip kind. None found. 😞",
      "Remember: AI is the rocket, but YOU are the pilot.",
      "Psst — tell your parents about the waitlist. I want more friends!",
      "Recalibrating gyroscope... wheee! Okay, I'm fine.",
    ],
  },

  footer: {
    copyright: "© 2026 AI Kids World",
    privacyLine: "Built with ❤️ for curious kids. COPPA-friendly: we never collect data from children.",
  },
};
