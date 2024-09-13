export default function (dateString: string) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
}