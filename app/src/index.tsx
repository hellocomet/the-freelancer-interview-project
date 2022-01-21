import ReactDOM from 'react-dom'

const mountingPoint = document.getElementById('root')

if (mountingPoint == null) {
  throw new Error(
    'The mounting point of the application was not found. Please make sure an element with `id="root"` exist in index.html.'
  )
}

ReactDOM.render(<>{/* FIXME */}</>, mountingPoint)
