import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import quoteBg from '../assets/quote-bg.jpg'

export default function FeaturedQuote() {
  const { t } = useLanguage()
  const q = t.quote

  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)

  const goTo = useCallback(
    (idx) => {
      if (idx === active || animating) return
      setAnimating(true)
      setTimeout(() => {
        setActive(idx)
        setAnimating(false)
      }, 250)
    },
    [active, animating]
  )

  const nextSlide = useCallback(() => {
    goTo((active + 1) % q.items.length)
  }, [active, goTo, q.items.length])

  const prevSlide = useCallback(() => {
    goTo((active - 1 + q.items.length) % q.items.length)
  }, [active, goTo, q.items.length])

  // Auto-advance every 5 seconds when not hovered/touched
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, isPaused])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (diff > 50) {
      nextSlide() // swiped left
    } else if (diff < -50) {
      prevSlide() // swiped right
    }
    touchStartX.current = null
  }

  return (
    <section className="section relative overflow-hidden bg-navy-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${quoteBg})` }}
      />
      {/* Dark gradient overlay with slight blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/75 to-navy-900/90 backdrop-blur-[2px]" />

      <div className="section-inner relative z-10 max-w-4xl mx-auto px-4">
        {/* Frosted Glass Editorial Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-2xl bg-navy-900/80 backdrop-blur-md border border-white/15 px-5 py-7 sm:px-10 sm:py-8 md:px-14 md:py-9 shadow-2xl flex flex-col items-center text-center"
        >
          {/* Eyebrow badge */}
          <span className="eyebrow text-gold-light mb-2">
            {q.eyebrow}
          </span>

          {/* Decorative Quote Icon & 5 Stars */}
          <div className="flex flex-col items-center gap-1.5 mb-3">
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-gold-light/70"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <div className="flex gap-1 text-gold-light">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 100.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Quote text display area with consistent min-height */}
          <div className="relative w-full min-h-[5rem] sm:min-h-[4.5rem] md:min-h-[4rem] flex items-center justify-center">
            <blockquote
              className="font-display text-base sm:text-lg md:text-xl text-paper font-semibold leading-relaxed transition-all duration-300 max-w-2xl"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'scale(0.98) translateY(4px)' : 'scale(1) translateY(0)',
              }}
            >
              {q.items[active]}
            </blockquote>
          </div>

          {/* Interactive Controls: Previous / Dots / Next */}
          <div className="flex items-center justify-center gap-5 mt-5">
            {/* Left arrow */}
            <button
              onClick={prevSlide}
              aria-label="Previous quote"
              className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-paper flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-base"
            >
              ‹
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {q.items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'bg-gold-light w-8 h-2.5 shadow-md'
                      : 'bg-white/30 hover:bg-white/60 w-2.5 h-2.5'
                  }`}
                />
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={nextSlide}
              aria-label="Next quote"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-paper flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-lg"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
