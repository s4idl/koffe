import { drinks } from '../data.js'
import Price from './Price.jsx'
import Say from './Say.jsx'

export default function Menu() {
  return (
    <section id="menu" className="section menu" aria-labelledby="menu-title">
      <div className="section-head">
        <p className="label">01 · menú</p>
        <h2 id="menu-title">¿qué se te antoja?</h2>
        <p className="section-intro">
          Cada bebida tiene su nombre colimote y, al lado, el de siempre pa’ que no te pierdas.
          Leche entera, deslactosada, de avena o de almendra sin costo extra.
        </p>
      </div>

      <div className="menu-grid">
        <div>
          <table className="menu-table">
            <caption>Bebidas de café y sus precios en pesos mexicanos (MXN)</caption>
            <thead>
              <tr>
                <th scope="col">bebida</th>
                <th scope="col">
                  chico <Say show="240 ml" as="240 mililitros" />
                </th>
                <th scope="col">
                  grande <Say show="355 ml" as="355 mililitros" />
                </th>
              </tr>
            </thead>
            <tbody>
              {drinks.map((drink) => (
                <tr key={drink.id}>
                  <th scope="row">
                    <span className="drink-name">{drink.name}</span>
                    <span className="visually-hidden">, </span>
                    <span className="drink-detail">
                      <strong lang={drink.realLang}>
                        {drink.real}
                        <span className="ast" />
                      </strong>{' '}
                      · {drink.note}
                    </span>
                  </th>
                  <td>
                    <Price value={drink.small} />
                  </td>
                  <td>
                    <Price value={drink.large} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="menu-cta">
            <p>¿Ya sabes qué se te antoja? Pídelo y pásalo a recoger.</p>
            <a className="button button-orange" href="#ordena">
              ordenar café
            </a>
          </div>
        </div>

        <img
          className="menu-photo"
          src="images/tazas-rojas.jpg"
          alt="Tazas de café con detalles rojos acomodadas en filas sobre un fondo rojo."
          width="960"
          height="1200"
          loading="lazy"
        />
      </div>
    </section>
  )
}
