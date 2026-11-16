import { test, expect } from 'vitest'
import { filtrarUsuarios } from './filtrarUsuarios'

test('busca por nombre ignorando mayúsculas y espacios exteriores', () => {
  const usuarios = [
    { id: 1, name: 'Ana Torres' },
    { id: 2, name: 'Luis Pérez' }
  ]

  const resultado = filtrarUsuarios(usuarios, ' ANA ')

  expect(resultado).toEqual([
    { id: 1, name: 'Ana Torres' }
  ])
})