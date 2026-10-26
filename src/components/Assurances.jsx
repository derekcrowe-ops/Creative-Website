import { SealCheck, Shipping, Expert, SecureCard } from './icons.jsx'
import './Assurances.css'

const ITEMS = [
  { Icon: SealCheck, label: 'Sticks together', copy: ['Holders built into', 'the bag concept'] },
  { Icon: Shipping, label: 'Less to juggle', copy: ['Gear and sticks', 'in one carry'] },
  { Icon: Expert, label: 'Youth focused', copy: ['For players ages', '6–20 and families'] },
  { Icon: SecureCard, label: 'Early concept', copy: ['Help shape what', 'comes next'] },
]
export default function Assurances() {
  return <section className="assurances" id="assurances"><div className="shell"><ul className="assurances__row">{ITEMS.map(({ Icon, label, copy }, i) => <li key={label} data-reveal style={{ '--i': i }}><Icon className="assurances__icon" /><h3 className="assurances__label">{label}</h3><p className="assurances__copy">{copy[0]}<br />{copy[1]}</p></li>)}</ul></div></section>
}
