"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import styles from "./message.module.css";

export default function ClientMessage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });

    const cards = gsap.utils.toArray(`.${styles.card}`);

    gsap.set(`.${styles.img}`, {
      clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)",
      autoAlpha: 0,
    });

    gsap.set(`${"." + styles.cardContent} h1, ${"." + styles.cardContent} p`, {
      y: 0,
      autoAlpha: 0,
    });

    cards.forEach((card: any, i: number) => {
      const textEls = card.querySelectorAll(
        `${"." + styles.cardContent} h1, ${"." + styles.cardContent} p`,
      );

      const scaleValue = 0.8 + 0.2 * (i / Math.max(1, cards.length - 1));

      gsap.to(card, {
        scale: scaleValue,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top" + (15 + 35 * i),
          end: "bottom bottom",
          endTrigger: `.${styles.container}`,
          scrub: true,
          pin: card as any,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.create({
        trigger: card,
        start: "bottom bottom",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to(card.querySelector(`.${styles.img}`) as Element, {
            clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
            autoAlpha: 1,
            duration: 2,
            delay: 0.2,
            ease: "power2.out",
          });
        },
      });

      // reveal image and text when card enters
      gsap.to(card.querySelector(`.${styles.img}`) as Element, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        autoAlpha: 1,
        scrollTrigger: {
          trigger: card,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      gsap.to(textEls, {
        y: -10,
        autoAlpha: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: card,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      smoother && smoother.kill();
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div className={styles.spacer}>
      <div className={styles.container}>
        <div className={styles.stackedCards}>
          {/* card */}
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Message</h2>
              <p className={styles.cardBody}>This is the message page.</p>
            </div>
            <div className={styles.imgWrapper}>
              <Image
                src="/album/image1.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </div>
          </div>

          {/* card */}
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Message111</h2>
              <p className={styles.cardBody}>This is the message page.</p>
            </div>
            <div className={styles.imgWrapper}>
              <Image
                src="/album/image1.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </div>
          </div>

          {/* card */}
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Message2</h2>
              <p className={styles.cardBody}>This is the message page.2</p>
            </div>
            <div className={`${styles.imgWrapper} ${styles.imgWrapper2}`}>
              <Image
                src="/album/image1.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </div>
          </div>

          {/* card */}
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Message3</h2>
              <p className={styles.cardBody}>This is the message page.3</p>
            </div>
            <div className={styles.imgWrapper}>
              <Image
                src="/album/image1.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
