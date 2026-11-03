// Layout, portraits and lettering follow the updated Our People (2).pdf.
// The PDF uses different original Bob photographs in his profile and family row.
const bobFamilyPortrait = { src: "bob-profile-updated.jpg", width: 1122, height: 1402 };
export const leadershipIntroduction = "Babco Foods is led by an experienced management team whose vision and hands-on leadership have driven the company’s consistent growth and strong presence in the U.S. food industry. Based in New Jersey, our leadership team has guided the company’s progress since its founding in 2002.";
export const founders = [
  {
    id: "robert-bob-vaz", name: "Robert (Bob) Vaz", role: "Partner & CEO", side: "right", theme: "blue",
    photo: {
      src: "bob-profile-design.jpg", width: 1122, height: 1402,
      crop: { left: "-5.915%", top: "-9.214%", width: "111.89%" },
    },
    paragraphs: [
      ["Bob oversees all imports, drives company initiatives to increase market share, and", "identifies new product lines."],
      ["He brings to Babco more than 40 years of international import and distribution", "experience. Bob has managed large sales teams consisting of over 100 personnel in", "sales, logistics and administration. Prior to launching Babco he was a Senior Divisional", "Manager for a multinational company in the Middle East."],
    ],
  },
  {
    id: "olivia-vaz", name: "Olivia Vaz", role: "Partner & CFO", side: "left", theme: "blue",
    photo: {
      src: "family-olivia.jpg", width: 1024, height: 1536,
      crop: { left: "-4.795278%", top: "-20.604%", width: "109.591899%" },
    },
    paragraphs: [
      ["Olivia manages the company's finances, budgets, policies, and credit control, bringing", "with her 25 years of international commercial banking experience in her role as Vice", "President of Corporate Credit at international and US national banks."],
      ["She is the Co-Founder of Babco Foods and has been intimately involved in every aspect", "of Babco Foods since its inception."],
      ["Her, enthusiasm, high energy, planning, and hard work have been the driving force", "behind the success of Babco Foods."],
    ],
  },
];

export const nextGeneration = {
  title: "The Next Generation",
  statement: ["Raised across cultures.", "Rooted in all of them."],
  copy: ["Babco continues to be shaped by four family leaders Bob, Olivia, Ken and Jean each bringing", "their own strengths, experience and leadership as they move the company forward together."],
};

export const familyValuesIntroduction = "The values behind Babco began with how its family works together. They continue in how we work with one another, customers, suppliers and partners.";
export const familyValues = [
  { title: ["Mutual Respect"], copy: ["There is room for all of us", "to succeed."] },
  { title: ["Clear, Constructive", "Communication"], copy: ["Open, sincere and professional."] },
  { title: ["Responsibility and", "Accountability"], copy: ["Own the work. Address mistakes.", "Learn, correct and move forward."] },
  { title: ["Fairness and Trust"], copy: ["Give credit where it is due and", "make decisions for the good", "of the whole."] },
  { title: ["Continuous Improvement"], copy: ["Think problems through, ask for help,", "test, learn and keep building."] },
  { title: ["Grow Together"], copy: ["Each person and team", "contributes to a healthy whole."] },
];

export const leadership = [
  {
    "id": "ken-vaz",
    "name": "Ken Vaz, Ph.D.",
    "role": "Executive Vice President",
    "side": "right",
    "photo": {
      "src": "family-ken.jpg", "width": 1122, "height": 1402,
      "crop": { "left": "-14.683736%", "top": "-19.372%", "width": "123.454898%" }
    },
    "paragraphs": [
      [
        "Ken leads growth and product strategy at Babco Foods across sales, product",
        "development, and technology, driving market expansion and new product success.",
        "He focuses on strengthening customer segments and building operational capabilities",
        "that support longterm scale. Ken bridges strategy and execution, translating initiatives",
        "into consistent, measurable results."
      ],
      [
        "He led the establishment of Babco Foods’ Southern Distribution Center in Dallas, TX."
      ],
      [
        "Prior to joining Babco Foods, Ken was a Staff Scientist at a U.S. federal agency.",
        "He holds a Ph.D. in Electrical Engineering from Rutgers University in New Jersey.",
        "He is qualified in modules of the U.S. FDA Food Safety Modernization Act (FSMA)."
      ]
    ]
  },
  {
    "id": "jean-vaz-gerencser",
    "name": "Jean (Vaz) Gerencser, MBA, MA",
    "role": "Executive Vice President",
    "side": "left",
    "photo": {
      "src": "family-jean.jpg", "width": 1024, "height": 1536,
      "crop": { "left": "-4.795278%", "top": "-7.240%", "width": "109.591899%" }
    },
    "paragraphs": [
      [
        "Jean leads operations and financial strategy at Babco Foods, aligning finance, analytics,",
        "and execution to improve performance and scalability. She focuses on disciplined processes,",
        "strengthening operational consistency and ensuring decisions translate into reliable",
        "execution and sustained growth. She has built and scaled the operational infrastructure",
        "that supports consistent execution and results."
      ],
      [
        "She led the establishment of Babco Foods’ West Coast Distribution Center in Hayward, CA."
      ],
      [
        "Prior to this role, Jean spent over a decade in finance at Fortune 100 and Fortune 500",
        "companies. She holds an MBA and MA from Seton Hall University and a B.S. in Accounting",
        "from Rutgers University in New Jersey."
      ]
    ]
  }
];

// Original photographs and crop positions from family_value.pdf.
const familyPortraits = {
  "robert-bob-vaz": { ...bobFamilyPortrait, crop: { left: "-11.724%", top: "-5.0655%", width: "123.455%" } },
  "olivia-vaz": { src: "family-olivia.jpg", width: 1024, height: 1536, crop: { left: "-4.795%", top: "-13.313%", width: "109.59%" } },
  "ken-vaz": { src: "family-ken.jpg", width: 1122, height: 1402, crop: { left: "-14.682%", top: "-10.575%", width: "123.455%" } },
  "jean-vaz-gerencser": { src: "family-jean.jpg", width: 1024, height: 1536, crop: { left: "-4.795%", top: "-3.2856%", width: "109.59%" } },
};

export const familyLeaders = [...founders, ...leadership].map(({ id, name, role }) => ({
  id, name, role, photo: familyPortraits[id],
}));

