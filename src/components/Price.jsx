import Say from './Say.jsx'

// "$" alone is announced as "dollars" by screen readers; say pesos instead.
export default function Price({ value }) {
  return <Say show={`$${value}`} as={`${value} pesos`} />
}
