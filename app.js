const contenedorqr = document.getElementById('qrContainer');
        const QR = new QRCode(contenedorqr);
        const generateButton = document.getElementById('generateButton');
        const linkInput = document.getElementById('link');
        const downloadButton = document.getElementById('downloadButton');

        // Al hacer clic en el botón de generar QR
        generateButton.addEventListener('click', () => {
            const linkValue = linkInput.value.trim(); // Obtenemos el valor del input
            if (linkValue) {
                QR.makeCode(linkValue); // Generamos el código QR
                downloadButton.style.display = 'block'; // Mostramos el botón de descarga
            } else {
                alert("Por favor, ingresa un enlace válido.");
            }
        });

        // Funcionalidad para descargar el QR
        downloadButton.addEventListener('click', () => {
            const qrCanvas = contenedorqr.querySelector('canvas'); // Obtenemos el canvas del QR generado
            if (qrCanvas) {
                const qrImage = qrCanvas.toDataURL("image/png"); // Convertimos el canvas a una imagen en base64
                const a = document.createElement('a');
                a.href = qrImage; // Establecemos el enlace a la imagen generada
                a.download = 'qr-code.png'; // Nombre por defecto para el archivo
                a.click(); // Disparamos la descarga
            } else {
                alert("Genera un código QR primero.");
            }
        });