"use client";

import React, { useState, useRef } from "react";
import styles from "./album.module.css";

type Img = { name: string; id: number; image: string };

export default function AlbumViewer({ images }: { images: Img[] }) {
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);

  const next = () => {
    if (isFlipping || index >= images.length - 1) return;
    setIsFlipping(true);
    if (pageRef.current) {
      pageRef.current.classList.add(styles.flipNext);
      pageRef.current.style.zIndex = "3";
    }
    setTimeout(() => {
      setIndex((i) => Math.min(i + 1, images.length - 1));
      if (pageRef.current) {
        pageRef.current.classList.remove(styles.flipNext);
        pageRef.current.style.zIndex = "1";
      }
      setIsFlipping(false);
    }, 700);
  };

  const prev = () => {
    if (isFlipping || index <= 0) return;
    setIsFlipping(true);
    if (leftRef.current) {
      leftRef.current.classList.add(styles.flipPrev);
      leftRef.current.style.zIndex = "3";
    }
    setTimeout(() => {
      setIndex((i) => Math.max(i - 1, 0));
      if (leftRef.current) {
        leftRef.current.classList.remove(styles.flipPrev);
        leftRef.current.style.zIndex = "1";
      }
      setIsFlipping(false);
    }, 700);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button onClick={prev} className={styles.nav} disabled={index === 0}>
          ‹
        </button>
        <button
          onClick={next}
          className={styles.nav}
          disabled={index === images.length - 1}
        >
          ›
        </button>
      </div>

      <div className={styles.book}>
        <div className={styles.leftPage} ref={leftRef}>
          <div className={styles.pageSurface}>
            <img
              src={
                images[Math.max(0, index - 1)]?.image || images[index]?.image
              }
              alt={images[Math.max(0, index - 1)]?.name || ""}
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.rightPage} ref={pageRef}>
          <div className={styles.pageSurface}>
            <img
              src={images[index]?.image}
              alt={images[index]?.name}
              className={styles.img}
            />
          </div>
        </div>
      </div>

      <div className={styles.caption}>{images[index]?.name}</div>
    </div>
  );
}
