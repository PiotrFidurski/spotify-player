import { Loupe } from "@svg";
import debounce from "features/utils/debounce";
import * as React from "react";
import styles from "./Search.module.css";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<Props> = ({ setQuery }) => {
  const [focused, setFocused] = React.useState(false);

  const handleKeyUp = debounce((e: React.BaseSyntheticEvent) => {
    setQuery(e.target.value);
  }, 350);

  return (
    <div className={styles.container}>
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
