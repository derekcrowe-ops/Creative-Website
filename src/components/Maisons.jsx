import { ArrowLong } from './icons.jsx'
import './Maisons.css'

const CARDS = [
  { name: 'Stick holders', note: 'Keep sticks with your kit', image: 'products/01.svg' },
  { name: 'Rink commute', note: 'Car to locker room', image: 'products/02.svg' },
  { name: 'Team travel', note: 'A better bus routine', image: 'products/03.svg' },
  { name: 'Youth hockey', note: 'For players and families', image: 'products/04.svg' },
]
export default function Maisons() {
  return <section className="maisons" id="maisons"><div className="shell">
    <header className="maisons__head" data-reveal><h2 className="maisons__title">Made for the hockey routine</h2><p className="maisons__sub">From the driveway to the dressing room.</p></header>
    <ul className="maisons__grid">{CARDS.map((card, i) => <li className="m-card m-card--image" key={card.name} data-reveal style={{ '--i': i }}><img src={import.meta.env.BASE_URL + card.image} alt={card.note} loading="lazy" /><span className="m-card__caption">{card.name}</span></li>)}</ul>
    <a className="ghost-btn maisons__cta" href="#collection"><span>Our approach</span><ArrowLong className="ghost-btn__arrow" /></a>
  </div></section>
}
