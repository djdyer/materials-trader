async function deleteHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/articles/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      article_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert("Failed to delete article");
  }
}

document.querySelector("#delete").addEventListener("click", deleteHandler);
