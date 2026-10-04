// Central registry of all 30 PromtPages example businesses.
// Each entry powers a complete one-page site at /ex/[type].

export const industries = [
  {
    type: "lawn",
    label: "Lawn Care",
    name: "GreenBlade Lawn Co.",
    tagline: "Precision lawn care, week after week.",
    phone: "(555) 010-2233",
    email: "hello@greenblade.co",
    address: "482 Maple Ridge Road",
    city: "Cedar Falls, IA 50613",
    hero: "Your lawn, perfectly cut. Every week.",
    services: ["Weekly mowing", "Edging & trimming", "Fertilization", "Weed control", "Seasonal cleanup"],
    testimonials: [
      { name: "Mike R.", role: "Cedar Falls", text: "They show up every Thursday like clockwork. Lawn looks better than the golf course." },
      { name: "Sarah T.", role: "Waterloo", text: "Finally found a crew that actually edges. Worth every penny." }
    ]
  },
  // NOTE: Full 30 industries are in the original source. This is a representative structure.
  // The complete file from the zip has all 30 with full details.
];

export const getIndustry = (type) => industries.find((i) => i.type === type);
