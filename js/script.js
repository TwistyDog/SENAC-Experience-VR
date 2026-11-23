/*
 * SENAC EXPERIENCE VR
 * Sala: Desenvolvimento de Sistemas
 */

// Identificação do curso apresentado
const curso = {
    id: "desenvolvimento-sistemas",
    nome: "Desenvolvimento de Sistemas"
};

// Elementos da página
const botaoInteresse = document.querySelector("#interest-button");

const botaoSemInteresse = document.querySelector("#no-interest-button");

const feedback = document.querySelector("#choice-feedback");

// Armazena temporariamente a resposta do visitante
let respostaVisitante = null;


// Função responsável por registrar a escolha
function registrarResposta(interesse) {

    respostaVisitante = interesse;

    const resposta = {
        cursoId: curso.id,
        cursoNome: curso.nome,
        interesse: interesse
    };

    console.log("Resposta do visitante:", resposta);

    // Feedback visual
    if (interesse) {

        feedback.textContent =
            "Que ótimo! Você demonstrou interesse no curso de Desenvolvimento de Sistemas.";

    } else {

        feedback.textContent =
            "Obrigado pela visita! Continue explorando outras possibilidades de formação.";
    }

    // Evento preparado para comunicação com a Unity
    window.dispatchEvent(
        new CustomEvent("senac:resposta-interesse", {
            detail: resposta
        })
    );

    // Disponibiliza a resposta para uma futura integração
    window.respostaCursoUnity = resposta;
}


// Botão: Tenho interesse
botaoInteresse.addEventListener("click", () => {

    registrarResposta(true);

});


// Botão: Não tenho interesse
botaoSemInteresse.addEventListener("click", () => {

    registrarResposta(false);

});


// Evento de retorno para a experiência Unity
document.querySelector("#back-button")?.addEventListener("click", () => {

    window.dispatchEvent(
        new CustomEvent("senac:voltar-experiencia")
    );

    if (window.history.length > 1) {
        window.history.back();
    }

});


// Identificação da sala carregada
console.log("SENAC Experience VR iniciado!");

console.log("Sala atual: Desenvolvimento de Sistemas");