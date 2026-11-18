import { useEffect, useState } from 'react'
import NewPlantForm from './components/NewPlantForm.jsx'
import PlantList from './components/PlantList.jsx'
import Search from './components/Search.jsx'
import './App.css'

const PLANTS_API_URL = 'http://localhost:6001/plants'
const API_CONNECTION_ERROR =
  'Could not connect to the plants API. Run npm run server in a separate terminal.'

function getRequestErrorMessage(requestError) {
  if (requestError instanceof TypeError) {
    return API_CONNECTION_ERROR
  }

  return requestError.message || 'The plants request failed.'
}

function App() {
  const [plants, setPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPlants() {
      try {
        const response = await fetch(PLANTS_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Could not load plants (HTTP ${response.status}).`)
        }

        const plantsFromApi = await response.json()
        if (!Array.isArray(plantsFromApi)) {
          throw new Error('The plants API returned an invalid response.')
        }

        setPlants(plantsFromApi)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(getRequestErrorMessage(requestError))
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    // Load the current catalog once when the shop page opens.
    loadPlants()
    return () => controller.abort()
  }, [])

  async function handleAddPlant(plant) {
    setError('')

    try {
      const response = await fetch(PLANTS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plant),
      })

      if (!response.ok) {
        throw new Error(`Could not add plant (HTTP ${response.status}).`)
      }

      const createdPlant = await response.json()
      setPlants((currentPlants) => [...currentPlants, createdPlant])
      return true
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError))
      return false
    }
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(normalizedQuery),
  )

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Leaf & Loom home">
          <span className="brand-mark" aria-hidden="true">✿</span>
          <span>Leaf &amp; Loom</span>
        </a>
        <span className="header-note">A little more green, every day.</span>
      </header>

      <main className="shop-content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">THE HOUSEPLANT EDIT</p>
          <h1 id="page-title">Find your next favorite.</h1>
          <p>Thoughtful greenery for the corners that need a little life.</p>
        </section>

        <NewPlantForm onAddPlant={handleAddPlant} />

        <section className="catalog" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">GROW SOMETHING GOOD</p>
              <h2 id="catalog-title">The plant shelf</h2>
            </div>
            <span className="plant-count">
              {plants.length} {plants.length === 1 ? 'plant' : 'plants'}
            </span>
          </div>

          <Search value={searchQuery} onSearch={setSearchQuery} />

          {error && (
            <p className="status-message error-message" role="alert">
              {error}
            </p>
          )}
          {/* Filtering leaves the API result intact so clearing search restores all plants. */}
          {isLoading ? (
            <p className="status-message" role="status">Loading plants…</p>
          ) : error && plants.length === 0 ? null : (
            <PlantList plants={visiblePlants} searchQuery={searchQuery} />
          )}
        </section>
      </main>

      <footer className="site-footer">
        <span>Leaf &amp; Loom</span>
        <span>Rooted in good things.</span>
      </footer>
    </div>
  )
}

export default App
