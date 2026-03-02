import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * SplitText — React Bits inspired component
 * Animates each character/word into view with a staggered reveal.
 */
const SplitText = ({
    text = "",
    className = "",
    delay = 0,
    duration = 0.6,
    stagger = 0.03,
    ease = "power3.out",
    splitBy = "char", // "char" or "word"
    from = { opacity: 0, y: 40 },
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll(".split-item");

        gsap.fromTo(
            elements,
            from,
            {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                delay,
                ease,
            }
        );
    }, [text, delay, duration, stagger, ease]);

    const items = splitBy === "word" ? text.split(" ") : text.split("");

    return (
        <span ref={containerRef} className={className} aria-label={text}>
            {items.map((item, i) => (
                <span
                    key={i}
                    className="split-item"
                    style={{
                        display: "inline-block",
                        opacity: 0,
                        whiteSpace: item === " " ? "pre" : "normal",
                    }}
                >
                    {item === " " ? "\u00A0" : item}
                    {splitBy === "word" && i < items.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </span>
    );
};

export default SplitText;
