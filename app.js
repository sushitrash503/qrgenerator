const contenedorqr = document.getElementById('qrContainer');
        const QR = new QRCode(contenedorqr);
        const generateButton = document.getElementById('generateButton');
        const linkInput = document.getElementById('link');
        const historyButton = document.getElementById('historyButton');
        const historyContainer = document.getElementById('historyContainer');
        const historyList = document.getElementById('historyList');

        // Recuperar historial desde localStorage o iniciar vacío
        let qrHistory = JSON.parse(localStorage.getItem('qrHistory')) || [];

        // Generar QR y agregarlo al historial
        generateButton.addEventListener('click', () => {
            const linkValue = linkInput.value.trim();
            if (linkValue) {
                QR.makeCode(linkValue);
                if (!qrHistory.includes(linkValue)) {
                    qrHistory.push(linkValue); // Agregar la URL solo si no está en el historial
                    updateHistory();
                    saveHistory(); // Guardar el historial en localStorage
                } else {
                    nosaveHistory()
                }
                qrHistory.push(linkValue); // Agregar la URL al historial
                updateHistory();
                saveHistory(); // Guardar el historial en localStorage
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
            historyList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
            qrHistory.forEach((link, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}: ${link}`;
                listItem.style.cursor = 'pointer'; // Hacemos que el historial sea clicable
                
                // Agregar evento click para insertar el valor en el input
                listItem.addEventListener('click', () => {
                    linkInput.value = link; // Reemplazar el valor del input con el del historial
                });
                
                historyList.appendChild(listItem); // Agregar el item a la lista
            });
        }

        // Guardar historial en localStorage
        function saveHistory() {
            localStorage.setItem('qrHistory', JSON.stringify(qrHistory));
        }

        // Inicializar historial en la carga de la página
        window.onload = () => {
            updateHistory();
        }
