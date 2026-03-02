import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * FadeIn — React Bits inspired component
 * Fades and slides children into view when they enter the viewport.
 */
const FadeIn = ({
    children,
    direction = "up", // "up", "down", "left", "right"
    delay = 0,
    duration = 0.8,
    className = "",
    distance = 40,
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const from = { opacity: 0 };
        if (direction === "up") from.y = distance;
        if (direction === "down") from.y = -distance;
        if (direction === "left") from.x = distance;
        if (direction === "right") from.x = -distance;

        gsap.set(el, from);

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    gsap.to(el, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration,
                        delay,
                        ease: "power3.out",
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [direction, delay, duration, distance]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

export default FadeIn;
