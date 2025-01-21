import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import Fade from "../Fade/Fade";

type Props = {
    label: React.JSX.Element,
    id: string,
    placeholder: string,
    options?: {
        error?: string | string[],
        className?: string,
    }
} & HTMLMotionProps<'input'>;

const FormFloating = React.memo((props: Props) => {
    const { className = '', options, label, ...inputProps} = props;

    return <div className={`form-floating ${options?.className || ''}`}>
        <motion.input
            {...inputProps}
            className={`form-control ${(options?.error && 'is-invalid ')} ${className}`}
            layout/>
        <label htmlFor={props.id}>
            {props.label}
        </label>
        <Fade className="invalid-feedback" show={Boolean(options?.error)}>
            {options?.error}
        </Fade>
    </div>
});

export default FormFloating;