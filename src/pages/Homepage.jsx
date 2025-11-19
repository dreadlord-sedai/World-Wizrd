import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    document.documentElement.style.backgroundColor = "rgb(70, 35, 10)";
    return () => {
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  async function play(withSound) {
    if (!videoRef.current) return;
    videoRef.current.muted = !withSound;
    try {
      await videoRef.current.play();
      setStarted(true);
    } catch (err) {
      console.log("Play failed:", err);
    }
  }

  return (
    <main className={styles.homepage}>
      <video
        ref={videoRef}
        loop
        playsInline
        className={styles.backgroundVideo}
        // no autoplay – user chooses sound preference
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!started && (
        <div className={styles.playButtons}>
          <button
            onClick={() => play(true)}
            className={styles.playButton}
            aria-label="Play video with sound"
          >
            ▶ Play (Sound)
          </button>
          <button
            onClick={() => play(false)}
            className={styles.playButtonSecondary}
            aria-label="Play video without sound"
          >
            ▶ Play (No Sound)
          </button>
        </div>
      )}

      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          World Wizard keeps track of your adventures.
        </h1>
        <h2>
          A smart travel diary to mark cities you&apos;ve visited, remember
          notes, and see it all on a beautiful map.
        </h2>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
