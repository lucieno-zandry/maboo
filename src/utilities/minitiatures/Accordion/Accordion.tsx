type Props = {
    children: any,
    id?: string
};

type AccordionButtonProps = {
    children: any,
    className?: string
};

const accordionButtonIdPrefix = 'accordion-button-';


export const AccordionButton = (props: AccordionButtonProps) => {
    const id = accordionButtonIdPrefix + (Math.round(Math.random() * 1000));

    return <>
        <input
            type="checkbox"
            className="accordion-state-checkbox"
            id={id}
            hidden={true} />
        <label htmlFor={id}>
            <div
                className={'accordion-button ' + (props.className || '')}>
                {props.children} <i className="fa fa-chevron-down accordion-icon"></i>
            </div>
        </label>
    </>
}


export const AccordionBody = (props: Props) => {
    return <div className="accordion-body">
        {props.children}
    </div>
}

const Accordion = (props: Props) => {
    return <div className="accordion-container">
        {props.children}
    </div>
};

export default Accordion;