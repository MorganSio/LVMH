document.getElementById('qrForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const pokemon = document.getElementById('pokemon').value;
    if (url && pokemon) {
        generateQRCode(url, pokemon);
    }
});

function generateQRCode(url, pokemon) {
    const qrCodeDiv = document.getElementById('qrCode');
    qrCodeDiv.innerHTML = `<img src="https://placehold.co/300x300?text=QR+Code+for+${pokemon}" alt="QR Code in the shape of ${pokemon}">`;
    showPopup(pokemon);
}

function showPopup(pokemon) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');
    switch (pokemon) {
        case 'magicarp':
            popupTitle.textContent = 'Magicarp et la pêche intensive';
            popupMessage.textContent = 'La pêche intensive menace d\'extinction différentes espèces de poisson. Protégeons nos océans !';
            break;
        case 'bulbasaur':
            popupTitle.textContent = 'Bulbasaur et la déforestation';
            popupMessage.textContent = 'La déforestation détruit les habitats naturels. Plantons des arbres pour un avenir meilleur !';
            break;
        case 'charmander':
            popupTitle.textContent = 'Charmander et le réchauffement climatique';
            popupMessage.textContent = 'Le réchauffement climatique affecte notre planète. Réduisons notre empreinte carbone !';
            break;
        case 'squirtle':
            popupTitle.textContent = 'Squirtle et la pollution de l\'eau';
            popupMessage.textContent = 'La pollution de l\'eau met en danger la vie aquatique. Gardons nos rivières et océans propres !';
            break;
        case 'pikachu':
            popupTitle.textContent = 'Pikachu et l\'énergie renouvelable';
            popupMessage.textContent = 'Utilisons des sources d\'énergie renouvelable pour un avenir durable. Économisons l\'énergie !';
            break;
        default:
            popupTitle.textContent = 'Sensibilisation';
            popupMessage.textContent = 'Protégeons notre planète pour les générations futures !';
    }
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}