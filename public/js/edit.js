async function editFormHandler(event) {
  event.preventDefault()
  // const material = document.querySelector('#material-selection').value
  // const photo = document.querySelector('#photo-selection').value
  const description = document.querySelector('#material-description').value
  const amount = document.querySelector('#material-amount').value
  const location = document.querySelector('#material-location').value
  const contact = document.querySelector('#material-contact').value

  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ]
// console.log(`${listing_id}`);

  const listing_id = document.querySelector("#hiddenListing").value;

  const response = await fetch(`/api/users/updatelisting/${listing_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      // material,
      // photo,
      listing_id,
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

document.querySelector('#saveBtn').addEventListener('click', editFormHandler);
