'use strict'

const form = document.querySelector('.form');
const body = document.querySelector('body');
const successMessage = document.querySelector('.success-message')

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
        form.scrollIntoView({ behavior: 'smooth' });
      } else {
        const errorElement = document.getElementById(`${field.name}-validation`);
        errorElement.classList.add('hidden');
      }
    });

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