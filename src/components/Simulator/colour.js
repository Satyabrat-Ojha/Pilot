function generateColors(n) {
  const colors = [];
  const saturation = 70; // You can adjust this value (0-100) for different saturation levels
  const lightness = 50; // You can adjust this value (0-100) for different lightness levels

  for (let i = 0; i < n; i++) {
    const hue = Math.floor((i * 360) / n); // Evenly distribute the hue
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}
