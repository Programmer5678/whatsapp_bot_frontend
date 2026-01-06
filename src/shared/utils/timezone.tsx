export function getTimeZoneSuffix(): string {
    const offset: number = -(new Date().getTimezoneOffset());
    const sign: string = offset > 0 ? '+' : '-';
    const offsetHours: string = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
    const offsetMinutes: string = (Math.abs(offset) % 60).toString().padStart(2, '0');

    return `${sign}${offsetHours}:${offsetMinutes}`;
}

export function warnTimeZone() {
    const timeZoneSuffix = getTimeZoneSuffix();

    if (timeZoneSuffix !== '+02:00' && timeZoneSuffix !== '+03:00') {
        alert(`Warning. Timezone ${timeZoneSuffix} is not Israel - impacts inputs!`);
    }
}