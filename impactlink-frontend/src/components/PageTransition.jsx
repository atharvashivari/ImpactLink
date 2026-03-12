import React from "react";
import { m } from "framer-motion";
import { pageVariants, gpuStyles } from "../utils/animations";
import SEO from "./SEO";

const PageTransition = ({ children, className = "", title, description }) => {
    return (
        <m.div
            className={className}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={gpuStyles}
        >
            <SEO title={title} description={description} />
            {children}
        </m.div>
    );
};

export default PageTransition;
