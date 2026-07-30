// Presentational config for the public blog UI.
// Blog post DATA now lives in MongoDB (collection: blogposts) and is read via
// lib/blog.ts. There is intentionally no static POSTS array here anymore.

export const CATEGORIES = ["All", "Engineering", "AI Models", "Process", "Case Notes", "Opinion"];

export const CAT_HUE: Record<string, string> = {
  Engineering:  "93,139,244",
  "AI Models":  "124,245,196",
  Process:      "197,163,255",
  "Case Notes": "120,161,248",
  Opinion:      "255,160,90",
};

// Author name → biography, shown on the article author card.
// Keys must match the author names stored on the post exactly.
export const AUTHOR_BIOS: Record<string, string> = {
  "Monika Chandlani":
    "She is an AI content writer at Ask the Genie, where she writes about document intelligence, AI-powered knowledge management, and enterprise productivity. Her goal is to help readers understand how AI can simplify document analysis, deliver citation-backed answers, and improve decision-making.",
  "Akshay Parashar":
    "He is an AI content writer at Ask the Genie, specializing in document intelligence and enterprise AI. He simplifies complex AI topics into actionable insights that help businesses work smarter with their documents.",
  "Dhwaja Jain":
    "She is a content writer at Ask the Genie, covering AI, document intelligence, and productivity. She creates clear, practical content that helps businesses understand how AI simplifies document analysis, summarization, and knowledge retrieval.",
  "Suraj Shinde":
    "He is a content writer at Ask the Genie who writes about AI, document analysis, and business productivity. He creates easy-to-read content that helps businesses understand how AI can summarize documents, find information quickly, and make work easier.",
};
