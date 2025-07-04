/* document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
  const expanded =
    document.querySelector(".hamburger").getAttribute("aria-expanded") ===
    "true";
  document.querySelector(".hamburger").setAttribute("aria-expanded", !expanded);
}); */

// === início da integração de Receitas ===
if (window.location.pathname.endsWith("receitas.html")) {
  const API = "http://localhost:3000/feed/receitas";
  const PB_URL = "http://localhost:8090"; // URL do seu PocketBase
  const container = document.getElementById("receitas-container");

  async function carregarReceitas() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log("🔍 Receitas RAW:", data);

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>Sem receitas no momento.</p>";
        return;
      }
      container.innerHTML = "";

      data.forEach((r) => {
        if (!r.publicado) return;

        // Pode vir como imgReceita (novo) ou ImagemReceita (antigo)
        let rawField = null;
        if (r.imgReceita) {
          rawField = r.imgReceita;
        } else if (r.ImagemReceita) {
          rawField = r.ImagemReceita;
        }

        // Converte rawField em string de filename
        let fileName = "";
        if (Array.isArray(rawField) && rawField.length > 0) {
          fileName = rawField[0];
        } else if (typeof rawField === "string" && rawField.trim() !== "") {
          fileName = rawField;
        }

        // URL final da imagem (se houver)
        const imgUrl = fileName
          ? `${PB_URL}/api/files/receitas/${r.id}/${fileName}`
          : null;
        console.log("🔗 imgUrl:", imgUrl);

        // Monta o HTML da imagem
        const imgHtml = imgUrl
          ? `
      <div class="card-image-wrapper">
        <img
          src="${imgUrl}"
          alt="${r.titulo_receita || "Receita"}"
          class="card-image"
          onerror="console.error('Erro ao carregar imagem:', this.src)"
        />
      </div>
    `
          : "";

        // Cria o card
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
    ${imgHtml}
    <h3>${r.titulo_receita || "Sem título"}</h3>
    <p><strong>Ingredientes:</strong><br>
      ${r.ingredientes.replace(/\r\n/g, "<br>")}
    </p>
    <p><strong>Modo de preparo:</strong><br>
      ${r.modo_de_preparo.replace(/\r\n/g, "<br>")}
    </p>
  `;
        container.appendChild(card);
      });
    } catch (err) {
      console.error("Erro ao carregar receitas:", err);
      container.innerHTML = "<p>Erro ao carregar receitas.</p>";
    }
  }

  carregarReceitas();
}
// === fim da integração de Receitas ===

// === início da integração de Desafios ===
if (window.location.pathname.endsWith("desafio.html")) {
  const API_D = "http://localhost:3000/feed/desafios";
  const PB_URL = "http://localhost:8090";
  const containerD = document.getElementById("desafios-container");

  async function carregarDesafios() {
    try {
      const res = await fetch(API_D);
      const data = await res.json();
      console.log("🔍 Desafios RAW:", data);

      if (!Array.isArray(data) || data.length === 0) {
        containerD.innerHTML = "<p>Sem desafios no momento.</p>";
        return;
      }
      containerD.innerHTML = "";

      data.forEach((d) => {
        if (!d.publicado) return;

        let imgAntesDepois = "";
        let imgFeedback = "";

        // Imagem antes/depois (único arquivo)
        if (d.fotoAntesDepois) {
          const urlAntesDepois = `${PB_URL}/api/files/desafios/${d.id}/${d.fotoAntesDepois}`;
          imgAntesDepois = `
            <div class="challenge-image">
              <img src="${urlAntesDepois}" alt="Antes e Depois - ${d.titulo}" />
            </div>
          `;
        }

        // Imagem adicional de feedback (opcional)
        if (d.feedbackImagem) {
          const urlFeedback = `${PB_URL}/api/files/desafios/${d.id}/${d.feedbackImagem}`;
          imgFeedback = `
            <div class="challenge-image">
              <img src="${urlFeedback}" alt="Feedback - ${d.titulo}" />
            </div>
          `;
        }

        // Só exibe o bloco de feedback se houver conteúdo
        const feedbackHtml = d.feedback
          ? `<blockquote class="feedback">${d.feedback}</blockquote>`
          : "";

        const bloco = document.createElement("div");
        bloco.className = "challenge-card";
        bloco.innerHTML = `
          <h3>${d.titulo}</h3>
          ${imgAntesDepois}
          ${imgFeedback}
          <p class="desc">${d.descricao}</p>
          ${feedbackHtml}
        `;
        containerD.appendChild(bloco);
      });
    } catch (err) {
      console.error("Erro ao carregar desafios:", err);
      containerD.innerHTML = "<p>Erro ao carregar desafios.</p>";
    }
  }

  carregarDesafios();
}
// === fim da integração de Desafios ===
