/**
 * Rendering of 10000 list items
 * @see https://github.com/vercel/next.js/blob/canary/bench/rendering/pages/stateless-big.js
 */
export default () => {
    return <ul>{items()}</ul>
  }
  
const items = () => {
  const out = new Array(10000)
  for (let i = 0; i < out.length; i++) {
    out[i] = <li key={i}>This is row {i + 1}</li>
  }
  return out
}