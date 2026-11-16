import { useEffect, useState } from 'react'
import TarjetaUsuario from './components/tarjetaUsuario'

function App() {
  const [usuarios, establecerUsuarios] = useState([])
  const [favoritos, establecerFavoritos] = useState([])
  const [cargando, establecerCargando] = useState(true)
  const [error, establecerError] = useState('')
  const [busqueda, establecerBusqueda] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarUsuarios() {
      try {
        const respuesta = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controlador.signal }
        )

        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los usuarios.')
        }

        const datos = await respuesta.json()

        if (!controlador.signal.aborted) {
          establecerUsuarios(datos)
        }
      } catch (errorConsulta) {
        if (!controlador.signal.aborted) {
          establecerError('No se pudieron cargar los usuarios.')
        }
      } finally {
        if (!controlador.signal.aborted) {
          establecerCargando(false)
        }
      }
    }

    cargarUsuarios()

    return () => {
      controlador.abort()
    }
  }, [])

  function cambiarFavorito(idUsuario) {
    establecerFavoritos((favoritosActuales) => {
      if (favoritosActuales.includes(idUsuario)) {
        return favoritosActuales.filter((id) => id !== idUsuario)
      }

      return [...favoritosActuales, idUsuario]
    })
  }

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busqueda.trim().toLowerCase())
  )

  return (
    

    <div>
      <h1>Directorio de usuarios</h1>
      <p>Busca usuarios y agrega tus favoritos.</p>

      <p>Favoritos: {favoritos.length}</p>
      <div>
        <label htmlFor="busqueda">Buscar por nombre</label>

        <input
          id="busqueda"
          type="search"
          placeholder="Escribe un nombre"
          value={busqueda}
          onChange={(evento) => establecerBusqueda(evento.target.value)}
        />
      </div>

      {cargando && <p role="status">Cargando…</p>}

      {error && <p role="alert">{error}</p>}

      {!cargando && !error && (
        <div>
          {usuariosFiltrados.length === 0 && (
            <p>No se encontraron usuarios.</p>
          )}

          {usuariosFiltrados.map((usuario) => (
            <TarjetaUsuario
              key={usuario.id}
              usuario={usuario}
              esFavorito={favoritos.includes(usuario.id)}
              alCambiarFavorito={cambiarFavorito}
            />
          ))}
        </div>
      )}
    </div>
    
  )
}

export default App