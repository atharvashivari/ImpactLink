import React, { useMemo } from "react";
import { m } from "framer-motion";

/**
 * SplitText — GPU-optimized Framer Motion component.
 * Splits text and staggers reveal using only transform + opacity.
 */
const SplitText = ({
    text = "",
    className = "",
    delay = 0,
    duration = 0.4,
    stagger = 0.02,
    splitBy = "char",
    from = { opacity: 0, y: 30 },
}) => {
    const items = useMemo(
        () => (splitBy === "word" ? text.split(" ") : text.split("")),
        [text, splitBy]
    );

    const containerVariants = useMemo(() => ({
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    }), [stagger, delay]);

    const itemVariants = useMemo(() => ({
        hidden: from,
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }), [duration, from]);

    return (
        <m.span
            className={className}
            aria-label={text}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ willChange: "contents" }}
        >
            {items.map((item, i) => (
                <m.span
                    key={i}
                    variants={itemVariants}
                    style={{
                        display: "inline-block",
                        whiteSpace: item === " " ? "pre" : "normal",
                        willChange: "transform, opacity",
                        transform: "translateZ(0)",
                    }}
                >
                    {item === " " ? "\u00A0" : item}
                    {splitBy === "word" && i < items.length - 1 ? "\u00A0" : ""}
                </m.span>
            ))}
        </m.span>
    );
};

export default React.memo(SplitText);
