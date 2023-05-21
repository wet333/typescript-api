export function isString(value: any): boolean {
    return typeof value === 'string';
}

export function isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

export function isStringLengthBetween(str: string, min: number, max: number): boolean {
    if (isString(str)) {
        const length = str.length;
        return length >= min && length <= max;
    }
    return false;
}

export function isValidPassword(password: string) {
    // Validates
    // (?=.*[a-zA-Z0-9]): At least one alphanumeric character.
    // (?=.*[\W_]): At least one special character (non-alphanumeric character).
    // (?=.*[0-9]): At least one digit.
    // .{10,}: At least 10 characters in total.
    if (isString(password)) {
        const regex = /^(?=.*[a-zA-Z0-9])(?=.*[\W_])(?=.*[0-9]).{10,}$/;
        return regex.test(password);
    }
    return false;
}

export function isValidEmail(email: string) {
    if (isString(email)) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    return false;
}

export function isEmpty(value: any): boolean {
    return value === null || value === undefined || value === "";
}