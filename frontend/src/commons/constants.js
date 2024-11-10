export const languages = [
  { code: "c", name: "C" },
  { code: "cpp", name: "C++" },
  { code: "csharp", name: "C#" },
  { code: "java", name: "Java" },
  { code: "javascript", name: "JavaScript" },
  { code: "python", name: "Python" },
  { code: "typescript", name: "TypeScript" },
];

export const getLanguageNameFromCode = (code) => {
  const language = languages.find((lang) => lang.code === code);
  return language ? language.name : code;
};
