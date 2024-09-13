import React from "react";
import Button from "../Button/Button";

type Props = {
    children: string,
    maxLength?: number,
    isExtendable?: boolean
}

const REPLACESTRING = '...';

const SmallText = React.memo((props: Props) => {
    const { children, maxLength = 5, isExtendable = false } = props;

    const defaultHidden = React.useMemo(() => {
        return children.length > maxLength;
    }, [children, maxLength]);

    const overflow = React.useMemo(() => children.substring(maxLength), [children, maxLength]);
    const replace = React.useMemo(() => children.replace(overflow, REPLACESTRING), [overflow])
    const toggleable = React.useMemo(() => isExtendable && children.length > maxLength, [isExtendable, children, maxLength]);

    const [state, setState] = React.useState({
        hidden: undefined as undefined | boolean,
    });

    const toggleHidden = React.useCallback(() => {
        setState(s => {
            let newHidden;

            if (s.hidden === undefined) {
                newHidden = true;
            } else {
                newHidden = !s.hidden;
            }

            return { ...s, hidden: newHidden };
        })
    }, []);

    const hidden = React.useMemo(() => state.hidden === undefined ? defaultHidden : state.hidden, [state.hidden, defaultHidden]);

    return <>
        {hidden ? replace : children}

        {toggleable && <Button
            type="button"
            className={"smalltext-button"}
            onClick={toggleHidden}>voir {hidden ? 'plus' : 'moins'}</Button>}
    </>
});

export default SmallText;