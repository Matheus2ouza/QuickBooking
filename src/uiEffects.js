const signUpButton = document.getElementById('signUp'),
signInButton = document.getElementById('signIn'),
container = document.getElementById('container'),
togglePasswordIcons  = document.querySelectorAll('.eye-password'),
passwordFields  = document.querySelectorAll('.input-password'),
info = document.querySelector('.password-info'),
divContainer = document.querySelector('.div-container'),
background = document.querySelector('.loading-background');

function clearAll(){
	const inputs = document.querySelectorAll('input');
	inputs.forEach(input  =>{
		input.value = '';
        input.classList.remove('error');
	})

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = ''; // Limpa o texto de cada span
    });
}

export default function showInfo() {
    passwordTooltip.classList.toggle('show-tooltip');
    
    if (passwordTooltip.classList.contains('show-tooltip')) {
        setTimeout(() => {
            passwordTooltip.classList.remove('show-tooltip');
        }, 7000);
    }
}

function handleAuthButtonClick(addClass) {
    container.classList.toggle("right-panel-active", addClass);
    clearAll();
    passwordTooltip.classList.remove('show-tooltip');
}

signUpButton.addEventListener('click', () => handleAuthButtonClick(true));
signInButton.addEventListener('click', () => handleAuthButtonClick(false));


togglePasswordIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {	
        const passwordField = passwordFields[index];
        const isPasswordType = passwordField.type === 'password';
        
        passwordField.setAttribute('type', isPasswordType ? 'text' : 'password');
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    });
});


info.addEventListener('click', function () {
	showInfo();
});

function setLoadingState(isLoading) {
    divContainer.classList.toggle('show', isLoading);
    background.classList.toggle('show', isLoading);
}

export function loading() {
    setLoadingState(true);
}

export function loadingOff() {
    setLoadingState(false);
}

window.addEventListener('load', ()=>{
	document.body.style.opacity = '1',
	document.body.style.transform = 'translateY(0)';
})