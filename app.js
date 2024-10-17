const contenedorqr = document.getElementById('qrContainer');
        const QR = new QRCode(contenedorqr);
        const generateButton = document.getElementById('generateButton');
        const linkInput = document.getElementById('link');
        const historyButton = document.getElementById('historyButton');
        const historyContainer = document.getElementById('historyContainer');
        const historyList = document.getElementById('historyList');

        // Manejo del historial
        const qrHistory = [];

        // Generar QR y agregarlo al historial
        generateButton.addEventListener('click', () => {
            const linkValue = linkInput.value.trim();
            if (linkValue) {
                QR.makeCode(linkValue);
                qrHistory.push(linkValue); // Agregamos la URL al historial
                updateHistory();
            } else {
                alert("Por favor, ingresa un enlace válido.");
            }
        });

        // Mostrar/ocultar historial
        historyButton.addEventListener('click', () => {
            historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
        });

        // Actualizar el historial en la UI
        function updateHistory() {
            historyList.innerHTML = ''; // Limpiamos la lista antes de agregar nuevos elementos
            qrHistory.forEach((link, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}: ${link}`;
                listItem.style.cursor = 'pointer'; // Hacemos que el historial sea clicable
                
                // Agregar evento click para insertar el valor en el input
                listItem.addEventListener('click', () => {
                    linkInput.value = link; // Reemplazamos el valor del input con el del historial
                });
                
                historyList.appendChild(listItem); // Agregamos el item a la lista
            });
        }
