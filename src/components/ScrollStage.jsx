import { useEffect, useRef } from 'react'
import { TOTAL_FRAMES, CHAPTER_FRAMES, resolveFrame } from '../hooks/useFrameSequence'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ArrowLong } from './icons.jsx'
import './ScrollStage.css'

const CHAPTERS = TOTAL_FRAMES / CHAPTER_FRAMES
const CHAPTER_VH = 145
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

export default function ScrollStage({ framesRef, started }) {
  const reduced = usePrefersReducedMotion()
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const chapterRefs = useRef([])
  const railFillRef = useRef(null)
  const railIndexRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    let raf = 0
    let lastFrame = -1
    let lastChapter = -1
    let redraw = true
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h; redraw = true
      }
    }
    const draw = (index) => {
      const img = resolveFrame(framesRef.current, index)
      if (!img) return
      const cw = canvas.width, ch = canvas.height
      const scale = Math.max(cw / img.width, ch / img.height)
      const w = img.width * scale, h = img.height * scale
      ctx.fillStyle = '#07111c'; ctx.fillRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - w) * (cw / ch < 1.1 ? 0.66 : 0.5), (ch - h) / 2, w, h)
    }
    const render = () => {
      raf = requestAnimationFrame(render)
      const travel = stage.offsetHeight - window.innerHeight
      const p = travel > 0 ? clamp(-stage.getBoundingClientRect().top, 0, travel) / travel : 0
      const frame = Math.round(p * (TOTAL_FRAMES - 1))
      if (frame !== lastFrame || redraw) { draw(frame); lastFrame = frame; redraw = false }
      const scaled = p * CHAPTERS
      const active = Math.min(CHAPTERS - 1, Math.floor(scaled))
      chapterRefs.current.forEach((el, i) => {
        if (!el) return
        const lp = clamp(scaled - i, 0, 1)
        const fadeIn = i === 0 ? 1 : clamp(lp / 0.18, 0, 1)
        const opacity = Math.min(fadeIn, clamp((1 - lp) / 0.2, 0, 1))
        el.style.opacity = opacity.toFixed(3)
        el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'
        if (!reduced) el.style.transform = `translate3d(0,${((1 - fadeIn) - (1 - clamp((1 - lp) / 0.2, 0, 1))) * 32}px,0)`
      })
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
      if (railFillRef.current) railFillRef.current.style.transform = `scaleX(${p})`
      if (active !== lastChapter) {
        lastChapter = active
        if (railIndexRef.current) railIndexRef.current.textContent = String(active + 1).padStart(2, '0')
        stage.dataset.chapter = String(active + 1)
      }
    }
    const resize = () => { size(); redraw = true }
    size(); window.addEventListener('resize', resize); raf = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [framesRef, reduced])
  useEffect(() => { if (started) window.dispatchEvent(new Event('resize')) }, [started])
  const setChapter = (i) => (el) => { chapterRefs.current[i] = el }
  return <section className="stage" ref={stageRef} data-chapter="1" style={{ height: `${CHAPTERS * CHAPTER_VH}vh` }} aria-label="RinkKit hockey gear bag">
    <div className="stage__pin"><canvas className="stage__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="stage__progress" aria-hidden="true"><span ref={progressRef} /></div>
      <article className="chapter chapter--hero" ref={setChapter(0)}><div className="chapter__inner">
        <p className="hero__eyebrow"><i className="hero__eyebrow-rule" /><span>Made for the rink</span></p>
        <h1 className="hero__title"><span>One bag.</span><span>All your gear.</span></h1>
        <p className="hero__lede">A hockey gear bag with built-in stick holders, designed to make the trip from car to locker room easier.</p>
        <ul className="hero__features"><li><span className="hero__feature-icon">01</span><div><h2>Sticks stay with you</h2><p>Integrated holders keep sticks together with the rest of your gear.</p></div></li><li><span className="hero__feature-icon">02</span><div><h2>One easier carry</h2><p>Bring fewer loose items through the rink and onto the team bus.</p></div></li></ul>
        <div className="hero__actions"><a className="solid-btn hero__cta" href="#featured"><span>Explore the concept</span><ArrowLong className="solid-btn__arrow" /></a><a className="hero__film" href="#atelier"><span>Why we made it</span></a></div>
      </div><p className="hero__cue"><span>Scroll to explore</span><i /></p></article>
      <article className="chapter chapter--seal" ref={setChapter(1)}><div className="chapter__inner"><p className="eyebrow">01 — The carry</p><h2 className="chapter__title"><span>Sticks have</span><span>a place.</span></h2><p className="chapter__body">The team-bus pile makes it easy for sticks to get separated from their owners. RinkKit brings the sticks along with the bag.</p><ul className="spec-chips"><li>Integrated stick holders</li><li>Gear and sticks together</li><li>Made for rink days</li></ul></div></article>
      <article className="chapter chapter--layers" ref={setChapter(2)}><div className="chapter__inner"><p className="eyebrow">02 — Designed around the routine</p><h2 className="chapter__title"><span>From home,</span><span>to the rink.</span></h2><ol className="layer-list"><li><span className="layer-list__no">01</span><span className="layer-list__name">Pack your gear</span><span className="layer-list__meta">Keep the kit in one place</span></li><li><span className="layer-list__no">02</span><span className="layer-list__name">Secure your sticks</span><span className="layer-list__meta">Built-in holders carry them along</span></li><li><span className="layer-list__no">03</span><span className="layer-list__name">Head to the rink</span><span className="layer-list__meta">One simpler trip from car to ice</span></li></ol></div></article>
      <article className="chapter chapter--calibre" ref={setChapter(3)}><div className="chapter__inner"><div className="calibre__head"><p className="eyebrow">03 — Made for hockey families</p><h2 className="chapter__title"><span>More hockey.</span><span>Less juggling.</span></h2></div><p className="chapter__body">For youth players and the people who get them to practice, games, and team travel. A practical gear-carry concept built around a familiar rink-day headache.</p><a className="solid-btn hero__cta" href="mailto:derek.crowe@student.fairfield.edu?subject=RinkKit%20interest"><span>Register your interest</span><ArrowLong className="solid-btn__arrow" /></a></div></article>
      <div className="rail" aria-hidden="true"><span className="rail__index" ref={railIndexRef}>01</span><span className="rail__track"><span className="rail__fill" ref={railFillRef} /></span><span className="rail__total">04</span></div>
    </div></section>
}

