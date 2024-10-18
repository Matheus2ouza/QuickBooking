const radios = document.querySelectorAll('input[name="document-type"]');
const companydocumentInput = document.querySelector('.documentInput'),
      ownerNameInput = document.querySelector('.owner-name'),
      companyNameInput = document.querySelector('.company-name'),
      registerCompany = document.querySelector('.register-company');

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Remove a classe ativa de todos os links e oculta as seções
      navLinks.forEach(nav => nav.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active')); // Oculta todas as seções
      
      // Adiciona a classe ativa ao link e exibe a seção correspondente
      this.classList.add('active');
      const target = document.querySelector(this.getAttribute('href'));
      target.classList.add('active'); // Mostra a seção correspondente
    });
  });
  
  // Ativa a primeira seção e link por padrão
  navLinks[0].classList.add('active');
  sections[0].classList.add('active'); // Mostra a primeira seção por padrão
    
  const initialDocumentType = getSelectedDocumentType();
  applyDocumentMask(initialDocumentType);
});

function getSelectedDocumentType() {
  const selected = document.querySelector('input[name="document-type"]:checked');
  return selected ? selected.value : null; // Retorna null se não houver seleção
}

function applyDocumentMask(documentType) {
  if (documentType === "CNPJ") {
    Inputmask("99.999.999/9999-99").mask(companydocumentInput);
  } else if (documentType === "CPF") {
    Inputmask("999.999.999-99").mask(companydocumentInput);
  }
}

function displayError(inputError) {
  inputError.classList.add('error');
}

function clearError(inputField) {
  inputField.addEventListener('focus', () => {
    inputField.classList.remove('error');
  });
}

function validateField(input) {
  const value = input.value.trim();

  if (value.length === 0) {
    displayError(input);
    clearError(input);
    return false;
  }
  return true;
}

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const selectedValue = getSelectedDocumentType(); // Atualiza o valor selecionado
    applyDocumentMask(selectedValue); // Aplica a máscara correspondente
  });
});



function validateCompany() {
  const fields = [ownerNameInput, companydocumentInput, companyNameInput];

  const isValid = fields.every(validateField);

  if (isValid) {
    //const userId = sessionStorage.getItem('userId')
    let userId = 2
    const companyData = {
      ownerName: ownerNameInput.value,
      document: companydocumentInput.value,
      companyName: companyNameInput.value,
      userId: userId
    };

    console.log(companyData);
  }
}

registerCompany.addEventListener('click', (event) => {
  event.preventDefault();
  validateCompany();
});
