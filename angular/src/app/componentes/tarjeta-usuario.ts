import { Component, input, output } from '@angular/core';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.html'
})
export class TarjetaUsuario {
  usuario = input.required<Usuario>();
  esFavorito = input(false);

  favoritoCambiado = output<number>();
}