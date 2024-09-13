type JsObject = {
    [key: string]: any,
}

export default function<T>(key: string, objects: JsObject[]): T[] {
    const array = objects.map(object => object[key]);
    return array;
}