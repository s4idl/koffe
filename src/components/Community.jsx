import { useRef, useState } from 'react'

const events = [
  {
    when: 'sábados · 10:00',
    what: 'catación abierta',
    text: 'Probamos tres cafés a ciegas y platicamos de dónde vienen.',
  },
  {
    when: 'último jueves · 19:00',
    what: 'latte art jam',
    text: 'Baristas y curiosos, una jarra y mucha leche. No necesitas saber nada.',
  },
  {
    when: 'domingos · 11:00',
    what: 'club de lectura y filtrados',
    text: 'Un libro al mes y un V60 pa’ acompañarlo.',
  },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 3.3.1 / 3.3.3: messages say what is wrong and how to fix it.
function validate(values) {
  const errors = {}
  if (!values.nickname.trim()) errors.nickname = 'Escribe cómo quieres que te digamos.'
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  }
  return errors
}

export default function Community() {
  const [values, setValues] = useState({ nickname: '', email: '' })
  const [errors, setErrors] = useState({})
  const [joined, setJoined] = useState(null)
  const doneRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus()
      return
    }
    setJoined(values.nickname.trim())
    requestAnimationFrame(() => doneRef.current?.focus())
  }

  function fieldProps(name) {
    return {
      id: `club-${name}`,
      name,
      value: values[name],
      onChange: handleChange,
      required: true,
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': errors[name] ? `club-${name}-error` : undefined,
    }
  }

  function errorText(name) {
    if (!errors[name]) return null
    return (
      <p className="field-error" id={`club-${name}-error`}>
        {errors[name]}
      </p>
    )
  }

  return (
    <section id="comunidad" className="section community" aria-labelledby="comunidad-title">
      <div className="community-grid">
        <div>
          <p className="label">04 · comunidad</p>
          <h2 id="comunidad-title">aquí hay lugar pa’ todos</h2>
          <p className="section-intro community-intro">
            Koffe se hace con la gente que regresa. Cada semana abrimos la barra pa’ aprender,
            probar cosas nuevas y conocernos.
          </p>

          <ul className="events" role="list" aria-label="Eventos de la semana">
            {events.map((e) => (
              <li key={e.what}>
                <p className="label">{e.when}</p>
                <h3>{e.what}</h3>
                <p>{e.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="club" id="club">
          <img
            src="images/noche.jpg"
            alt="Vista desde la calle de una cafetería iluminada de noche, con gente platicando en sus mesas."
            width="1400"
            height="934"
            loading="lazy"
          />
          <h3>
            club koffe
            <span className="ast" />
          </h3>
          <ul className="perks" aria-label="Beneficios del club">
            <li>Tu décimo café va por la casa.</li>
            <li>Preventa de microlotes antes que nadie.</li>
            <li>Invitación a todos los eventos.</li>
          </ul>

          {joined ? (
            <p className="club-done" role="status" ref={doneRef} tabIndex={-1}>
              Listo, {joined}, ya eres del club. Te escribimos pa’l próximo evento.
            </p>
          ) : (
            <form className="club-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="club-nickname">Tu apodo</label>
                <input type="text" autoComplete="nickname" {...fieldProps('nickname')} />
                {errorText('nickname')}
              </div>
              <div className="field">
                <label htmlFor="club-email">Correo electrónico</label>
                <input type="email" autoComplete="email" {...fieldProps('email')} />
                {errorText('email')}
              </div>
              <button type="submit" className="button button-solid">
                unirme al club
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
