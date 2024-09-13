import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export type FadeProps = {
    children: any,
    show: boolean,
    className?: string,
    id?: string,
    layout?: boolean,
    onBlur?: () => void,
    onClick?: () => void,
};

const variants = {
    visible: {
        opacity: 1,
        transition: { delay: .3, duration: .4 }
    },
    hidden: {
        opacity: 0
    }
}

const Fade = React.forwardRef((props: FadeProps, ref?: React.LegacyRef<HTMLDivElement>) => {
    const { children, show, ...divProps } = props;

    return <AnimatePresence>
        {show &&
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                {...divProps}
                ref={ref}>
                {children}
            </motion.div>}
    </AnimatePresence>
});

export default Fade;