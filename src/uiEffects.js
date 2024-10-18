const signUpButton = document.getElementById('signUp'),
signInButton = document.getElementById('signIn'),
container = document.getElementById('container'),
togglePasswordIcons  = document.querySelectorAll('.eye-password'),
passwordFields  = document.querySelectorAll('.input-password'),
info = document.querySelector('.password-info'),
divContainer = document.querySelector('.div-container'),
background = document.querySelector('.loading-background');

// Função para limpar todos os campos de input e remover classes de erro
function clearAll() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; // Limpa o valor dos inputs
        input.classList.remove('error'); // Remove a classe de erro, se houver
    });

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = ''; // Limpa mensagens de erro exibidas
    });
}

// Função que alterna a exibição de um tooltip (dica) de senha
export default function showInfo() {
    passwordTooltip.classList.toggle('show-tooltip'); // Exibe/esconde o tooltip

    if (passwordTooltip.classList.contains('show-tooltip')) {
        setTimeout(() => {
            passwordTooltip.classList.remove('show-tooltip'); // Esconde o tooltip após 7 segundos
        }, 7000);
    }
}

// Função que alterna entre os painéis de cadastro e login
function handleAuthButtonClick(addClass) {
    container.classList.toggle("right-panel-active", addClass); // Ativa/desativa a classe do contêiner
    clearAll(); // Limpa todos os inputs e mensagens de erro
    passwordTooltip.classList.remove('show-tooltip'); // Garante que o tooltip de senha seja escondido
}

// Adiciona eventos de clique aos botões de login e cadastro
signUpButton.addEventListener('click', () => handleAuthButtonClick(true)); // Botão de cadastro
signInButton.addEventListener('click', () => handleAuthButtonClick(false)); // Botão de login

// Adiciona eventos para mostrar/ocultar a senha nos campos de input
togglePasswordIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {	
        const passwordField = passwordFields[index]; // Acessa o campo de senha correspondente ao ícone
        const isPasswordType = passwordField.type === 'password'; // Verifica o tipo atual do campo
        
        // Alterna entre mostrar o texto da senha e ocultá-la
        passwordField.setAttribute('type', isPasswordType ? 'text' : 'password');
        icon.classList.toggle('bi-eye'); // Alterna o ícone para olho aberto
        icon.classList.toggle('bi-eye-slash'); // Alterna o ícone para olho fechado
    });
});

// Exibe informações sobre senha quando o elemento 'info' é clicado
info.addEventListener('click', function () {
    showInfo();
});

// Função para gerenciar o estado de loading na página
function setLoadingState(isLoading) {
    divContainer.classList.toggle('show', isLoading); // Mostra/oculta o contêiner de loading
    background.classList.toggle('show', isLoading); // Mostra/oculta o fundo de loading
}

// Exporta funções para ativar/desativar o loading
export function loading() {
    setLoadingState(true); // Ativa o loading
}

export function loadingOff() {
    setLoadingState(false); // Desativa o loading
}

// Evento que faz a página aparecer suavemente ao ser carregada
window.addEventListener('load', () => {
    document.body.style.opacity = '1'; // Torna o corpo visível
    document.body.style.transform = 'translateY(0)'; // Remove qualquer efeito de translação no eixo Y
});