"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./countdown.module.css";

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredFireworks = useRef(false);

  useEffect(() => {
    const calculateCountdown = () => {
      // Target date: February 11, 2026
      const targetDate = new Date("2026-02-11T01:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
        setIsComplete(false);
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsComplete(true);
        if (!hasTriggeredFireworks.current) {
          hasTriggeredFireworks.current = true;
          createHeartFireworks();
        }
      }
      setIsLoaded(true);
    };

    // Calculate immediately on first load
    calculateCountdown();

    // Update every second
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const createHeartFireworks = () => {
    if (!containerRef.current) return;

    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("div");
      heart.className = styles.heart;
      heart.innerHTML = "❤️";

      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight / 2;
      const delay = Math.random() * 0.3;
      const duration = 2 + Math.random() * 1;

      heart.style.setProperty("--start-x", `${startX}px`);
      heart.style.setProperty("--start-y", `${startY}px`);
      heart.style.setProperty(
        "--end-x",
        `${startX + (Math.random() - 0.5) * 400}px`,
      );
      heart.style.setProperty(
        "--end-y",
        `${startY - 300 - Math.random() * 200}px`,
      );
      heart.style.setProperty("--delay", `${delay}s`);
      heart.style.setProperty("--duration", `${duration}s`);
      heart.style.setProperty("--font-size", `${20 + Math.random() * 40}px`);

      containerRef.current.appendChild(heart);

      setTimeout(
        () => {
          heart.remove();
        },
        (delay + duration) * 1000,
      );
    }
  };

  if (!isLoaded) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <Link href="/" className={styles.backButton}>
        ← กลับ
      </Link>
      {isComplete && (
        <div className={styles.completeMessage}>💕 ถึงวันครบรอบแล้ว! 💕</div>
      )}
      <h2 className={styles.title}>นับถอยหลังถึงวันครบรอบ</h2>
      <div
        className={`${styles.timerWrapper} ${isComplete ? styles.completed : ""}`}
      >
        <div className={styles.timeUnit}>
          <div className={styles.number}>{countdown.days}</div>
          <div className={styles.label}>วัน</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>
            {String(countdown.hours).padStart(2, "0")}
          </div>
          <div className={styles.label}>ชม.</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>
            {String(countdown.minutes).padStart(2, "0")}
          </div>
          <div className={styles.label}>นาที</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>
            {String(countdown.seconds).padStart(2, "0")}
          </div>
          <div className={styles.label}>วินาที</div>
        </div>
      </div>
    </div>
  );
}
