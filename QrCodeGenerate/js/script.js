var qrInput = document.querySelector('input');
var qrButton = document.querySelector('.generate-btn');
var qrImage = document.querySelector('.qr-img');
var qrImageDiv = document.querySelector('.qr-image');
var qrDownButton = document.querySelector('.dowload-btn');

qrButton.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if (qrValue != null) {
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
        qrButton.innerHTML = 'Generating Qr Code ....';
    }
    else {
        return;
    }
    qrImage.addEventListener('load', () => {
        qrButton.innerHTML = 'Generate Qr Code';
        qrImageDiv.classList.add('active');
    })
})

qrInput.addEventListener('keyup', () => {
    if (qrInput.value != null) {
        qrImageDiv.classList.remove('active');
    }
})

qrDownButton.addEventListener('click', () => {
    downloadImage(qrImage.src);
})

function guid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(15)
    );
}

async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc);
    const imageBlob = await image.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    var link = document.createElement('a');
    link.href = imageUrl;
    link.download = guid();
    link.click();
}