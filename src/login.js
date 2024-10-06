import validateField from './singUp.js'
import { loading, loadingOff } from './uiEffects.js'

const inputEmailLogin = document.querySelector('.email-login'),
inputPasswordLogin = document.querySelector('#input-password'),
submitButton = document.querySelector('.submit-buttonLogin'),
emailError = document.querySelector('.email-errorLogin'),
passwordError = document.querySelector('.pswd-errorLogin');

function displayErrors(errorElement, message, inputError, inputError2) {
    errorElement.textContent = message;   // Define a mensagem de erro
    inputError.classList.add('error');    // Adiciona a classe de erro ao campo
    inputError2.classList.add('error');   // Adiciona a classe de erro ao campo
}

// Função assíncrona para registrar o usuário
async function registerUser(userData) {
    try {
        // Envia os dados do usuário (username, email e password )para a API
        const response = await fetch('https://apiquickbooking.ddns.net:8443/loginUser', {
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
            displayErrors(passwordError, 'Email ou Senha Invalida', inputEmailLogin, inputPasswordLogin);
        }
    } catch (error) {
        displayErrors(passwordError, 'Email ou Senha Invalida', inputEmailLogin, inputPasswordLogin);
        return false; // Erro no registro
    } finally {
        loadingOff(); // Garante que o loading seja desativado, independentemente do resultado
    }
}

async function validateForm(){
    const validations = [
        { input: inputEmailLogin, error: emailError, errorMessage: 'O campo Email não pode ficar em branco' },
        { input: inputPasswordLogin, error: passwordError, errorMessage: 'O campo Senha não pode ficar em branco' },
    ];

    let isValid = true

    for (const { input, error, errorMessage } of validations) {
        if (!validateField(input, error, errorMessage)) {
            isValid = false;
            loadingOff(); 
        }
    }

    if(isValid){
        const userData = {
            email: inputEmailLogin.value,
            password: inputPasswordLogin.value 
        };
        const registrationSuccess = await registerUser(userData);

        if(registrationSuccess){
            window.location.href = '/page/dashboard.html';
        }
    }
}

submitButton.addEventListener('click', (event)=>{
    event.preventDefault()
    validateForm()
})

