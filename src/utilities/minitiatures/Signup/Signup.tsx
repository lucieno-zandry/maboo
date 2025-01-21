import React from "react";
import { Carousel } from "react-bootstrap";
import FirstStep from "./FirstStep/FirstStep";
import SecondStep from "./SecondStep/SecondStep";

type ValidationMessages = { email?: string };

const Signup = React.memo(() => {
    const [state, setState] = React.useState({
        activeStep: 0,
        email: '',
        validationMessages: null as ValidationMessages | null
    });

    const nextStep = React.useCallback(() => {
        setState(s => ({ ...s, activeStep: ++s.activeStep }));
    }, []);

    const prevStep = React.useCallback(() => {
        setState(s => ({ ...s, activeStep: --s.activeStep }));
    }, []);

    const setEmail = React.useCallback((email: string) => {
        setState(s => ({ ...s, email }));
    }, []);

    const setValidationMessages = React.useCallback((validationMessages: ValidationMessages) => {
        setState(s => ({ ...s, validationMessages }));
    }, []);

    return <Carousel
        indicators={false}
        controls={false}
        className="col-10"
        activeIndex={state.activeStep}>
        <Carousel.Item className="p-2">
            <FirstStep
                nextStep={nextStep}
                setEmail={setEmail}
                mailError={state.validationMessages?.email} />
        </Carousel.Item>
        <Carousel.Item className="p-2">
            <SecondStep
                email={state.email}
                prevStep={prevStep}
                activeStep={state.activeStep}
                setValidationMessages={setValidationMessages} />
        </Carousel.Item>
    </Carousel>
});

export default Signup;