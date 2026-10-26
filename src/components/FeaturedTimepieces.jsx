import { ArrowLong } from './icons.jsx'
import './FeaturedTimepieces.css'

const FEATURES = [
  ['01', 'Sticks stay close', 'Built-in stick holders keep your sticks with your gear.', 'products/01.svg'],
  ['02', 'One rink-day carry', 'Bring fewer separate pieces from the car to the rink.', 'products/02.svg'],
  ['03', 'Ready for team travel', 'A clearer place for your gear when the bus is packed.', 'products/03.svg'],
  ['04', 'Designed for young players', 'A carry concept shaped around youth hockey routines.', 'products/04.svg'],
]
export default function FeaturedTimepieces() {
  return <section className="featured" id="featured" aria-label="RinkKit features">
    <div className="featured__pin"><span className="featured__wash" aria-hidden="true">Rink days</span>
      <div className="shell featured__head"><h2 className="featured__title">The details that help</h2><a className="featured__all" href="#collection"><span>See the idea</span><ArrowLong className="featured__all-arrow" /></a></div>
      <div className="featured__viewport"><ul className="featured__track">{FEATURES.map(([no, title, copy, image]) => <li className="p-card" key={no}>
        <div className="p-card__plate"><img src={import.meta.env.BASE_URL + image} alt={title + ' hockey bag concept illustration'} loading="lazy" /><span className="p-card__index">{no}</span></div>
        <div className="p-card__body"><h3 className="p-card__brand">{title}</h3><p className="p-card__model">{copy}</p></div>
        <div className="p-card__foot"><span className="p-card__status is-ok">RinkKit concept<i /></span><a className="p-card__go" href="#collection" aria-label={'Learn about ' + title}><ArrowLong className="p-card__go-arrow" /></a></div>
      </li>)}</ul></div>
      <div className="shell"><div className="featured__progress" aria-hidden="true"><span /></div></div>
    </div></section>
}
