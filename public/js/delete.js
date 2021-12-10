async function deleteHandler(event) {
  event.preventDefault();

  // const id = window.location.toString().split("/")[
  //   window.location.toString().split("/").length - 1
  // ];

  const listing_id = document.querySelector("#hiddenListing").value;

  const response = await fetch(`/api/users/deletelisting/${listing_id}`, {
    method: "DELETE",
    body: JSON.stringify({
      listing_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to delete listing");
  }
}

document.querySelector("#deleteBtn").addEventListener("click", deleteHandler);
