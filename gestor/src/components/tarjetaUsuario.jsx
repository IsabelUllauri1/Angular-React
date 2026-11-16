function TarjetaUsuario({ usuario, esFavorito, alCambiarFavorito }) {
  return (
    <div>
      <h2>{usuario.name}</h2>
      <p>Correo: {usuario.email}</p>
      <p>Ciudad: {usuario.address.city}</p>

      <button
        type="button"
        onClick={() => alCambiarFavorito(usuario.id)}
        aria-pressed={esFavorito}
      >
        {esFavorito ? 'Quitar favorito' : 'Favorito'}
      </button>
    </div>
  )
}

export default TarjetaUsuario