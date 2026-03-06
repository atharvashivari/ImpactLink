import React from "react";
import { m } from "framer-motion";
import { pageVariants, gpuStyles } from "../utils/animations";

const PageTransition = ({ children, className = "" }) => {
    return (
        <m.div
            className={className}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={gpuStyles}
        >
            {children}
        </m.div>
    );
};

export default PageTransition;
