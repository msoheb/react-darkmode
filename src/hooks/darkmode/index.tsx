import { useEffect, useState } from "react";

export default function useDarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if dark mode is enabled in local storage or by default
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const toggleDarkMode = () => {
      setIsDarkMode(
        localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    };

    toggleDarkMode();

    const handleStorageChange = () => {
      toggleDarkMode();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return isDarkMode;
}
