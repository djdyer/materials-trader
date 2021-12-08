async function deleteHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(id)

  const response = await fetch(`/api/listing/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      listing_id: id
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to delete listing");
  }
}

document.querySelector(".deleteBtn").addEventListener("click", deleteHandler);

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/listings/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete listing');
//     }
//   }
// };
// document
//   .querySelector('.detail')
//   .addEventListener('click', delButtonHandler);
