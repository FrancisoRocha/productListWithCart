

// Obteniendo los Productos del JSON
export async function loadProducts() {

    try {
        const response = await fetch('/data.json');
        
        if(!response.ok) {
            throw new Error('Falla en la Api');
        }

        const products = await response.json();
        return products;

    } catch (error) {
        console.error('Error :', error)
    }
}





