import { useEffect, useRef, useState } from 'react'
import {
  ATELIER_FRAMES,
  ATELIER_CHAPTER_FRAMES,
  useFrameSequence,
  resolveFrame,
} from '../hooks/useFrameSequence'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ArrowLong } from './icons.jsx'
import './AtelierStage.css'

const CHAPTERS = ATELIER_FRAMES / ATELIER_CHAPTER_FRAMES // 2
/* Shorter than the hero stage per chapter: this clip is a slow push-in, so a
   long rail would read as nothing happening. */
const CHAPTER_VH = 160

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

const STEPS = [
  { no: '01', name: 'Pack', meta: 'Bring your gear together in one bag' },
  { no: '02', name: 'Secure', meta: 'Set your sticks in the built-in holders' },
  { no: '03', name: 'Go play', meta: 'Head from home to the rink with less to juggle' },
]

export default function AtelierStage() {
  const reduced = usePrefersReducedMotion()
  const [armed, setArmed] = useState(false)

  const { framesRef } = useFrameSequence({
    dir: 'atelier',
    total: ATELIER_FRAMES,
    enabled: armed,
  })

  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const chapterRefs = useRef([])
  const barRef = useRef(null)

  /* Don't pull 6MB of frames on first paint - start once the section is within
     roughly a viewport and a half of the fold. */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || armed) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true)
          io.disconnect()
        }
      },
      { rootMargin: '150% 0px' },
    )
    io.observe(stage)
    return () => io.disconnect()
  }, [armed])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    let raf = 0
    let lastFrame = -1
    let needsRedraw = true

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        needsRedraw = true
      }
    }

    const draw = (index) => {
      const img = resolveFrame(framesRef.current, index)
      if (!img) return
      const cw = canvas.width
      const ch = canvas.height
      // the movement sits centre-left and the hand enters top-right, so on
      // portrait viewports hold the left of frame rather than the centre
      const focusX = cw / ch < 1.1 ? 0.38 : 0.5
      const scale = Math.max(cw / img.width, ch / img.height)
      const w = img.width * scale
      const h = img.height * scale
      ctx.fillStyle = '#07111c'
      ctx.fillRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - w) * focusX, (ch - h) / 2, w, h)
    }

    const render = () => {
      raf = requestAnimationFrame(render)

      const travel = stage.offsetHeight - window.innerHeight
      const scrolled = clamp(-stage.getBoundingClientRect().top, 0, travel)
      const p = travel > 0 ? scrolled / travel : 0

      const frame = Math.min(
        ATELIER_FRAMES - 1,
        Math.round(p * (ATELIER_FRAMES - 1)),
      )
      if (frame !== lastFrame || needsRedraw) {
        draw(frame)
        lastFrame = frame
        needsRedraw = false
      }

      const scaled = p * CHAPTERS
      chapterRefs.current.forEach((el, i) => {
        if (!el) return
        const lp = clamp(scaled - i, 0, 1)
        // chapter 01 is already up when the section arrives
        const fadeIn = i === 0 ? 1 : clamp(lp / 0.22, 0, 1)
        const fadeOut = clamp((1 - lp) / 0.22, 0, 1)
        const opacity = Math.min(fadeIn, fadeOut)
        el.style.opacity = opacity.toFixed(3)
        el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'
        if (!reduced) {
          const rise = (1 - easeOut(fadeIn)) * 34 - (1 - easeOut(fadeOut)) * 34
          el.style.transform = 'translate3d(0,' + rise.toFixed(2) + 'px,0)'
        }
      })

      if (barRef.current) {
        barRef.current.style.transform = 'scaleX(' + p.toFixed(4) + ')'
      }
    }

    const onResize = () => {
      sizeCanvas()
      needsRedraw = true
    }

    sizeCanvas()
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [framesRef, reduced])

  const setChapter = (i) => (el) => {
    chapterRefs.current[i] = el
  }

  return (
    <section
      className="atelier"
      id="atelier"
      ref={stageRef}
      style={{ height: CHAPTERS * CHAPTER_VH + 'vh' }}
      aria-label="The RinkKit idea"
    >
      <div className="atelier__pin">
        <canvas className="atelier__canvas" ref={canvasRef} aria-hidden="true" />

        {/* ----------------------------- 01 - CREED ---------------------- */}
        <article className="a-chapter a-chapter--creed" ref={setChapter(0)}>
          <div className="a-chapter__inner">
            <h2 className="atelier__title">
              <span>Rink days</span>
              <span>start before</span>
              <span>you hit the</span>
              <span>ice.</span>
            </h2>
            <a className="ghost-btn atelier__cta" href="#collection">
              <span>Explore the bag</span>
              <ArrowLong className="ghost-btn__arrow" />
            </a>
          </div>
        </article>

        {/* ----------------------------- 02 - THE BENCH ------------------ */}
        <article className="a-chapter a-chapter--bench" ref={setChapter(1)}>
          <div className="a-chapter__inner">
            <p className="eyebrow">A simpler rink routine</p>
            <h2 className="atelier__title atelier__title--sm">
              <span>Keep gear and sticks</span>
              <span>together on the go.</span>
            </h2>
            <ol className="bench-list">
              {STEPS.map((step) => (
                <li key={step.no}>
                  <span className="bench-list__no">{step.no}</span>
                  <span className="bench-list__text">
                    <strong>{step.name}</strong>
                    <small>{step.meta}</small>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </article>

        <div className="atelier__progress" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  )
}

