import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20
    },
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    out: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const PageWrapper = ({ children, className = "" }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className={`min-h-screen ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;
