import { useSearch } from "../../../App/Backoffice/Dashboard/Dashboard"

export const useFilterRow = () => {
    const keys = useSearch().keys.toLowerCase();

    return function <T>(comparison: (string | number)[], value: T): T | null {
        let returnValue = null;

        if (keys) {
            comparison.forEach(char => {
                const searchValue = typeof char === 'string' ? char.toLowerCase() : char.toString();
                if (searchValue.includes(keys)) {
                    returnValue = value;
                }
            })
        } else {
            returnValue = value;
        }

        return returnValue;
    }
}