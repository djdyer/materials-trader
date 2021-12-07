async function editFormHandler(event) {
  event.preventDefault()
  const material = document.querySelector('#material-selection').value
  const photo = document.querySelector('#photo-selection').value
  const description = document.querySelector('#material-description').value
  const amount = document.querySelector('#material-amount').value
  const location = document.querySelector('#material-location').value
  const contact = document.querySelector('#material-contact').value

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]
  const response = await fetch(`/api/listings/${id}`, {
    method: 'PUT',
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
    alert('Failed to edit listing')
  }
}
document.querySelector('#saveBtn').addEventListener('submit', editFormHandler)
// document
//   .querySelector('#deleteBtn')
//   .addEventListener('submit', deleteFormHandler)
