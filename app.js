const contenedorqr = document.getElementById('qrContainer');
const QR = new QRCode(contenedorqr);
const generateButton = document.getElementById('generateButton');
const linkInput = document.getElementById('link');
const downloadButton = document.getElementById('downloadButton');

generateButton.addEventListener('click', () => {
    const linkValue = linkInput.value.trim();
    if (linkValue) {
        QR.makeCode(linkValue);
        downloadButton.style.display = 'block'; // Mostrar el botón de descarga
    } else {
        alert("Por favor, ingresa un enlace válido.");
    }
});

downloadButton.addEventListener('click', () => {
    const qrCanvas = contenedorqr.querySelector('canvas'); // Obtener el canvas generado por la librería
    if (qrCanvas) {
        const qrImage = qrCanvas.toDataURL('image/png'); // Convertir el canvas a URL de imagen
        const downloadLink = document.createElement('a');
        downloadLink.href = qrImage;
        downloadLink.download = 'qr-code.png'; // Nombre del archivo descargado
        downloadLink.click();
    }
});
