import { Loupe } from "@svg";
import * as React from "react";
import styles from "./Search.module.css";

function debounce(fn: (...args: any) => void, delay: number) {
  let timeOutId: any = undefined;
  return (...args: any) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  hasScrolled: number;
}

export const Search: React.FC<Props> = ({ setQuery, hasScrolled }) => {
  const [focused, setFocused] = React.useState(false);

  const handleKeyUp = debounce((e: React.BaseSyntheticEvent) => {
    setQuery(e.target.value);
  }, 350);

  return (
    <div
      className={styles.container}
      style={{
        background: hasScrolled > 200 ? "var(--shadow-color)" : "transparent",
      }}
    >
      <div
        className={styles.inputContainer}
        style={
          focused
            ? { border: "1px solid var(--bg-button)" }
            : { border: "1px solid transparent" }
        }
      >
        <div className={styles.loupeContainer}>
          <Loupe
            width="100%"
            height="20px"
            fill={focused ? "var(--bg-button)" : "rgb(73, 75, 77)"}
          />
        </div>
        <input
          onKeyUp={handleKeyUp}
          onClick={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.searchInput}
          type="text"
          placeholder="Search for a song"
        />
      </div>
    </div>
  );
};
