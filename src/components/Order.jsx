import { useRef, useState } from 'react'
import { beans, drinks } from '../data.js'
import Price from './Price.jsx'
import Say from './Say.jsx'

const sizes = [
  { id: 'small', label: 'chico', detail: '240 ml', spoken: '240 mililitros' },
  { id: 'large', label: 'grande', detail: '355 ml', spoken: '355 mililitros' },
]
const milks = ['entera', 'deslactosada', 'avena', 'almendra']
const grinds = ['en grano', 'espresso', 'filtro (V60, Chemex)', 'prensa francesa', 'moka']
const pickupTimes = [
  { value: 'en 15 minutos', label: 'en 15 min' },
  { value: 'en 30 minutos', label: 'en 30 min' },
  { value: 'en 45 minutos', label: 'en 45 min' },
  { value: 'en 1 hora', label: 'en 1 hora' },
]

const emptyOrder = {
  drink: '',
  size: 'small',
  milk: 'entera',
  bag: '',
  grind: 'en grano',
  name: '',
  pickup: '',
}

// 3.3.1 Error Identification + 3.3.3 Error Suggestion: every message says how to fix it.
// Keys are in DOM order so the first error is also the first field on the page.
function validate(order) {
  const errors = {}
  if ((!order.drink || order.drink === 'none') && !order.bag)
    errors.drink = 'Elige una bebida, unos beans o las dos cosas.'
  if (!order.name.trim()) errors.name = 'Escribe tu nombre pa’ llamarte cuando esté listo.'
  if (!order.pickup) errors.pickup = 'Elige a qué hora pasas.'
  return errors
}

function totalOf(order) {
  const drink = drinks.find((d) => d.id === order.drink)
  const bag = beans.find((b) => b.id === order.bag)
  return (drink ? drink[order.size] : 0) + (bag ? bag.price : 0)
}

function ticketItems(order) {
  const items = []
  const drink = drinks.find((d) => d.id === order.drink)
  const bag = beans.find((b) => b.id === order.bag)
  if (drink) {
    const size = sizes.find((s) => s.id === order.size)
    items.push({
      name: drink.name,
      detail: `${drink.real} ${size.label} · leche ${order.milk}`,
      price: drink[order.size],
    })
  }
  if (bag) {
    items.push({
      name: `beans ${bag.name}`,
      detail: `250 gramos · ${order.grind}`,
      price: bag.price,
    })
  }
  return items
}

// Visible number for sighted users; screen readers hear "paso 2 de 5" so they know
// where they are and how much is left.
function Step({ n }) {
  return (
    <>
      <span className="step" aria-hidden="true">
        {n}
      </span>
      <span className="visually-hidden">paso {n} de 5: </span>
    </>
  )
}

// A native radio styled as a selectable card. The input stays in the accessibility
// tree and keeps arrow-key navigation; only its default circle is hidden.
function Chip({ name, value, checked, onChange, describedBy, children }) {
  return (
    <label className="chip">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-describedby={describedBy}
      />
      {children}
    </label>
  )
}

