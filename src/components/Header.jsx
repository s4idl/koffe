import { useEffect, useRef } from 'react'

const links = [
  { href: '#menu', label: 'menú' },
  { href: '#beans', label: 'beans', lang: 'en' },
  { href: '#ordena', label: 'ordena' },
  { href: '#comunidad', label: 'comunidad' },
  { href: '#visitanos', label: 'visítanos' },
]

export default function Header() {
  const headerRef = useRef(null)

  // Publish the real header height so anchor jumps land flush under it
  // (and focused elements are never hidden behind it, WCAG 2.4.11).
  useEffect(() => {
    const header = headerRef.current
    const root = document.documentElement
    const observer = new ResizeObserver(() => {
      root.style.setProperty('--header-h', `${Math.floor(header.getBoundingClientRect().height)}px`)
    })
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header" ref={headerRef}>
      <a className="brand" href="#contenido">
        <img src="koffe_.svg" alt="koffe, ir al inicio" width="57" height="22" />
      </a>
      <nav aria-label="Principal">
        <ul className="nav-list" aria-label="Secciones">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} lang={link.lang}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
