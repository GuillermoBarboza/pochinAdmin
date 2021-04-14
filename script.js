let deployedUrl = "https://confesionario-back-end.vercel.app/";
let confesiones = [];

function deleteConfession(id) {
    console.log(id);
    
  fetch(deployedUrl + 'eliminar/confesion', {
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

  const data = await fetch(deployedUrl).then((res) => res.json());

  data.map((confesion, key) => {

    let confesionHtml = `
    <div class="confesion ${key === data.length - 1 ? "lastConfesion" : ""}">
        <h3 class="confesion-titulo">${confesion.confessionTitle}</h3>
        <button id="${confesion._id}"><i class="fas fa-trash-alt"></i></button>
        <p class="confesion-text">"${confesion.confessionText}"</p>
        <div class="confesion-info">
            <p class="confesion-name">- ${confesion.name}</p>
            <a href="confesion.html?id=${confesion._id}"> 
                <p class="confesion-name">Comentarios: ${
                  confesion.comments.length
                }</p> 
            </a>
        </div>
    </div>
    `;
    confesiones.push(confesionHtml);
  });

  confesiones.map((confesion) => {
    confesionContainer.innerHTML += confesion;
  });

  let buttons = document.querySelectorAll("button");

  Array.from(buttons).map((button) => {
    button.addEventListener("click", (e) => {
      deleteConfession(e.target.id);
    });
  });
};
