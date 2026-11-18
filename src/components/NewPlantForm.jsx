import { useState } from 'react'

function NewPlantForm({ onAddPlant }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const newPlant = {
      name: formData.get('name').trim(),
      image: formData.get('image').trim(),
      price: formData.get('price'),
    }

    const wasAdded = await onAddPlant(newPlant)
    if (wasAdded) {
      form.reset()
    }
    setIsSubmitting(false)
  }

  return (
    <section className="new-plant-panel" aria-labelledby="new-plant-title">
      <div className="form-copy">
        <p className="eyebrow">ADD TO THE COLLECTION</p>
        <h2 id="new-plant-title">A new leafy friend?</h2>
        <p>Share a plant and let someone make room for it.</p>
      </div>
      <form className="new-plant-form" onSubmit={handleSubmit}>
        <label>
          Plant name
          <input
            type="text"
            name="name"
            placeholder="Plant name"
            autoComplete="off"
            required
          />
        </label>
        <label>
          Image URL
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            autoComplete="off"
            required
          />
        </label>
        <label>
          Price
          <span className="price-input">
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              placeholder="Price"
              required
            />
          </span>
        </label>
        <button className="add-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding…' : 'Add Plant'}
          <span aria-hidden="true">↗</span>
        </button>
      </form>
    </section>
  )
}

export default NewPlantForm
