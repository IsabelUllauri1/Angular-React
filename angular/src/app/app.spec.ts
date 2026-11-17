import { expect, test } from 'vitest';
import { filtrarUsuarios } from './utilidades/filtrarUsuarios';
import { Usuario } from './usuario';

test('busca por nombre ignorando mayúsculas y espacios exteriores', () => {
  const usuarios: Usuario[] = [
    {
      id: 1,
      name: 'Ana Torres',
      email: 'ana@ejemplo.com',
      address: {
        city: 'Cuenca'
      }
    },
    {
      id: 2,
      name: 'Luis Pérez',
      email: 'luis@ejemplo.com',
      address: {
        city: 'Quito'
      }
    }
  ];

  const resultado = filtrarUsuarios(usuarios, ' ANA ');

  expect(resultado).toEqual([usuarios[0]]);
});