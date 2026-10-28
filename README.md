<p align="center">
  <img src="public/koffe_.svg" alt="koffe" width="180" />
</p>

<p align="center">
  <strong>café de especialidad en Colima</strong><br />
  Sitio de una página para una cafetería ficticia, hecho para la materia
  <em>Accesibilidad de contenidos</em> (WCAG 2.2).
</p>

<p align="center">
  <a href="https://koffe-gold.vercel.app"><strong>→ ver el sitio</strong></a>
</p>

---

## La actividad

> Preparar una página web estática con dos casos de uso y los siguientes elementos:
> imágenes, links, una tabla con datos tabulares, un formulario corto y las regiones
> header, nav, main y footer. Al final, la página debe pasar las pruebas automáticas de
> accesibilidad con **cero problemas en Lighthouse y Silktide**, además de verificaciones manuales.

| Requisito | Dónde está |
| --- | --- |
| Caso de uso 1 | **Revisar el menú, precios y horario.** Sección `menú` + `visítanos` |
| Caso de uso 2 | **Ordenar café y/o beans para recoger.** Sección `ordena` |
| Imágenes | Las fotos de ordena, beans, comunidad y visítanos tienen un `alt` que describe el ambiente del café; las del hero y el menú son decorativas (`alt=""`) |
| Links | Navegación, "saltar al contenido", llamados a ordenar, redes en el footer |
| Tabla | Menú de bebidas con precios por tamaño |
| Formulario | Pedido para recoger (y un segundo formulario corto para el club) |
| Regiones | `header`, `nav`, `main`, `footer` |

## Resultados

| Herramienta | Resultado |
| --- | --- |
| Lighthouse 12 (móvil y escritorio) | **100** accesibilidad · **100** buenas prácticas · **100** SEO |
| axe-core (WCAG 2.2 AA + best practices) | **0** violaciones en página inicial, formulario con errores, confirmación y club |
| Silktide | **0** problemas |
| Manual | Teclado, VoiceOver, zoom al 200 % y vista móvil |

## Decisiones de accesibilidad

Algunas cosas que no saltan a la vista pero que están pensadas a propósito:

**Estructura**
- Regiones semánticas con un solo `h1` y jerarquía de encabezados sin saltos.
- Link de **"saltar al contenido"** como primer elemento enfocable.
- Cada lista tiene nombre (`aria-label`) y cada sección se etiqueta con su título (`aria-labelledby`).
- `lang="es"` en la página y `lang="en"` en palabras en inglés como *beans* o *cold brew*,
  para que el lector de pantalla las pronuncie bien.

**La tabla del menú**
- `<caption>`, encabezados de columna con `scope="col"` y el nombre de cada bebida como
  encabezado de fila (`scope="row"`), para que el lector anuncie "grande, 52 pesos" al moverse
  entre celdas.
- **Precios que se leen bien:** visualmente dice `$52`, pero el lector escucha *"52 pesos"*.
  El símbolo `$` solo lo leen como "dólares".
- **Unidades completas:** `355 ml` se anuncia como *"355 mililitros"*.
- El texto corto visible se dibuja con contenido generado por CSS con texto alternativo vacío
  (`content: attr(data-show) / ''`). Así no se lee dos veces, ni siquiera en Silktide, que sí
  lee texto marcado con `aria-hidden`.

**El asterisco de marca**
- Los nombres de la casa (lava, nevado, técari…) llevan un `*` decorativo. También va por CSS
  con alt vacío, para que el lector no diga "asterisco" a cada rato.

**Formularios**
- Opciones como chips visuales, pero por dentro son **radios nativos** agrupados en
  `fieldset` + `legend`, así que funcionan con flechas del teclado y se anuncian como grupo.
- Errores con mensajes que dicen qué falló y cómo arreglarlo, ligados al campo con
  `aria-describedby` + `aria-invalid`. Al enviar, el foco salta al primer error.
- Al confirmar, el foco se mueve al título de agradecimiento y la confirmación usa
  `role="status"`, así el lector anuncia el pedido y el código de recogida.
- `autocomplete` en nombre, apodo y correo.

**Header fijo y foco**
- El header es *sticky*, así que su altura real se mide con `ResizeObserver` y se usa en
  `scroll-padding-top`. Ni las secciones al navegar ni el elemento enfocado quedan tapados
  (WCAG 2.4.11, *Focus Not Obscured*).
- Foco visible en todos los elementos interactivos.

**Visual**
- Contraste revisado par por par, en todas las combinaciones de color, contra AA (4.5:1 en texto normal).
- Los títulos se ven en minúsculas, pero las mayúsculas de las etiquetas cortas son solo
  CSS (`text-transform`). El texto real sigue escrito normal, para que no se deletree.
- Links que se ven como botón siguen siendo `<a>` porque **navegan**. Solo las acciones
  (enviar, hacer otro pedido) son `<button>`.
- Respeta `prefers-reduced-motion`.

## Cómo comprobarlo

1. **Teclado:** recorre todo con `Tab`; las flechas cambian de opción dentro de cada grupo
   del formulario. Envía el pedido vacío para ver los errores.
2. **VoiceOver** (macOS): `Cmd + F5`, y dentro de la tabla `Ctrl + Option + flechas`.
3. **Zoom al 200 %** y vista móvil: nada se corta ni aparece scroll horizontal.
4. **Lighthouse:** DevTools → Lighthouse → Accessibility.
5. **Silktide:** extensión de Chrome sobre la URL publicada.

## Correrlo localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve el build
```

Hecho con **React 19 + Vite**. Usa una sola familia tipográfica
([Archivo](https://fonts.google.com/specimen/Archivo)) y no tiene dependencias extra.
Publicado en [Vercel](https://koffe-gold.vercel.app); cada push a `main` se publica solo.

## Créditos

- Diseño, logo y favicon: Said López.
- Fotografías: imágenes de referencia, usadas con fines educativos.
- Koffe es una cafetería ficticia; los precios y eventos son de ejemplo.
