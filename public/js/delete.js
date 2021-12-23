async function deleteHandler(event) {
  event.preventDefault();
  console.log(this);
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

// document.querySelector("#deleteBtn").addEventListener("click", deleteHandler);

var deleteAll = document.querySelectorAll(".delete");
// console.log(deleteAll);
for (var i = 0; i < deleteAll.length; i++) {
  console.log(deleteAll[i]);
  deleteAll[i].addEventListener("click", deleteHandler);
}
