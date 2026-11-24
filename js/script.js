/*
 * SENAC EXPERIENCE VR
 * Sala: Desenvolvimento de Sistemas
 */

// Identificação do curso
const curso = {
    id: "desenvolvimento-sistemas",
    nome: "Desenvolvimento de Sistemas"
};

// Elementos da página
const botaoInteresse = document.querySelector("#interest-button");
const botaoSemInteresse = document.querySelector("#no-interest-button");

const feedback = document.querySelector("#choice-feedback");

const modal = document.querySelector("#interest-modal");
const botaoFechar = document.querySelector("#modal-close");

const formulario = document.querySelector("#interest-form");

const formularioSucesso = document.querySelector("#form-success");
const botaoSucesso = document.querySelector("#success-close");


// Abre o formulário
function abrirFormulario() {

    formulario.reset();

    formulario.hidden = false;
    formularioSucesso.hidden = true;

    modal.hidden = false;

    document.querySelector("#visitor-name").focus();
}


// Fecha o formulário
function fecharFormulario() {

    modal.hidden = true;
}


// Botão: Tenho interesse
botaoInteresse.addEventListener("click", () => {

    feedback.textContent = "";

    abrirFormulario();

});


// Botão: Não tenho interesse
botaoSemInteresse.addEventListener("click", () => {

    feedback.textContent =
        "Obrigado pela visita! Continue explorando outras possibilidades de formação.";

    const resposta = {
        cursoId: curso.id,
        cursoNome: curso.nome,
        interesse: false
    };

    window.dispatchEvent(
        new CustomEvent("senac:resposta-interesse", {
            detail: resposta
        })
    );

});


// Envio do formulário
formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    // Captura dos dados
    const dadosVisitante = {

        cursoId: curso.id,

        cursoNome: curso.nome,

        nome: document.querySelector("#visitor-name").value.trim(),

        telefone: document.querySelector("#visitor-phone").value.trim(),

        email: document.querySelector("#visitor-email").value.trim(),

        interesse: true,

        autorizacaoContato: document.querySelector("#visitor-consent").checked

    };

    // Verifica se o nome possui pelo menos duas palavras
    if (dadosVisitante.nome.split(/\s+/).length < 2) {

        alert("Por favor, informe seu nome completo.");

        return;
    }

    console.log("Cadastro do visitante:", dadosVisitante);

    // Disponibiliza os dados para futura integração
    window.respostaCursoUnity = dadosVisitante;

    // Evento para comunicação com a Unity
    window.dispatchEvent(
        new CustomEvent("senac:cadastro-interesse", {
            detail: dadosVisitante
        })
    );

    sessionStorage.setItem(
        "senacVisitante",
        JSON.stringify(dadosVisitante)
    );

    window.location.href = "programa.html";

});


// Fechar pelo botão X
botaoFechar.addEventListener("click", fecharFormulario);


// Fechar após confirmação
botaoSucesso.addEventListener("click", fecharFormulario);


// Fechar ao clicar fora do modal
modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        fecharFormulario();
    }

});


// Fechar pressionando ESC
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && !modal.hidden) {
        fecharFormulario();
    }

});


// Retorno para a experiência Unity
document.querySelector("#back-button")?.addEventListener("click", () => {

    window.dispatchEvent(
        new CustomEvent("senac:voltar-experiencia")
    );

    if (window.history.length > 1) {
        window.history.back();
    }

});


// Inicialização
console.log("SENAC Experience VR iniciado!");
console.log("Sala atual:", curso.nome);