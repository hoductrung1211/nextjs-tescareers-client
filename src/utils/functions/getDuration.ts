const aDayInMs = 24 * 60 * 60 * 1000;

export function durationFromNow(date: string) {
    const firstDate = new Date(date).getTime();
    const now = new Date().getTime();

    return Math.floor(Math.abs(now - firstDate) / aDayInMs);
}