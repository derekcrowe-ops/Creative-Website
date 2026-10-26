import { ArrowLong } from './icons.jsx'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()
const COLUMNS = [
  { title: 'Explore', links: [['The idea', '#featured'], ['Why RinkKit', '#maisons'], ['The bag', '#collection']] },
  { title: 'For families', links: [['Who it’s for', '#assurances'], ['Get in touch', 'mailto:derek.crowe@student.fairfield.edu?subject=RinkKit%20interest']] },
]
export default function Footer() {
  return <footer className="footer" id="footer"><div className="shell">
    <div className="footer__top"><div className="footer__brand" data-reveal><span className="footer__mark">RinkKit</span><span className="footer__city">Hockey carry, rethought</span><p className="footer__blurb">A hockey gear bag concept with built-in stick holders, designed to make rink-day transportation easier for youth players and their families.</p></div>
      <nav className="footer__cols" aria-label="Footer">{COLUMNS.map((col, i) => <div key={col.title} data-reveal style={{ '--i': i + 1 }}><h3 className="eyebrow">{col.title}</h3><ul>{col.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></div>)}</nav></div>
    <form className="footer__signup" onSubmit={(e) => { e.preventDefault(); window.location.href = 'mailto:derek.crowe@student.fairfield.edu?subject=RinkKit%20interest&body=' + encodeURIComponent(e.currentTarget.elements.email.value) }} data-reveal>
      <label className="eyebrow" htmlFor="newsletter">Want to share feedback on the idea?</label><div className="footer__field"><input id="newsletter" type="email" name="email" placeholder="your@email.com" autoComplete="email" required /><button type="submit" aria-label="Send feedback"><ArrowLong className="footer__arrow" /></button></div>
    </form>
    <div className="footer__legal"><p>© {CURRENT_YEAR} RinkKit · Student venture concept</p><ul><li><a href="#top">Back to top</a></li></ul></div>
  </div></footer>
}
