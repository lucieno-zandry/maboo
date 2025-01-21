import React from "react";

type Size = "sm" | "md" | "lg";

type Props = {
    color: string,
    size?: Size,
    className?: string,
}

const ColorBubble = React.memo((props: Props) => {
    const { color, size = "md", className = "" } = props;

    return <div
        style={{ backgroundColor: color }}
        className={`color-bubble ${size} ${className}`}></div>
})

export default ColorBubble;