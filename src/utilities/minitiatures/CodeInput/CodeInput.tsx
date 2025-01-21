import React from "react";
import generateArray from "../../helpers/generateArray";

type Props = {
    length?: number | 6,
    onComplete: (value: string) => void,
    error?: string,
    className?: string
}

const previous = (key: number) => {
    if (key > 0) {
        const previousElement = idPrefix + (key - 1);
        document.getElementById(previousElement)?.focus();
    }
}

const next = (key: number) => {
    if (key < 5) {
        const nextElement = idPrefix + (key + 1);
        document.getElementById(nextElement)?.focus();
    }
}

const handlePrevNext = (key: number, value: string) => {
    if (value.length > 0) {
        next(key);
    } else if (value.length === 0) {
        previous(key);
    }
}

const CodeInputItem = React.memo((props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { identifier: number }) => {
    const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const { key } = e;
        key === "Backspace" && !props.value && previous(props.identifier);
        key === "ArrowLeft" && previous(props.identifier);
        key === "ArrowRight" && next(props.identifier);

    }, [props.identifier, props.value]);

    return <input
        {...props}
        onKeyUp={handleKeyUp} />
});

const idPrefix = 'code-input-';


const CodeInput = (props: Props) => {
    const { length, className = '', onComplete, error } = props;

    const defaultValues = React.useMemo(() => generateArray(length), [length]);

    const [state, setState] = React.useState({
        values: defaultValues
    });

    const handleChange = React.useCallback((e: any, key: number) => {
        const { value } = e.target;

        if (value.length <= 1 && !isNaN(value)) {
            setState(s => {
                const newValues = [...s.values];
                newValues[key] = value;
                return { ...s, values: newValues }
            });

            handlePrevNext(key, value);
        }
    }, []);

    React.useEffect(() => {
        const code = state.values.join('');
        if (code.length === length) {
            onComplete(code);
        }
    }, [state.values, length, onComplete]);

    return <>
        <div
            className={`code-input-container ${className} ${error && 'is-invalid'}`}>
            {state.values.map((value, key) => <CodeInputItem
                key={key}
                type='text'
                className="code-inputs col-1"
                value={value}
                onChange={(e) => handleChange(e, key)}
                id={idPrefix + key}
                identifier={key} />
            )}
        </div>
        {error && <p className="text-danger">{error}</p>}
    </>
}

export default CodeInput;