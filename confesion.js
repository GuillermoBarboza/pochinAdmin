let deployedUrl = "https://confesionario-back-end.vercel.app/";
let confession;

function deleteComment(id) {
  fetch(deployedUrl + 'eliminar/comentarios', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  }).then((res) => {
    location.reload();
  });
}

window.onload = async () => {
  let confesionContainer = document.querySelector(".container");

  confession = await fetch(
    deployedUrl + `${location.search.slice(4)}`
  ).then((res) => res.json());

  let confesionHtml = `
        <div class="confesion">
            <h3 class="confesion-titulo">${confession.confessionTitle}</h3>
            <p class="confesion-text">"${confession.confessionText}"</p>
            <div class="confesion-info">
                <p class="confesion-name">- ${confession.name}</p>
            </div>
            <div class="commentBox"> 
            </div>
        </div>
        `;

  confesionContainer.innerHTML += confesionHtml;

  let commentContainer = document.querySelector(".commentBox");
  let commentHtml = "";

  confession.comments.map((comment) => {
    commentHtml += `
            <div class="comment">
                <p class="commentAuthor">${
                  comment.author.length > 1 ? comment.author : "Anonim@"
                }:</p>
                <p class="commentText">${comment.commentText}</p>
                <button id="${
                  comment._id
                }"><i class="fas fa-trash-alt"></i></button>
            </div>
      `;
  });

  commentContainer.innerHTML += commentHtml;

  let buttons = document.querySelectorAll("button");

  Array.from(buttons).map((button) => {
    button.addEventListener("click", (e) => {
      deleteComment(e.target.id);
    });
  });
};
