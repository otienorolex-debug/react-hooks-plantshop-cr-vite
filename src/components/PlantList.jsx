import PlantCard from './PlantCard.jsx'

function PlantList({ plants, searchQuery }) {
  if (plants.length === 0) {
    return (
      <p className="empty-state">
        {searchQuery
          ? 'No plants match that search. Try another name.'
          : 'No plants have been added yet.'}
      </p>
    )
  }

  return (
    <ul className="plant-grid">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  )
}

export default PlantList
