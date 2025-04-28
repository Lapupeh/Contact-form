'use strict'

const form = document.querySelector('.form');
const body = document.querySelector('body');
const successMessage = document.querySelector('.success-message');
const errorSummary = document.getElementById('errorSummary');

let errors = [];

const errorFields = {
  firstName: 'First name is required.',
  lastName: 'Last name is required.',
  email: 'Email is required.',
  message: 'Message is required.',
  query: 'Please select a query type.',
  check: 'Please check the consent box to submit the form.'
};

const requiredFields = [
  {name: 'firstName'},
  {name: 'lastName'},
  {name: 'email'},
  {name: 'message'},
  {name: 'query'},
  {name: 'check'}
];

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let isValid = true;

    requiredFields.forEach(field => {
      const value = formData.get(field.name);
      if (!value || value.trim() === '') {
        // Show error message for the field
        isValid = false;
        const errorElement = document.getElementById(`${field.name}-validation`);
        errorElement.classList.remove('hidden');
        errors.push(errorFields[field.name]);
        document.getElementById(field.name).setAttribute('aria-invalid', 'true');
        form.scrollIntoView({ behavior: 'smooth' });

      } else {
        const errorElement = document.getElementById(`${field.name}-validation`);
        errorElement.classList.add('hidden');
        document.getElementById(field.name).removeAttribute('aria-invalid');
       
      }
      
    });

    if (errors.length > 0) {
      errorSummary.innerHTML = errors.map(error => `<div>${error}</div>`).join('');
      errors = []; 
    } 

    if (isValid) {
      body.scrollIntoView({ behavior: 'smooth' });
      successMessage.classList.remove('hide');
      successMessage.classList.add('active');
    
      setTimeout(function() {
        successMessage.classList.add('hide');
        successMessage.classList.remove('active');
      }, 5000);
      
      form.reset();
    }
}

form.addEventListener('submit', handleSubmit);