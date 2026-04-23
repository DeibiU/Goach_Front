import * as fs from 'fs';
import * as path from 'path';

/**
 * Carga datos de prueba desde un archivo JSON en la carpeta /data.
 * @param filename - nombre del archivo, ej: 'login-data.json'
 * @returns Array tipado con los datos del archivo
 */
export function loadTestData<T>(filename: string): T[] {
  const filePath = path.resolve(__dirname, '../data', filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T[];
}
