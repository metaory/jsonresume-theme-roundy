const LEVELS = [
  { keywords: ["beginner", "basic"], dots: 2, color: "var(--primary)" },
  {
    keywords: ["intermediate", "conversational"],
    dots: 3,
    color: "var(--secondary)",
  },
  { keywords: ["advanced", "fluent"], dots: 4, color: "var(--accent)" },
  { keywords: ["master", "native"], dots: 5, color: "var(--primary)" },
  { keywords: ["expert"], dots: 5, color: "var(--accent)" },
];

const findLevelMapping = (level) => {
  const normalized = level?.toLowerCase();
  return (
    LEVELS.find((levelMapping) =>
      levelMapping.keywords.some((keyword) => normalized?.includes(keyword)),
    ) || LEVELS[1]
  ); // fallback to intermediate
};

export const getLevelConfig = findLevelMapping;
