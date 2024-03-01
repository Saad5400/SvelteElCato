export default function toClass<T = any>(obj: T, className: any): T {
    return new className(obj);
}