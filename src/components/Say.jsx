// Shows a short visual form but gives screen readers the spoken form,
// e.g. "250 g" is announced as "250 gramos". The short form is drawn by CSS
// (.say::after, with empty alt text), so the DOM only holds the spoken text.
export default function Say({ show, as }) {
  return (
    <span className="say" data-show={show}>
      <span className="visually-hidden">{as}</span>
    </span>
  )
}
