// Conexión a la API para realizar solicitudes GET, POST, DELETE.

// URL de la API
const API_URL = 'http://localhost:3000/productos';

// Solicitud GET para obtener los productos
async function getProducts() {
    const productos = await fetch(API_URL);

    const productosConvertidos = productos.json();

    return productosConvertidos;
}

// Solicitud POST para crear un producto
async function createProduct(data) {
    const conexion = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-type': 'aplication/json' },
        body: JSON.stringify(data)
    });

    const conexionConvertida = conexion.json();

    if (!conexion.ok) {
        throw new Error('Ha ocurrido un error al enviar el video');
    }

    return conexionConvertida;
}

// Solicitud DELETE para eliminar un producto del archivo JSON
async function removeProductById(id) {
    const conexion = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    const conexionConvertida = conexion.json();

    if (!conexion.ok) {
        throw new Error('Ha ocurrido un error al eliminar el video');
    }

    return conexionConvertida;
}

export const conexionAPI = {
    getProducts,
    createProduct,
    removeProductById,
}
