"use client";

import { useState } from "react";

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeSelector({
  selectedTheme,
  onThemeChange,
}: ThemeSelectorProps) {
  const [customPrompt, setCustomPrompt] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const themes = [
    { value: "superhero", label: "Superhero" },
    { value: "historical", label: "Historical Figure" },
    { value: "fantasy", label: "Fantasy Character" },
    { value: "custom", label: "Custom Prompt" },
  ];

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowCustomInput(true);
      onThemeChange("");
    } else {
      setShowCustomInput(false);
      setCustomPrompt("");
      onThemeChange(value);
    }
  };

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prompt = e.target.value;
    setCustomPrompt(prompt);
    onThemeChange(prompt);
  };

  const themePrompts: Record<string, string> = {
    superhero:
      "Transform this pet into a superhero character with a cape and heroic pose, comic book style",
    historical:
      "Transform this pet into a historical figure from the Renaissance era, oil painting style",
    fantasy:
      "Transform this pet into a fantasy character like a wizard or warrior, magical and mystical style",
  };

  return (
    <div>
      <label
        htmlFor="theme-select"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Select Theme
      </label>
      <select
        id="theme-select"
        value={selectedTheme === customPrompt ? "custom" : selectedTheme}
        onChange={handleThemeChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
      >
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.label}
          </option>
        ))}
      </select>
      {showCustomInput && (
        <div className="mt-4">
          <label
            htmlFor="custom-prompt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Custom Prompt
          </label>
          <input
            id="custom-prompt"
            type="text"
            placeholder="Enter your custom artistic style prompt..."
            value={customPrompt}
            onChange={handleCustomPromptChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
          />
        </div>
      )}
      {selectedTheme &&
        !showCustomInput &&
        themePrompts[selectedTheme] &&
        selectedTheme !== customPrompt && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {themePrompts[selectedTheme]}
          </p>
        )}
    </div>
  );
}

