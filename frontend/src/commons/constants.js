export const languageList = [
  { code: "c", name: "C" },
  { code: "cpp", name: "C++" },
  { code: "csharp", name: "C#" },
  { code: "java", name: "Java" },
  { code: "javascript", name: "JavaScript" },
  { code: "python", name: "Python" },
  { code: "typescript", name: "TypeScript" },
];

export const getLanguageNameFromCode = (code) => {
  const language = languageList.find((lang) => lang.code === code);
  return language ? language.name : code;
};

export const colorSets = [
  { bg: 'bg-blue-100', text: 'text-blue-800', ring: 'ring-blue-600/10' },
  { bg: 'bg-purple-100', text: 'text-purple-800', ring: 'ring-purple-600/10' },
  { bg: 'bg-gray-100', text: 'text-gray-800', ring: 'ring-gray-600/10' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800', ring: 'ring-indigo-600/10' },
  { bg: 'bg-pink-100', text: 'text-pink-800', ring: 'ring-pink-600/10' },
];

export const difficultyColor = {
  easy: '#1A8754',
  medium: '#FFC008',
  hard: '#FF403F',
}

export const editorOptions = {
  fontSize: 12,
  fontFamily: "JetBrains Mono, monospace",
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  theme: "vs-dark",
  lineHeight: 18,
  padding: { top: 16 },
  readOnly: true
};
