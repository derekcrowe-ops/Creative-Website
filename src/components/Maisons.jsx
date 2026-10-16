import { ArrowLong } from './icons.jsx'
import './Maisons.css'

/* Reference layout: six portrait cards in a row, alternating a centred
   wordmark card with a photographic one.

   The wordmark cards carry their maison's own piece behind the type, dimmed
   and cooled so the name still reads first - which keeps the reference's
   alternating rhythm instead of turning the row into six photographs. */
const CARDS = [
  {
    type: 'mark',
    name: 'Marchand',
    note: 'Genève · 1911',
    image: import.meta.env.BASE_URL + 'products/01.webp',
  },
  {
    type: 'image',
    src: import.meta.env.BASE_URL + 'products/02.webp',
    name: 'Aubert & Fils — Promenade',
  },
  {
    type: 'mark',
    name: 'Delacourt Genève',
    note: 'Vallorbe · 1879',
    image: import.meta.env.BASE_URL + 'products/03.webp',
  },
  {
    type: 'mark',
    name: 'Verreaux',
    note: 'Neuchâtel · 1852',
    image: import.meta.env.BASE_URL + 'products/04.webp',
  },
  {
    type: 'mark',
    name: 'Belmont',
    note: 'Paris · 1861',
    image: import.meta.env.BASE_URL + 'products/05.webp',
  },
  {
    type: 'image',
    src: import.meta.env.BASE_URL + 'stills/maison-4.webp',
    name: 'Inside the Atelier',
  },
]

export default function Maisons() {
  return (
    <section className="maisons" id="maisons">
      <div className="shell">
        <header className="maisons__head" data-reveal>
          <h2 className="maisons__title">The World of Ora Swiss</h2>
          <p className="maisons__sub">Curated. Authentic. Timeless.</p>
        </header>

        <ul className="maisons__grid">
          {CARDS.map((card, i) => (
            <li
              className={'m-card m-card--' + card.type}
              key={card.name}
              data-reveal
              style={{ '--i': i }}
            >
              {card.type === 'image' ? (
                <>
                  <img src={card.src} alt={card.name} loading="lazy" />
                  <span className="m-card__caption">{card.name}</span>
                </>
              ) : (
                <>
                  <img
                    className="m-card__bg"
                    src={card.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <span className="m-card__mark">
                    <em>{card.name}</em>
                    <small>{card.note}</small>
                  </span>
                  <span className="m-card__hover">
                    View <ArrowLong className="m-card__arrow" />
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>

        <a className="ghost-btn maisons__cta" href="#collection" data-reveal>
          <span>All Maisons</span>
          <ArrowLong className="ghost-btn__arrow" />
        </a>
      </div>
    </section>
  )
}
