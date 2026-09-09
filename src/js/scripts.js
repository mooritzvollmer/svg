function encodeSVG(svg) {
  // Sicherstellen, dass das SVG das xmlns-Attribut hat
  if (!svg.includes('xmlns=')) {
    svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // SVG korrekt encodieren
  let encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27") // Einfache Anführungszeichen ersetzen
    .replace(/"/g, "%22"); // Doppelte Anführungszeichen ersetzen

  return encoded;
}

// Event-Listener für Benutzereingaben im SVG-Textarea
document.getElementById("inputSVG").addEventListener("input", function () {
  let inputSVG = this.value; // SVG aus der Benutzereingabe abrufen
  let encoded = encodeSVG(inputSVG); // SVG kodieren
  let dataURI = `data:image/svg+xml,${encoded}`; // Data-URI erstellen

  console.log("Data URI:", dataURI); // Debug-Ausgabe

  // Textareas mit kodiertem SVG und CSS-Hintergrundbild-Code aktualisieren
  document.getElementById("encodedSVG").value = encoded;
  document.getElementById("cssCode").value = `background-image: url("${dataURI}");`;

  // Prüfen, ob das SVG-Format korrekt ist
  if (encoded.startsWith("%3Csvg")) {
    document.getElementById("preview").style.backgroundImage = `url("${dataURI}")`;
  } else {
    console.warn("Fehlerhaftes SVG erkannt:", encoded);
  }
});

// Funktion zum Kopieren des Inhalts eines Textareas in die Zwischenablage
function copyToClipboard(id) {
  let text = document.getElementById(id);
  text.select();
  document.execCommand("copy");
}

// Event-Listener für Kopier-Buttons
document.getElementById("copyEncoded").addEventListener("click", function () {
  copyToClipboard("encodedSVG");
});

document.getElementById("copyCSS").addEventListener("click", function () {
  copyToClipboard("cssCode");
});
