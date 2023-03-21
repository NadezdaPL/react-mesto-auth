export function Spinner({ isLoading }) {
  return (
    <div className={`spinner ${isLoading ? 'spinner_active' : ''}`}></div>
  )
}