import React from 'react';
import { motion } from 'framer-motion';

function RouteAnimation({ children }) {

    const { initial, animate, exit, transition } = {
        initial: { x: "-100vw" },
        animate: { x: 0 },
        exit: { x: "100vw" },
        transition: { duration: 1 }
    };

    return(
        <motion.div initial={initial} animate={animate} exit={exit} transition={transition}>
            {children}
        </motion.div>
    );
};

export default RouteAnimation;