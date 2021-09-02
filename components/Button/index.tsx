import * as React from "react";
import styles from "./Button.module.css";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  ({ children, ...props }) => (
    <button className={styles.default} style={{ ...props.style }} {...props}>
      {children}
    </button>
  );
