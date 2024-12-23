import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly AES_KEY = Buffer.from(
    process.env.AES_KEY || 'clave_secreta_32_caracteres_12345678',
    'utf8',
  ); // Clave de 32 bytes
  private readonly AES_IV = Buffer.from(
    process.env.AES_IV || 'vector_inicial_1234',
    'utf8',
  ); // IV de 16 bytes

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.AES_KEY, this.AES_IV);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(data: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.AES_KEY, this.AES_IV);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}