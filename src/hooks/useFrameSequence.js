import { useEffect, useRef, useState } from 'react'

/**
 * Loads an exported frame sequence into an array of decoded <img> elements so a
 * canvas can scrub through them at scroll speed.
 *
 * Loading happens in two passes:
 *   1. a coarse pass over every Nth frame, so the sequence becomes scrubbable
 *      (if chunky) almost immediately;
 *   2. a fill pass over everything else.
 * Both passes run through a small connection pool - firing every request at
 * once just queues them in the browser and delays the coarse pass we want
 * first.
 */

export const FPS = 1

/* the hero clip: 240 frames at 24fps (10.005s), four 60-frame / 2.5s chapters */
export const TOTAL_FRAMES = 4
export const CHAPTER_FRAMES = 1

/* the atelier clip: the same 10.005s sampled at 12fps, since it is a slow
   push-in and scrubbing is driven by scroll position rather than time - two
   60-frame / 5s chapters */
export const ATELIER_FRAMES = 2
export const ATELIER_CHAPTER_FRAMES = 1

const COARSE_STRIDE = 6
const POOL_SIZE = 12

export const frameUrl = (i, dir = 'frames') =>
  `${import.meta.env.BASE_URL}${dir}/frame_${String(i).padStart(4, '0')}.svg`

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    // resolve on error too - one missing frame must not stall the preloader
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

export function useFrameSequence({
  dir = 'frames',
  total = TOTAL_FRAMES,
  enabled = true,
} = {}) {
  const framesRef = useRef(new Array(total).fill(null))
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    let settled = 0

    // coarse pass first, then everything we skipped
    const coarse = []
    const fill = []
    for (let i = 0; i < total; i += 1) {
      ;(i % COARSE_STRIDE === 0 ? coarse : fill).push(i)
    }
    const queue = [...coarse, ...fill]

    let cursor = 0
    const worker = async () => {
      while (!cancelled && cursor < queue.length) {
        const index = queue[cursor]
        cursor += 1
        const img = await loadImage(frameUrl(index, dir))
        if (cancelled) return
        framesRef.current[index] = img
        settled += 1
        setProgress(settled / total)
      }
    }

    Promise.all(Array.from({ length: POOL_SIZE }, worker)).then(() => {
      if (!cancelled) setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [dir, total, enabled])

  return { framesRef, progress, ready }
}

/**
 * Nearest already-decoded frame at or before `index`, so a scrub during the
 * fill pass shows the closest coarse frame instead of going black.
 */
export function resolveFrame(frames, index) {
  const exact = frames[index]
  if (exact) return exact
  for (let d = 1; d < frames.length; d += 1) {
    const before = frames[index - d]
    if (before) return before
    const after = frames[index + d]
    if (after) return after
  }
  return null
}
