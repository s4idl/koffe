// Shared by the menu table, the beans section and the order form.
// Each drink has a house name inspired by Colima (el volcán, la tuba, los xolos…)
// plus its real name.
export const drinks = [
  { id: 'lava', name: 'lava', real: 'espresso', note: 'doble carga, espeso y oscuro', small: 42, large: 52 },
  { id: 'ceniza', name: 'ceniza', real: 'americano', note: 'espresso y agua caliente, ligero', small: 48, large: 56 },
  { id: 'xolo', name: 'xolo', real: 'cortado', note: 'chiquito pero con carácter', small: 52, large: 60 },
  { id: 'nevado', name: 'nevado', real: 'capuchino', note: 'espuma alta y cremosa', small: 58, large: 68 },
  { id: 'tecari', name: 'técari', real: 'latte', note: 'más leche, suave y largo', small: 62, large: 72 },
  { id: 'cholo', name: 'cholo', real: 'mocha', note: 'con chocolate de la sierra', small: 68, large: 78 },
  { id: 'tuba', name: 'tuba', real: 'cold brew', realLang: 'en', note: '18 horas en frío, pa’l calor', small: 64, large: 78 },
  { id: 'fuego', name: 'fuego', real: 'filtrado V60', note: 'el origen de la semana, recién servido', small: 70, large: 84 },
]

export const beans = [
  {
    id: 'casa',
    name: 'la casa',
    origin: 'Colima y Chiapas',
    notes: 'cacao, avellana, panela',
    process: 'lavado · tueste medio',
    price: 220,
  },
  {
    id: 'volcan',
    name: 'volcán',
    origin: 'Comala, Colima',
    notes: 'ciruela, caramelo, cítricos',
    process: 'honey · tueste claro',
    price: 300,
  },
  {
    id: 'sierra',
    name: 'sierra',
    origin: 'Sierra Mazateca, Oaxaca',
    notes: 'jamaica, miel, chocolate amargo',
    process: 'natural · tueste claro',
    price: 340,
  },
]

export const schedule = [
  { days: 'lunes a viernes', hours: '7:30 – 20:00' },
  { days: 'sábado', hours: '8:00 – 21:00' },
  { days: 'domingo', hours: '9:00 – 15:00' },
]
