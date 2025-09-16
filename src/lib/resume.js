import { readdirSync } from "fs";
import { join } from "path";

const dataDir = join(process.cwd(), "src/data");
const availableResumes = readdirSync(dataDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(".json", ""));

export const getAvailableResumes = () => [...availableResumes];

const validateResume = (resumeName) =>
  resumeName && availableResumes.includes(resumeName)
    ? resumeName
    : availableResumes[0];

const loadResumeData = async (resumeName) => {
  try {
    const mod = await import(`../data/${resumeName}.json`);
    return mod.default || mod;
  } catch {
    const fallback = await import(`../data/${availableResumes[0]}.json`);
    return fallback.default || fallback;
  }
};

export const getResumeData = async (resumeName) => {
  const validResume = validateResume(resumeName);
  return loadResumeData(validResume);
};

export const getResumeInfo = (resumeName) => {
  const validResume = validateResume(resumeName);

  return {
    name: validResume,
    displayName: validResume.charAt(0).toUpperCase() + validResume.slice(1),
    isDefault: validResume === availableResumes[0],
  };
};

export const getDefaultResume = () => availableResumes[0] || "resume";
