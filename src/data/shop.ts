// Shop-Katalog (Anzeige + Preise). Echtes Bezahlen (€) folgt mit dem App-Store-Release.
export type ShopCurrency = 'coins' | 'diamonds' | 'eur'

export interface ShopItem {
  id: string
  name: string
  emoji: string
  desc: string
  price: number
  currency: ShopCurrency
  color: string
}

export interface ShopSection {
  title: string
  note?: string
  items: ShopItem[]
}

export const SHOP: ShopSection[] = [
  {
    title: '💎 Diamanten-Pakete',
    note: 'Echtgeld – verfügbar mit dem App-Release',
    items: [
      { id: 'dia-s', name: 'Handvoll', emoji: '💎', desc: '500 Diamanten', price: 4.99, currency: 'eur', color: '#3fa9ff' },
      { id: 'dia-m', name: 'Beutel', emoji: '💎', desc: '1.200 Diamanten', price: 9.99, currency: 'eur', color: '#3fa9ff' },
      { id: 'dia-l', name: 'Truhe', emoji: '💎', desc: '2.500 Diamanten', price: 19.99, currency: 'eur', color: '#3fa9ff' },
    ],
  },
  {
    title: '🪙 Münz-Pakete',
    note: 'Mit Diamanten eintauschen',
    items: [
      { id: 'coin-s', name: 'Münzsack', emoji: '🪙', desc: '1.000 Münzen', price: 100, currency: 'diamonds', color: '#ffcf3f' },
      { id: 'coin-m', name: 'Münzkiste', emoji: '🪙', desc: '3.000 Münzen', price: 250, currency: 'diamonds', color: '#ffcf3f' },
      { id: 'coin-l', name: 'Münzberg', emoji: '🪙', desc: '7.500 Münzen', price: 500, currency: 'diamonds', color: '#ffcf3f' },
    ],
  },
  {
    title: '✨ Kosmetik & Pass',
    note: 'Rein optisch – kein Pay-to-Win',
    items: [
      { id: 'skin', name: 'Pet-Skin', emoji: '🎨', desc: 'Neuer Look für dein Pet', price: 800, currency: 'coins', color: '#b56bff' },
      { id: 'design', name: 'Kart-Design', emoji: '🏎️', desc: 'Exklusive Kart-Lackierung', price: 1200, currency: 'coins', color: '#ff7a2f' },
      { id: 'pass', name: 'Season-Pass', emoji: '🎟️', desc: 'Saison-Belohnungen & Pets', price: 9.99, currency: 'eur', color: '#36e07a' },
    ],
  },
]

export function priceLabel(item: ShopItem): string {
  if (item.currency === 'eur') return `${item.price.toFixed(2).replace('.', ',')} €`
  if (item.currency === 'diamonds') return `💎 ${item.price}`
  return `🪙 ${item.price}`
}
