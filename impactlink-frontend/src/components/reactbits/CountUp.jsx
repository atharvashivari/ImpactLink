import React, { useEffect, useRef, useState } from "react";

/**
 * CountUp — React Bits inspired component
 * Animates a number counting up from 0 to a target value.
 */
const CountUp = ({
    end = 0,
    duration = 2000,
    prefix = "",
    suffix = "",
    className = "",
    separator = ",",
}) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animateCount();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);

    const animateCount = () => {
        const startTime = performance.now();

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(tick);
    };

    const formatted = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return (
        <span ref={ref} className={className}>
            {prefix}{formatted}{suffix}
        </span>
    );
};

export default CountUp;
