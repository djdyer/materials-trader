// PHOTO upload id of input saved to const photo
const photo = document.querySelector('#photo-upload');

// Variable for the uploaded photo
var uploadedPhoto = "";

photo.addEventListener("upload", function() {
  const reader = new FileReader();
  reader.addEventListener("upload", () => {
    uploadedPhoto = reader.result;
    document.querySelector("#post_image").style.backgroundImage = `url(${uploadedPhoto})`;
  });
  reader.readAsDataURL(this.files[0]);
});

async function createListing(event) {
  event.preventDefault()

  // Accept title and content
  const material = document.querySelector('#material-selection').value
  const description = document.querySelector('#material-description').value
  const amount = document.querySelector('#material-amount').value
  const location = document.querySelector('#material-location').value
  const contact = document.querySelector('#material-contact').value

  // ID on where the image goes
  id="post_image"

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

document.querySelector('.create').addEventListener('submit', createListing)
