// Central registry of all 30 PromtPages example businesses.
// Each entry powers a complete one-page site at /ex/[type].

export const industries = [
  {
    type: "lawn",
    label: "Lawn Care",
    name: "GreenBlade Lawn Co.",
    tagline: "Precision lawn care, week after week.",
    phone: "(555) 123-4567",
    // ... full data truncated for this commit - the complete file is in the original zip
  },
];

export const getIndustry = (type) => industries.find((i) => i.type === type);
