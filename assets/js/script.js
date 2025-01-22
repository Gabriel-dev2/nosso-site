let indice = 0; // Inicia na primeira imagem
const imagens = document.querySelectorAll('.carrossel img');
const totalImagens = imagens.length;
// Data do início do relacionamento
const inicioRelacionamento = new Date("2022-11-26T12:10:00"); // Altere para sua data de início

function mudarImagem(direcao) {
    indice += direcao;

    if (indice >= totalImagens) {
        indice = 0; // Vai para a primeira imagem
    } else if (indice < 0) {
        indice = totalImagens - 1; // Vai para a última imagem
    }

    // Movendo o carrossel para a posição correta
    const carrossel = document.querySelector('.carrossel');
    carrossel.style.transform = `translateX(-${indice * 100}%)`;
}

setInterval(() => {
    mudarImagem(1); // Avança uma imagem a cada 3 segundos
}, 3000);

function calcularDiferenca() {
    const agora = new Date();

    // Inicializa os anos, meses e dias
    let anos = agora.getFullYear() - inicioRelacionamento.getFullYear();
    let meses = agora.getMonth() - inicioRelacionamento.getMonth();
    let dias = agora.getDate() - inicioRelacionamento.getDate();

    // Ajusta anos e meses se o mês/dia ainda não passou
    if (meses < 0 || (meses === 0 && dias < 0)) {
        anos--;
        meses += 12;
    }
    if (dias < 0) {
        // Calcula os dias no mês anterior
        const mesAnterior = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            0
        ).getDate();
        dias += mesAnterior;
        meses--;
    }

    // Calcula as horas, minutos e segundos
    const diferencaMilissegundos = agora - inicioRelacionamento;
    const horas = Math.floor((diferencaMilissegundos / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencaMilissegundos / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencaMilissegundos / 1000) % 60);

    return { anos, meses, dias, horas, minutos, segundos };
}

function atualizarContador() {
    const { anos, meses, dias, horas, minutos, segundos } = calcularDiferenca();

    const contador = document.getElementById("contador");
    contador.innerHTML = `
        <span><strong>${anos}</strong> anos,</span>
        <span><strong>${meses}</strong> meses,</span>
        <span><strong>${dias}</strong> dias</span></br>
        <span><strong>${horas}</strong> horas,</span>
        <span><strong>${minutos}</strong> minutos e</span>
        <span><strong>${segundos}</strong> segundos</span>
    `;
}

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);
atualizarContador();