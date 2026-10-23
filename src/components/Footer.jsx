export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="footer-claim">nos vemos en la barra.</p>
        <ul className="footer-links" role="list" aria-label="Redes y enlaces">
          <li>
            <a href="https://www.instagram.com/">Koffe en Instagram</a>
          </li>
          <li>
            <a href="https://www.tiktok.com/">Koffe en TikTok</a>
          </li>
          <li>
            <a href="https://unsplash.com/">Fotografías de Unsplash</a>
          </li>
          <li>
            <a href="#contenido">Volver al inicio de la página</a>
          </li>
        </ul>
      </div>

      <img className="footer-logo" src="koffe_.svg" alt="koffe" width="57" height="22" />

      <p className="footer-legal">
        © 2026 koffe. Sitio académico para la clase de Accesibilidad de contenidos. Fotos de
        Unsplash y de referencias en Pinterest.
      </p>
    </footer>
  )
}
