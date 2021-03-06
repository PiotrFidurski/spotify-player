import * as React from "react";

let theme: string | undefined = undefined;

export function useTheme() {
  const [currentTheme, setCurrentTheme] = React.useState(
    () => theme ?? "light"
  );

  const isDarkMode = currentTheme === "dark";

  const oppositeTheme = currentTheme === "light" ? "dark" : "light";

  const toggleTheme = () => {
    setCurrentTheme(oppositeTheme);
  };

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme")!;

    if (storedTheme) {
      theme = JSON.parse(storedTheme!);
      setCurrentTheme(theme!);
    }
  }, []);

  React.useEffect(() => {
    document.body.dataset.theme = currentTheme;
    localStorage.setItem("theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  return { toggleTheme, isDarkMode };
}
