// Charger le fichier header.html et l'insérer dans la page
fetch('header.html')
.then(response => response.text())
.then(data => {
  document.getElementById('header').innerHTML = data;
})
.catch(error => console.error('Erreur lors du chargement du header:', error));