import { useEffect, useState } from 'react'

// Runs an async loader once and tracks its state.
export function useAsync(loader) {
  const [state, setState] = useState({ data: null, error: null, loading: true })

  useEffect(() => {
    let active = true
    loader()
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => active && setState({ data: null, error, loading: false }))
    return () => {
      active = false
    }
  }, [loader])

  return state
}
