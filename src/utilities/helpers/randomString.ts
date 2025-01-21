const PREFIX = 'random-string';

export default function(length: number = 3, prefix?: string){
    const numbers = (Math.random() * Math.pow(10, length)).toString();
    return `${(prefix || PREFIX)}-${numbers}`;
}