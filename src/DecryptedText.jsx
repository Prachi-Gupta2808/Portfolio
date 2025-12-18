import { useEffect, useRef, useState } from "react";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:'\"|,<.>/?";

export default function DecryptedText({ text = "", speed = 15 }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  const hasAnimated = useRef(false); // prevent re-trigger

  useEffect(() => {
    if (!text) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // trigger when 30% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [text]);

  const startAnimation = () => {
    let frame = 0;
    const totalFrames = text.length * 4;

    const interval = setInterval(() => {
      let result = "";

      for (let i = 0; i < text.length; i++) {
        if (i < Math.floor(frame / 4)) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayed(result);

      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, speed);
  };

  return (
    <span
      ref={ref}
      style={{ whiteSpace: "nowrap", display: "inline-block" }}
    >
      {displayed}
    </span>
  );
}
