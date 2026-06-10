import dripImage from '../assets/drinks/coffee03_drip.png'
import americanoImage from '../assets/drinks/coffee01_americano.png'
import latteImage from '../assets/drinks/coffee04_latte.png'
import cortadoImage from '../assets/drinks/coffee02_cortado.png'
import matchaImage from '../assets/drinks/coffee05_matcha.png'
import teaImage from '../assets/drinks/coffee06_tea.png'

export const DRINKS = [
  {
    id: 'drip',
    name: 'drip coffee',
    article: 'a',
    image: dripImage,
    timerOffsetX: '1.75rem',
    timerGlowX: '54%',
    timerGlowY: '58%',
  },
  { id: 'americano', name: 'iced americano', article: 'an', image: americanoImage },
  { id: 'latte', name: 'iced latte', article: 'an', image: latteImage },
  { id: 'cortado', name: 'cortado', article: 'a', image: cortadoImage },
  { id: 'matcha', name: 'match latte', article: 'a', image: matchaImage },
  { id: 'tea', name: 'iced tea', article: 'an', image: teaImage },
]

export const DEFAULT_DRINK_INDEX = 1
