import { schedule } from '../data.js'

export default function Visit() {
  return (
    <section id="visitanos" className="section visit" aria-labelledby="visitanos-title">
      <div className="section-head">
        <p className="label">05 · visítanos</p>
        <h2 id="visitanos-title">¿cuándo nos caes?</h2>
      </div>

      <div className="visit-layout">
        <img
          className="visit-photo"
          src="images/barra.jpg"
          alt="Un barista sirve leche espumada con calma detrás de una barra de piedra; la luz tenue y los pizarrones escritos a mano hacen que el lugar se sienta tranquilo y acogedor."
          width="1000"
          height="1500"
          loading="lazy"
        />
        <div className="visit-grid">
          <div className="visit-block">
            <h3>horario</h3>
            <dl className="schedule">
              {schedule.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="visit-block">
            <h3>dirección</h3>
            <address>
              Calle Francisco I. Madero 120
              <br />
              Centro, 28000 Colima, Col.
            </address>
            <p>
              <a href="https://www.google.com/maps/search/?api=1&query=Centro+Colima+Colima">
                Cómo llegar a Koffe en Google Maps
              </a>
            </p>
          </div>

          <div className="visit-block">
            <h3>contacto</h3>
            <p>
              Teléfono: <a href="tel:+523121234567">312 123 4567</a>
            </p>
            <p>
              Correo: <a href="mailto:hola@koffe.mx">hola@koffe.mx</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
