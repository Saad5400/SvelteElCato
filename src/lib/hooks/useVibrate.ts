export default function useVibrate(pattern: number | number[]) {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}