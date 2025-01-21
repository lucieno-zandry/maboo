type Payload = {
    [key: string]: any
}

export default function (payload: Payload): FormData {
    const form = new FormData();

    const keys = Object.keys(payload);

    keys.length > 0 && keys.forEach(key => {
        const value = payload[key];

        if (Array.isArray(value)) {
            const keyArray = `${key}[]`;

            value.forEach((val: any) => {
                form.append(keyArray, val);
            })
        }

        form.append(key, value);
    });

    return form;
}