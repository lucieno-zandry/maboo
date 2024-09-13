import React from "react";
import NumberInput from "../NumberInput/NumberInput";

type Props = {
    count: number,
    onChange: Function,
    max?: number,
    min?: number,
    className?: string,
}

const CountButton = React.memo((props: Props) => {
    const { count, onChange, max = 999999, min = 0, className = '' } = props;

    const increment = React.useCallback(() => {
        const newCount = count + 1;
        if (newCount <= max) {
            onChange(newCount);
        }
    }, [max, count]);

    const decrement = React.useCallback(() => {
        const newCount = count - 1;
        if (newCount > min) {
            onChange(newCount);
        }
    }, [min, count]);

    const handleChange = React.useCallback((value: number | '') => {
        const count = typeof value === "string" ? 1 : value;
        if (count > min && count <= max) {
            onChange(count);
        }
    }, [min, max]);

    return <div className={`btn-group count-button ${className}`}>
        <button type="button" className="btn col-3" onClick={decrement}>-</button>
        <NumberInput className="btn" value={count} onChange={handleChange} />
        <button type="button" className="btn col-3" onClick={increment}>+</button>
    </div>
})

export default CountButton;