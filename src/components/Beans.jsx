import { beans } from '../data.js'
import Price from './Price.jsx'
import Say from './Say.jsx'

export default function Beans() {
  return (
    <section id="beans" className="section" aria-labelledby="beans-title">
      <div className="section-head">
        <p className="label">
          02 · <span lang="en">beans</span>
        </p>
        <h2 id="beans-title">pa’ llevar a casa</h2>
        <p className="section-intro">
          Bolsas de 250 g tostadas esta semana. Te lo molemos para tu método o te lo llevas en
          grano.
        </p>
      </div>

      <div className="beans-layout">
        <img
          className="beans-photo"
          src="images/granos.jpg"
          alt="Granos de café tostado, de cerca."
          width="900"
          height="1350"
          loading="lazy"
        />
        <ul className="beans-grid" role="list" aria-label="Bolsas de café disponibles">
          {beans.map((bean) => (
            <li key={bean.id} className={`bean bean-${bean.id}`}>
              <h3>
                {bean.name}
                <span className="ast" />
              </h3>
              <dl>
                <div>
                  <dt>origen</dt>
                  <dd>{bean.origin}</dd>
                </div>
                <div>
                  <dt>notas</dt>
                  <dd>{bean.notes}</dd>
                </div>
                <div>
                  <dt>proceso</dt>
                  <dd>{bean.process}</dd>
                </div>
              </dl>
              <p className="bean-price">
                <Price value={bean.price} /> · <Say show="250 g" as="bolsa de 250 gramos" />
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="beans-cta">
        <p>Apártala y pásala a recoger con tu café.</p>
        <a className="button button-solid" href="#ordena">
          ordenar beans
        </a>
      </div>
    </section>
  )
}
