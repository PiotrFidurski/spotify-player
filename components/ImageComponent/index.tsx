import Image from "next/image";
import * as React from "react";
import styles from "./ImageComponent.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

export function ImageComponent({ style, src, alt }: Props) {
  return (
    <div className={styles.container} style={{ ...style }}>
      <Image src={src} layout="fill" objectFit="fill" alt={alt} />
    </div>
  );
}
