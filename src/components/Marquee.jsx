import './Marquee.css'

const WORDS = [
  'One bag, all your gear',
  'Sticks stay with you',
  'Car to locker room',
  'Made for youth hockey',
  'Ready for team travel',
  'Less to juggle',
]

/* A quiet transition strip between the pinned stage and the page proper, so
   the scroll does not slam from full-bleed footage straight into a grid. */
export default function Marquee() {
  const run = [...WORDS, ...WORDS]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <span className="marquee__run" key={copy}>
            {run.map((word, i) => (
              <span className="marquee__word" key={copy + '-' + i}>
                {word}
                <i />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
