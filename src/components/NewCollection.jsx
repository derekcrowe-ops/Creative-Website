import { ArrowLong } from './icons.jsx'
import './NewCollection.css'

export default function NewCollection() {
  return <section className="collection" id="collection">
    <div className="collection__media" data-reveal><img src={import.meta.env.BASE_URL + 'products/03.svg'} alt="Illustration of hockey gear bag and sticks ready for rink travel" loading="lazy" /></div>
    <div className="collection__body"><div className="collection__inner">
      <h2 className="collection__title" data-reveal>The One-Carry Hockey Bag</h2>
      <blockquote className="collection__note" data-reveal style={{ '--i': 1 }}><p>Our venture idea is simple: a hockey gear bag with integrated stick holders. Keep the things you need for the rink together, and make team travel a little less chaotic.</p></blockquote>
      <div className="collection__cards">
        <figure data-reveal style={{ '--i': 2 }}><img src={import.meta.env.BASE_URL + 'products/01.svg'} alt="Concept illustration highlighting integrated stick holders" loading="lazy" /><figcaption>Integrated stick holders</figcaption></figure>
        <figure data-reveal style={{ '--i': 3 }}><img src={import.meta.env.BASE_URL + 'products/04.svg'} alt="Concept illustration of a player carrying gear to the rink" loading="lazy" /><figcaption>Made for rink-day routines</figcaption></figure>
      </div>
      <a className="ghost-btn collection__cta" href="mailto:hello@rinkkit.example?subject=RinkKit%20interest" data-reveal style={{ '--i': 4 }}><span>Tell us what you think</span><ArrowLong className="ghost-btn__arrow" /></a>
    </div></div>
  </section>
}
