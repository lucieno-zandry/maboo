type Props = {
    [key: string]: any
}

const truthyEntriesOnly = (props: Props): Props | null => {
    const truthyEntries = { ...props } as Props;

    for (let key in props) {
        !truthyEntries[key] && delete truthyEntries[key]
    }

    return Object.keys(truthyEntries).length > 0 ? truthyEntries : null;
}

export default truthyEntriesOnly;