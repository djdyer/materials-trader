async function listingFormHandler(event) {
  event.preventDefault()

  // Accept title and content
  const material = document.querySelector('#material-selection').value
  const photo = document.querySelector('#photo-selection').value
  const description = document.querySelector('#material-description').value
  const amount = document.querySelector('#material-amount').value
  const location = document.querySelector('#material-location').value
  const contact = document.querySelector('#material-contact').value

  if (material && photo && description && amount && location && contact) {
    const response = await fetch('/api/users/createlisting', {
      method: 'POST',
      body: JSON.stringify({
        material,
        photo,
        description,
        amount,
        location,
        contact,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert('Failed to create listing')
    }
  }
}

document.querySelector('.create').addEventListener('submit', listingFormHandler)
