import Image from "next/image";
import * as React from "react";
import styles from "./ImageComponent.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
}

export const ImageComponent: React.FC<Props> = ({ style, src }) => (
  <div className={styles.container} style={{ ...style }}>
    <Image src={src} layout="fill" objectFit="fill" alt="image" quality={100} />
  </div>
);
