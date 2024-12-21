import {randomUUID} from 'crypto';

export function generateResetToken(): string {
    return randomUUID();
}