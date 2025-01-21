const SEPARATOR = ' ';

const phoneNumberData = (phoneNumber: string) => {
    const data = {
        country: 0,
        phoneNumber: 0
    }

    const index = phoneNumber.indexOf(SEPARATOR);

    if (index > 0) {
        data.country = parseInt(phoneNumber.substring(0, index));
        data.phoneNumber = parseInt(phoneNumber.substring(index + SEPARATOR.length) || '0');
    }

    return data;
}

export default phoneNumberData;