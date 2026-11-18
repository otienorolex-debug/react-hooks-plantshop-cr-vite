import { useState } from 'react'

function PlantCard({ plant }) {
  // Stock is local because the plants API has no stock endpoint.
  const [isInStock, setIsInStock] = useState(true)

  return (
    <li className={`plant-card${isInStock ? '' : ' is-sold-out'}`} data-testid="plant-item">
      <div className="plant-image-wrap">
        <img src={plant.image} alt={plant.name} loading="lazy" />
        <span className="plant-tag">{isInStock ? 'PLANT PEOPLE PICK' : 'SOLD OUT'}</span>
      </div>
      <div className="plant-details">
        <div>
          <h4>{plant.name}</h4>
          <p className="plant-price">
            Price: <span>{plant.price}</span>
          </p>
        </div>
        <button
          className={`stock-button${isInStock ? ' in-stock' : ''}`}
          type="button"
          aria-pressed={!isInStock}
          onClick={() => setIsInStock((currentlyInStock) => !currentlyInStock)}
        >
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </button>
      </div>
    </li>
  )
}

export default PlantCard
