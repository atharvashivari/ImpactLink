/**
 * Centralized Animation Variants — GPU-Safe Only
 * 
 * Rules:
 * ✅ ALLOWED: opacity, x, y, scale, scaleX, scaleY, rotate
 * ❌ BANNED:  width, height, margin, padding, top, left, boxShadow, borderRadius
 * 
 * All transitions use expo-out easing for a premium feel.
 */

// ─── Easing ───
const ease = {
    out: [0.22, 1, 0.36, 1],
    inOut: [0.65, 0, 0.35, 1],
    spring: { type: "spring", stiffness: 300, damping: 30 },
};

// ─── Fade + Translate ───
export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: ease.out },
    },
};

export const fadeDown = {
    hidden: { opacity: 0, y: -24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: ease.out },
    },
};

export const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, ease: ease.out },
    },
};

export const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, ease: ease.out },
    },
};

// ─── Scale ───
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.35, ease: ease.out },
    },
    exit: {
        opacity: 0,
        scale: 0.92,
        transition: { duration: 0.2 },
    },
};

// ─── Stagger Containers ───
export const staggerContainer = (stagger = 0.08, delay = 0) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: stagger,
            delayChildren: delay,
        },
    },
});

export const heroStagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

// ─── Interactive: hover / tap (GPU-only) ───
export const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.25, ease: ease.out },
};

export const buttonTap = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
};

// ─── Dropdown / Popover ───
export const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.92, y: -4 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.2, ease: ease.out },
    },
    exit: {
        opacity: 0,
        scale: 0.92,
        y: -4,
        transition: { duration: 0.15 },
    },
};

// ─── Page Transition ───
export const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: ease.out },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.15 },
    },
};

// ─── Step / Tab Transitions (directional) ───
export const stepVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.35, ease: ease.out },
    },
    exit: (direction) => ({
        x: direction < 0 ? 60 : -60,
        opacity: 0,
        transition: { duration: 0.2 },
    }),
};

// ─── Slide Expand (for accordion/modal reveal) ───
export const slideDown = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3, ease: ease.out },
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.98,
        transition: { duration: 0.2 },
    },
};

// ─── willChange helper style ───
export const gpuStyles = {
    willChange: "transform, opacity",
};
