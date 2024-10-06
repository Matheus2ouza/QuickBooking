import showInfo, { loading, loadingOff } from './uiEffects.js';

const usernameError = document.querySelector('.username-error'),
emailError = document.querySelector('.email-error'),
passwordError = document.querySelector('.pswd-error'),
submitButton = document.querySelector('.submit-button'),
usernameInput = document.querySelector('.inp-user'),
emailInput = document.querySelector('.inp-email'),
passwordInput = document.querySelector('.input-password');

// Função para exibir mensagens de erro e marcar o campo como erro
function displayError(errorElement, message, inputError) {
    errorElement.textContent = message;  // Define a mensagem de erro
    inputError.classList.add('error');    // Adiciona a classe de erro ao campo
}

// Função para redefinir o campo de entrada ao focar nele
function resetField(errorElement, inputField) {
    inputField.addEventListener('focus', () => {
        errorElement.textContent = ''; // Limpa a mensagem de erro
        inputField.classList.remove('error'); // Remove a classe de erro
    });
}

// Função assíncrona para registrar o usuário
async function registerUser(userData) {
    try {
        // Envia os dados do usuário (username, email e password )para a API
        const response = await fetch('https://apiquickbooking.ddns.net:8443/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData), // Converte os dados do usuário em JSON
        });

        // Verifica se o registro foi bem-sucedido
        if (response.status === 201) {
            return true;
        } else {
            const errorResponse = await response.json(); // Converte a resposta de erro para JSON
            handleRegistrationError(errorResponse); // Lida com o erro
            return false;
        }
    } catch (error) {
        return false; // Erro no registro
    } finally {
        loadingOff(); // Garante que o loading seja desativado, independentemente do resultado
    }
}

// Função para lidar com erros de registro com base na resposta da API
function handleRegistrationError(errorResponse) {
    if (errorResponse.message.includes('username')) {
        displayError(usernameError, 'Usuário já está sendo usado', usernameInput); // Erro de nome de usuário
    } else if (errorResponse.message.includes('email')) {
        displayError(emailError, 'Email já está sendo usado', emailInput); // Erro de email
    } else {
        throw new Error('Erro ao registrar usuário'); 
    }
}

// Função para validar um campo de entrada e exibir erro, se necessário
export default function validateField(inputField, errorElement, errorMessage) {
    const value = inputField.value.trim(); // Remove espaços em branco
    if (value.length === 0) {
        displayError(errorElement, errorMessage, inputField); // Exibe mensagem de erro
        resetField(errorElement, inputField); // Reseta o campo
        return false; // Campo inválido
    }
    return true; // Campo válido
}

// Função assíncrona para validar todos os campos do formulário
async function validateForm() {
    loading(); // Inicia o loading

    // Valida todos os campos necessários
    const validations = [
        { input: usernameInput, error: usernameError, errorMessage: 'O campo Usuário não pode ficar em branco' },
        { input: emailInput, error: emailError, errorMessage: 'O campo Email não pode ficar em branco' },
        { input: passwordInput, error: passwordError, errorMessage: 'O campo Senha não pode ficar em branco' },
    ];
    
    let isValid = true; // Inicializa a variável de validação caso essa variavel continue true ate o final o cadastro é feito
    
    // Itera sobre as validações e chama validateField caso nao sejam aceitas, além de passar isValid false
    for (const { input, error, errorMessage } of validations) {
        if (!validateField(input, error, errorMessage)) {
            isValid = false;
            loadingOff(); 
        }
    }

    // Validação adicional para o formato do username
    const usernameValue = usernameInput.value;
    if (usernameValue.length < 5) {
        displayError(usernameError, 'Usuario muito curto', usernameInput); 
        isValid = false;
        loadingOff(); 
    }else if(usernameValue.length > 25){
        displayError(usernameError, 'Usuario muito longo', usernameInput); 
        isValid = false;
        loadingOff();
    }

    // Validação adicional para o formato do email
    const emailValue = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Padrão regex para email
    if (emailValue.length > 0 && !emailPattern.test(emailValue)) {
        displayError(emailError, 'Email inválido', emailInput); // Exibe erro se o email for inválido
        isValid = false; // Campo inválido
    }

    // Validação adicional para a força da senha
    const passwordValue = passwordInput.value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#*%@_\-+=])[A-Za-z\d#*%@_\-+=]{8,}$/; // Padrão regex para senha forte
    if (passwordValue.length > 0 && !passwordPattern.test(passwordValue)) {
        displayError(passwordError, 'Senha fraca', passwordInput); 
        showInfo();
        loadingOff();
        isValid = false;
    }

    // Se todos os campos forem válidos, cria um objeto e passa o mesmo para o registro na api
    if (isValid) {
        const userData = {
            username: usernameValue,
            email: emailValue,
            password: passwordValue,
        };

        const registrationSuccess = await registerUser(userData); // Tenta registrar o usuário
        
        //caso o cadastro na API retorne true ele redireciona para a proxima pagina
        if (registrationSuccess) {
            window.location.href = '/page/dashboard.html';
        }
    }
}

// Adiciona um evento ao clicar no button submit-button
submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    loading();
    await validateForm();
});
