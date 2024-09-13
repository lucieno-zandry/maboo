import React from "react";

type Props = {
    options?: {
        loading?: boolean,
    }
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = React.forwardRef((props: Props, ref: any) => {
    const { children, options, disabled, ...buttonProps } = props;

    return <button {...buttonProps}
        disabled={options?.loading || disabled}
        ref={ref}>
        {children} {options?.loading &&
            <span className="spinner-border spinner-border-sm"></span>}
    </button>
});

export default Button;