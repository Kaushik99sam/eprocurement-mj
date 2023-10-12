import React from 'react'
import Modals from './modals/Modals'

export default function MainComponent() {
  return (
    <div>
        <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <Modals />
    </div>
  )
}
