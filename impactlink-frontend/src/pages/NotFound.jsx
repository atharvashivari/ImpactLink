import React from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { fadeUp, buttonTap, gpuStyles } from "../utils/animations";
import PageTransition from "../components/PageTransition";

const NotFound = () => {
    return (
        <PageTransition className="page-container d-flex align-items-center justify-content-center min-vh-100">
            <m.div
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                }}
            >
                <m.h1
                    className="display-1 fw-bold"
                    style={{ color: "#047857", fontSize: "8rem" }}
                    variants={fadeUp}
                >
                    404
                </m.h1>
                <m.h3 className="fw-bold mb-3" variants={fadeUp}>
                    Page Not Found
                </m.h3>
                <m.p className="text-muted mb-4 mx-auto" style={{ maxWidth: "400px" }} variants={fadeUp}>
                    The page you're looking for doesn't exist or has been moved.
                </m.p>
                <m.div variants={fadeUp}>
                    <Link to="/" className="btn-primary-custom px-4 py-2 d-inline-flex align-items-center gap-2" {...buttonTap}>
                        Go Home
                    </Link>
                </m.div>
            </m.div>
        </PageTransition>
    );
};

export default NotFound;
