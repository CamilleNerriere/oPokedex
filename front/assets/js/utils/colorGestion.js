

const colorGestion = {
    hexColor(hexColor) {
    // Convertir la couleur hex en RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculer la luminosité
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Retourner noir ou blanc selon la luminosité
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
};

export {colorGestion};