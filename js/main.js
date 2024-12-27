import { serviciosAPI } from "./services.js";
import { validations } from "./validations.js";

// Referenciando elementos HTML
const containerProducts = document.querySelector('.products__section__container');
const errorProducts = document.querySelector('.products__section__empty__message');
const inputs = document.querySelectorAll('input[type=text]');
const btnSubmit = document.querySelector('.input__submit__btn');
const btnClean = document.querySelector('.input__clean__btn');

// Cargar productos
serviciosAPI.showProducts(containerProducts, errorProducts);

// Elimina los mensajes de error de los campos de entrada
inputs.forEach(input => {
    input.addEventListener('keypress', () => {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = 'none';
    });
    input.addEventListener('blur', () => {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = 'none';
    });
});

// Limpia los valores de los inputs
function cleanInputs(e) {
    e.preventDefault();
    inputs.forEach(input => {
        input.value = ''
    });
}

btnClean.addEventListener('click', (e) => cleanInputs(e));

// Gestiona el proceso de creación de productos
btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    let dataValid = true;

    // Valida cada campo de entrada
    inputs.forEach(input => {
        const errorElement = input.nextElementSibling;

        if (validations.validateEmptyFields(input.value)) {
            errorElement.textContent = `¡El campo ${input.name} no puede estar vacío!`;
            errorElement.style.display = 'block';
            dataValid = false;
        } else if (input.getAttribute('class') == 'input__image') {
            if (!validations.urlStartsWithHTTPS(input.value)) {
                errorElement.textContent = `¡La URL debe empezar con la secuencia https:// para ser reconocida como una URL válida!`;
                errorElement.style.display = 'block';
                dataValid = false;
            }
        } else if (input.getAttribute('class') == 'input__cost') {
            if (!validations.priceIsNumeric(input.value)) {
                errorElement.textContent = `¡El precio debe ser un valor numérico superior a cero para ser reconocido como válido!`;
                errorElement.style.display = 'block';
                dataValid = false;
            }
        }
    })

    // Si los campos de entrada son válidos, se envían los datos a la API
    if (dataValid) {
        const productData = {}
        inputs.forEach(input => { // Crea el objeto
            productData[input.name] = input.value;
        });

        try {
            await serviciosAPI.insertProduct(productData);
        } catch (error) {
            console.log(error);
        }
    }

});
