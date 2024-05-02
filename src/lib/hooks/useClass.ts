export default function useClass(condition: boolean, conditional: string, base: string = ""): string {
    return condition ? `${base} ${conditional}` : base;
}