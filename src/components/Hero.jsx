const values = [
  { title: 'tostado en colima', text: 'Lotes pequeños cada semana, a dos cuadras de la barra.' },
  { title: 'comercio directo', text: 'Compramos a productores de Colima, Chiapas y Oaxaca.' },
  { title: 'hecho sin prisa', text: 'Una barra larga, buena música y tazas que se rellenan.' },
]

export default function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="label">colima, méxico · café de especialidad</p>
          <h1 id="hero-title">
            café pa’ quedarse
            <span className="ast" />
          </h1>
          <p className="hero-lead">
            Tostamos aquí, servimos aquí y nos gusta que te quedes. Ordena antes y recoge sin fila,
            o siéntate con nosotros.
          </p>
          <div className="actions">
            <a className="button button-solid" href="#ordena">
              ordenar para recoger
            </a>
            <a className="button" href="#menu">
              ver menú
            </a>
          </div>
        </div>
        <img
          className="hero-photo"
          src="images/hero-naranja.jpg"
          alt=""
          width="1300"
          height="1040"
          fetchPriority="high"
        />
      </section>

      <ul className="values" role="list" aria-label="Lo que nos define">
        {values.map((value) => (
          <li key={value.title}>
            <p className="value-title">{value.title}</p>
            <p>{value.text}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
