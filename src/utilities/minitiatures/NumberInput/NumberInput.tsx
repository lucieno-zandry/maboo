import React from "react";
import Input from "../Input/Input";

type Props = {
    placeholder?: string,
    id?: string,
    name?: string,
    value?: string,
    maxLength?: number,
    onChange: (number: '' | number, e?: React.ChangeEvent<HTMLInputElement>) => void,
    options?: {
        error?: string,
    },
    [key: string]: any,
}

const NumberInput = React.forwardRef((props: Props, ref: any) => {
    const { onChange, ...inputProps } = props;

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        let polyvalentValue: string | number = value;

        if (value !== '') {
            const striped = value.replace(/[^0-9]/g, '');
            polyvalentValue = parseInt(striped);
        }

        if (polyvalentValue === '' || (typeof polyvalentValue === "number" && !isNaN(polyvalentValue))) {
            onChange && onChange(polyvalentValue, e);
        }
    }, [onChange]);

    return <Input
        type="text"
        {...inputProps}
        onChange={handleChange}
        ref={ref}
    />
});

export default NumberInput;