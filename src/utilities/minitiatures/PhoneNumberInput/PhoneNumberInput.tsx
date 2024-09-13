import React from "react";
import NumberInput from "../NumberInput/NumberInput";
import toFormatedString from "../../helpers/toFormatedString";

type Props = {
    className?: string,
    onChange: (phoneNumber: string) => void,
    defaultValue?: number,
    defaultCountry?: number,
    options?: {
        error?: string
    }
}

const MAX = 999999999;

const COUNTRIES = [
    261,
    33,
    86
]

const PhoneNumberInput = React.memo((props: Props) => {
    const initialCountry = React.useMemo(() => props.defaultCountry || COUNTRIES[0], [props.defaultCountry]);
    const initialPhoneNumber = React.useMemo(() => props.defaultValue || '' as string | number, [props.defaultValue]);

    const [state, setState] = React.useState({
        country: initialCountry,
        phoneNumber: initialPhoneNumber,
    });

    const { className = '', options } = props;

    const handleCountryChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(s => ({ ...s, country: parseInt(e.target.value) }))
    }, []);

    const handlePhoneNumberChange = React.useCallback((phoneNumber: number | '') => {
        if (typeof phoneNumber === "string" || (phoneNumber < MAX)) {
            setState((s) => ({ ...s, phoneNumber }));
        }
    }, []);

    React.useEffect(() => {
        const initialState = `${initialCountry} ${initialPhoneNumber}`;
        const newState = `${state.country} ${state.phoneNumber}`;

        if (newState !== initialState) {
            props.onChange(`${state.country} ${state.phoneNumber}`);
        }
    }, [props.onChange, state, initialCountry, initialPhoneNumber]);

    return <div className={`input-group   ${className}`}>
        <select
            className="form-select"
            value={state.country}
            onChange={handleCountryChange}>
            {COUNTRIES.map((prefix, key) => {
                return <option key={key} value={prefix}>+{prefix}</option>
            })}
        </select>
        <NumberInput
            className="form-control col"
            placeholder="Numéro de téléphone"
            onChange={handlePhoneNumberChange}
            value={toFormatedString(state.phoneNumber)}
            options={options}
        />
    </div>
});

export default PhoneNumberInput