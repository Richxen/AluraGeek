function validateEmptyFields(campo) {
    return campo === '' || campo === undefined || campo === ' ' || campo === null;
}

function urlStartsWithHTTPS(url) {
    // Valida si la URL es una cadena
    if (typeof url !== 'string') {
        return false;
    }
    // Valida si la URL comienza con "https://"
    return url.startsWith('https://');
}

function priceIsNumeric(price) {
    // Convierte el precio en un valor numérico
    const number = parseFloat(price);

    // Valida si la conversión fue exitosa y si el número es positivo y mayor que 0
    if (isNaN(number) || number <= 0) {
        return false;
    } else {
        return true;
    }
}

export const validations = {
    validateEmptyFields,
    urlStartsWithHTTPS,
    priceIsNumeric
}
