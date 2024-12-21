export function generateSecurePassword(): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*!';
    const password = Array(6)
        .fill(null)
        .map(() =>chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');

    const hasUppercase  = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[@#$&*!]/.test(password);

    if (hasUppercase && hasLowercase && hasNumbers && hasSpecial) {
        return password;
    }

    return generateSecurePassword();
}