export default function Order() {
  const [order, setOrder] = useState(emptyOrder)
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(null)
  const formRef = useRef(null)
  const doneRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target
    setOrder((prev) => ({ ...prev, [name]: value }))
    // Picking beans also satisfies the "drink or beans" rule reported on the drink group.
    const clears = name === 'bag' ? 'drink' : name
    if (errors[clears]) setErrors((prev) => ({ ...prev, [clears]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(order)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      const field = formRef.current.elements[firstInvalid]
      // Radio groups come back as a RadioNodeList; focus the first option.
      ;(field instanceof RadioNodeList ? field[0] : field).focus()
      return
    }
    setPlaced({
      firstName: order.name.trim().split(' ')[0],
      pickup: order.pickup,
      items: ticketItems(order),
      total: totalOf(order),
      // Just for show: a 5-digit pickup code to give at the bar.
      code: String(Math.floor(Math.random() * 100000)).padStart(5, '0'),
    })
    setOrder(emptyOrder)
    requestAnimationFrame(() => doneRef.current?.focus())
  }

  function errorId(name) {
    return errors[name] ? `order-${name}-error` : undefined
  }

  function errorText(name) {
    if (!errors[name]) return null
    return (
      <p className="field-error" id={`order-${name}-error`}>
        {errors[name]}
      </p>
    )
  }

  const drink = drinks.find((d) => d.id === order.drink)
  const bag = beans.find((b) => b.id === order.bag)
  const total = totalOf(order)
  const cart = ticketItems(order)

  return (
    <section id="ordena" className="section order" aria-labelledby="ordena-title">
      <div className="section-head">
        <p className="label">03 · ordena</p>
        <h2 id="ordena-title">pídelo antes y sáltate la fila</h2>
        <p className="section-intro">
          Arma tu pedido, te llamamos por tu nombre cuando esté listo y pagas en la barra, en
          efectivo o con tarjeta.
        </p>
      </div>

      <div className="order-layout">
        <img
          className="order-photo"
          src="images/barra-naranja.jpg"
          alt="Dos baristas preparan pedidos en la barra, bañados por una luz naranja cálida, junto al molino y vasos listos para llevar."
          width="736"
          height="981"
          loading="lazy"
        />

        <div className="order-box">
          {placed ? (
            <div className="order-done" role="status">
              <h3 ref={doneRef} tabIndex={-1}>
                ¡gracias, {placed.firstName}!
              </h3>
              <p className="done-lead">
                Tu pedido estará listo {placed.pickup}. Llega a la barra, enséñanos tu código y es
                tuyo.
              </p>

              <div className="pickup-code">
                <p className="label">tu código pa’ recoger</p>
                <p className="code">
                  <span aria-hidden="true">{placed.code}</span>
                  {/* Read digit by digit, not as "forty-eight thousand…" */}
                  <span className="visually-hidden">{placed.code.split('').join(' ')}</span>
                </p>
              </div>

              <ul className="ticket" role="list" aria-label="Productos de tu pedido">
                {placed.items.map((item) => (
                  <li key={item.name}>
                    <span>
                      <span className="ticket-name">{item.name}</span>
                      <span className="ticket-detail">{item.detail}</span>
                    </span>
                    <span className="ticket-price">
                      <Price value={item.price} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="ticket-total">
                total a pagar en la barra{' '}
                <span>
                  <Price value={placed.total} />
                </span>
              </p>

              <div className="club-invite">
                <p>
                  <strong>¿y si te quedas con nosotros?</strong> En el club koffe tu décimo café va
                  por la casa y te invitamos a todo lo que armamos.
                </p>
                <div className="actions">
                  <a className="button button-orange" href="#club">
                    quiero ser del club
                  </a>
                  <button type="button" className="button" onClick={() => setPlaced(null)}>
                    pedir otra cosa
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form className="order-form" ref={formRef} onSubmit={handleSubmit} noValidate>
              <p className="order-howto">
                Son 5 pasos: bebida, tamaño, leche, beans (opcional) y tu nombre con la hora en que
                pasas.
              </p>
              <div className="order-steps">
                <fieldset className="group">
                  <legend>
                    <Step n={1} />
                    ¿qué te servimos? <span className="optional">({drinks.length} bebidas)</span>
                  </legend>
                  <div className="chips chips-drinks">
                    {drinks.map((d) => (
                      <Chip
                        key={d.id}
                        name="drink"
                        value={d.id}
                        checked={order.drink === d.id}
                        onChange={handleChange}
                        describedBy={errorId('drink')}
                      >
                        <span className="chip-title">
                          {d.name}
                          <span className="visually-hidden">, </span>
                          <span className="chip-real">
                            <span aria-hidden="true"> · </span>
                            <span lang={d.realLang}>{d.real}</span>
                          </span>
                        </span>
                        <span className="visually-hidden">, </span>
                        <span className="chip-meta">
                          desde <Price value={d.small} />
                        </span>
                      </Chip>
                    ))}
                    <Chip
                      name="drink"
                      value="none"
                      checked={order.drink === 'none'}
                      onChange={handleChange}
                      describedBy={errorId('drink')}
                    >
                      <span className="chip-title">nada</span>
                      <span className="visually-hidden">, </span>
                      <span className="chip-meta">solo beans</span>
                    </Chip>
                  </div>
                  {errorText('drink')}
                </fieldset>

                {/* Size and milk are always on the page so nobody has to guess they exist;
                    they only count when a drink is picked. */}
                <div className="group-row">
                  <fieldset className="group" aria-describedby="order-drink-only">
                    <legend>
                      <Step n={2} />
                      tamaño
                    </legend>
                    <div className="chips">
                      {sizes.map((s) => (
                        <Chip
                          key={s.id}
                          name="size"
                          value={s.id}
                          checked={order.size === s.id}
                          onChange={handleChange}
                        >
                          <span className="chip-title">{s.label}</span>
                          <span className="chip-meta">
                            <Say show={s.detail} as={s.spoken} />
                            {drink && (
                              <>
                                {' '}
                                · <Price value={drink[s.id]} />
                              </>
                            )}
                          </span>
                        </Chip>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="group" aria-describedby="order-drink-only">
                    <legend>
                      <Step n={3} />
                      leche
                    </legend>
                    <div className="chips">
                      {milks.map((m) => (
                        <Chip
                          key={m}
                          name="milk"
                          value={m}
                          checked={order.milk === m}
                          onChange={handleChange}
                        >
                          <span className="chip-title">{m}</span>
                        </Chip>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <p className="group-hint" id="order-drink-only">
                  Tamaño y leche aplican a tu bebida. Si solo te llevas beans, déjalos como están.
                </p>

                <fieldset className="group">
                  <legend>
                    <Step n={4} />
                    ¿te llevas beans? <span className="optional">(opcional)</span>
                  </legend>
                  <div className="chips">
                    <Chip name="bag" value="" checked={order.bag === ''} onChange={handleChange}>
                      <span className="chip-title">no, gracias</span>
                    </Chip>
                    {beans.map((b) => (
                      <Chip
                        key={b.id}
                        name="bag"
                        value={b.id}
                        checked={order.bag === b.id}
                        onChange={handleChange}
                      >
                        <span className="chip-title">{b.name}</span>
                        <span className="chip-meta">
                          <Say show="250 g" as="250 gramos" /> · <Price value={b.price} />
                        </span>
                      </Chip>
                    ))}
                  </div>
                  {bag && (
                    <fieldset className="group group-nested">
                      <legend>¿cómo lo molemos?</legend>
                      <div className="chips">
                        {grinds.map((g) => (
                          <Chip
                            key={g}
                            name="grind"
                            value={g}
                            checked={order.grind === g}
                            onChange={handleChange}
                          >
                            <span className="chip-title">{g}</span>
                          </Chip>
                        ))}
                      </div>
                    </fieldset>
                  )}
                </fieldset>

                <fieldset className="group">
                  <legend>
                    <Step n={5} />
                    ¿a nombre de quién y cuándo pasas?
                  </legend>
                  <div className="field">
                    <label htmlFor="order-name">Tu nombre</label>
                    <input
                      id="order-name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={order.name}
                      onChange={handleChange}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errorId('name')}
                    />
                    {errorText('name')}
                  </div>
                  <fieldset className="group group-nested">
                    <legend>Paso por él</legend>
                    <div className="chips">
                      {pickupTimes.map((t) => (
                        <Chip
                          key={t.value}
                          name="pickup"
                          value={t.value}
                          checked={order.pickup === t.value}
                          onChange={handleChange}
                          describedBy={errorId('pickup')}
                        >
                          <span className="chip-title">
                            <Say show={t.label} as={t.value} />
                          </span>
                        </Chip>
                      ))}
                    </div>
                    {errorText('pickup')}
                  </fieldset>
                </fieldset>
              </div>

              <div className="order-cart">
                <h3>tu pedido</h3>
                {cart.length ? (
                  <ul className="ticket" role="list" aria-label="Productos de tu pedido">
                    {cart.map((item) => (
                      <li key={item.name}>
                        <span>
                          <span className="ticket-name">{item.name}</span>
                          <span className="ticket-detail">{item.detail}</span>
                        </span>
                        <span className="ticket-price">
                          <Price value={item.price} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="cart-empty">Todavía no eliges nada. Empieza por una bebida.</p>
                )}
                <p className="ticket-total">
                  total{' '}
                  <span>
                    <Price value={total} />
                  </span>
                </p>
                <button type="submit" className="button button-orange">
                  pedir pa’ recoger
                </button>
                <p className="cart-note">Pagas al recoger, en efectivo o con tarjeta.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
