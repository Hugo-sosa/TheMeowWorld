const form = document.getElementById('newsletter');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault();  

    const parametro = document.getElementById('email').value;

    if (!parametro) {
        responseMessage.textContent = 'El email es requerido.';
        return;
    }

    const data = { parametro: parametro };

    try {
        const response = await fetch('https://1667-2806-2f0-34e1-f2fc-4869-1b06-36a1-fb7a.ngrok-free.app/insertar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        if (response.ok) {
            responseMessage.textContent = `Email insertado con éxito. ID: ${responseData.id}`;
        } else {
            responseMessage.textContent = `Error: ${responseData.error || 'Algo salió mal'}`;
        }
    } catch (error) {
        responseMessage.textContent = 'Error al conectar con la API.';
        console.error('Error:', error);
    }
});
