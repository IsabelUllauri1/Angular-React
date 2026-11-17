import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TarjetaUsuario } from './componentes/tarjeta-usuario';
import { Usuario } from './usuario';

@Component({
  selector: 'app-root',
  imports: [TarjetaUsuario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private referenciaDestruccion = inject(DestroyRef);

  usuarios = signal<Usuario[]>([]);
  favoritos = signal<number[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando.set(true);
    this.error.set('');

    this.http
      .get<Usuario[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(takeUntilDestroyed(this.referenciaDestruccion))
      .subscribe({
        next: (datos) => {
          this.usuarios.set(datos);
          this.cargando.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los usuarios.');
          this.cargando.set(false);
        }
      });
  }

  cambiarFavorito(idUsuario: number) {
    this.favoritos.update((favoritosActuales) => {
      if (favoritosActuales.includes(idUsuario)) {
        return favoritosActuales.filter((id) => id !== idUsuario);
      }

      return [...favoritosActuales, idUsuario];
    });
  }
}