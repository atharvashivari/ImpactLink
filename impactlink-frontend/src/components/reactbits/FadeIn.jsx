import React from "react";
import { m } from "framer-motion";
import { gpuStyles } from "../../utils/animations";

const FadeIn = ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.45,
    className = "",
    distance = 24,
}) => {
    const directionMap = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
    };

    const offset = directionMap[direction] || { y: distance };

    return (
        <m.div
            className={className}
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={gpuStyles}
        >
            {children}
        </m.div>
    );
};

export default FadeIn;
