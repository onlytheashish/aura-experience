
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const ProductScene = lazy(() => import('./components/ProductScene.jsx'))

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    number: '01',
    symbol: '◉',
    title: 'Spatial audio',
    description:
      'A more expansive listening concept, designed to bring depth and detail to your everyday sound.',
    caption: 'A WIDER PERSPECTIVE',
  },
  {
    number: '02',
    symbol: '◌',
    title: 'Considered comfort',
    description:
      'An over-ear silhouette shaped around the idea of relaxed, extended listening.',
    caption: 'MADE TO FEEL NATURAL',
  },
  {
    number: '03',
    symbol: '⌁',
    title: 'Intuitive controls',
    description:
      'A focused product concept that keeps the experience simple and the attention on the sound.',
    caption: 'LESS, CONSIDERED',
  },
]

const designDetails = [
  {
    number: 'A',
    title: 'Form follows feeling',
    description:
      'A sculpted over-ear profile gives AURA One its distinctive visual character.',
    tag: 'DESIGN',
  },
  {
    number: 'B',
    title: 'A personal soundscape',
    description:
      'The concept centres on an immersive listening experience that feels personal.',
    tag: 'EXPERIENCE',
  },
  {
    number: 'C',
    title: 'Everyday simplicity',
    description:
      'Clear visual language and considered controls keep the imagined experience uncluttered.',
    tag: 'INTERACTION',
  },
]

function App() {
  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
    active: false,
  })

  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const detailsRef = useRef(null)
  const productVisualRef = useRef(null)
  const [shouldLoadScene, setShouldLoadScene] = useState(false)

  // Load the 3D bundle shortly before the product visual enters the viewport.
  useEffect(() => {
    const element = productVisualRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadScene(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline()

        timeline
          .from('.hero .eyebrow', {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        })
        .from(
          '.hero h1',
          {
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.3',
        )
        .from(
          '.hero-description, .hero-actions',
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=0.35',
          )
      })

      return () => media.revert()
    },
    { scope: heroRef },
  )

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.feature-card', {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.feature-grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
        })
      })

      return () => media.revert()
    },
    { scope: featuresRef },
  )

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.detail-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.detail-grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
        })
      })

      return () => media.revert()
    },
    { scope: detailsRef },
  )

  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    setPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    })
  }

  function handlePointerLeave() {
    setPointer((previous) => ({
      ...previous,
      active: false,
    }))
  }

  return (
    <main className="site-shell" id="main-content">
      <a className="skip-link" href="#home">
        Skip to content
      </a>

      <nav className="navbar" aria-label="Main navigation">
        <a className="logo" href="#home" aria-label="AURA home">
          AURA<span className="logo-dot">.</span>
        </a>

        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#features">Technology</a>
          <a href="#design-details">Design</a>
        </div>

        <a className="nav-button" href="#closing">
          Explore <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="home" ref={heroRef}>
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          A NEW DIMENSION OF SOUND
        </p>

        <h1>
          Hear beyond
          <br />
          <span>the ordinary.</span>
        </h1>

        <p className="hero-description">
          Meet AURA One. Immersive sound, considered design,
          and a listening experience made personal.
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="#product">
            Discover AURA <span aria-hidden="true">↗</span>
          </a>

          <a className="secondary-link" href="#features">
            Explore the experience <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="hero-meta">
          <span>DESIGNED AROUND SOUND</span>
          <span>01 — 03</span>
        </div>
      </section>

      <section className="product-section" id="product">
        <div className="section-heading">
          <p className="eyebrow">01 / THE PRODUCT</p>
          <h2>
            Designed for
            <br />
            <span>immersion.</span>
          </h2>
          <p className="product-description">
            A considered silhouette and an imagined sound experience
            built around the moments that matter to you.
          </p>
        </div>

        <div
          className="product-visual"
          ref={productVisualRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            className="pointer-glow"
            style={{
              left: pointer.x,
              top: pointer.y,
              opacity: pointer.active ? 1 : 0,
            }}
            aria-hidden="true"
          />

          <div className="visual-caption visual-caption-top">
            <span>ENGINEERED FOR IMMERSION</span>
            <span>AO — 001</span>
          </div>

          {shouldLoadScene ? (
            <Suspense
              fallback={
                <div className="scene-loading" role="status">
                  Loading 3D experience…
                </div>
              }
            >
              <ProductScene />
            </Suspense>
          ) : (
            <div className="scene-loading" role="status">
              Preparing 3D experience…
            </div>
          )}

          <p className="product-label">AURA ONE</p>
          <span className="visual-index" aria-hidden="true">01</span>
        </div>

        <div className="product-footer">
          <span>Meet AURA One</span>
          <a href="#design-details">
            Discover the details <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section
        className="technology-section"
        id="features"
        ref={featuresRef}
      >
        <div className="section-heading">
          <p className="eyebrow">02 / THE EXPERIENCE</p>
          <h2>
            Sound that moves
            <br />
            <span>with you.</span>
          </h2>
          <p className="product-description">
            Three ideas shape the AURA One concept: an expansive
            sound experience, considered comfort, and simplicity.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-card-top">
                <span className="feature-number">{feature.number}</span>
                <span className="feature-symbol" aria-hidden="true">
                  {feature.symbol}
                </span>
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-caption">{feature.caption}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="design-section"
        id="design-details"
        ref={detailsRef}
      >
        <div className="section-heading">
          <p className="eyebrow">03 / THE DESIGN PHILOSOPHY</p>
          <h2>
            Nothing extra.
            <br />
            <span>Nothing overlooked.</span>
          </h2>
          <p className="product-description">
            The AURA One concept starts with a simple question:
            how can a listening product feel more considered?
          </p>
        </div>

        <div className="detail-grid">
          {designDetails.map((detail) => (
            <article className="detail-card" key={detail.number}>
              <div className="detail-card-top">
                <span className="detail-letter">{detail.number}</span>
                <span className="detail-tag">{detail.tag}</span>
              </div>

              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
              <div className="detail-line" aria-hidden="true" />
            </article>
          ))}
        </div>

        <p className="concept-note">
          AURA One is a fictional product concept created for this
          interactive web experience. Descriptions express design
          intent, not verified hardware specifications.
        </p>
      </section>

      <section className="closing-section" id="closing">
        <p className="eyebrow">AURA ONE / A LISTENING CONCEPT</p>
        <h2>
          Find your
          <br />
          <span>own frequency.</span>
        </h2>
        <p className="closing-description">
          A different perspective on the way you experience sound.
        </p>
        <a className="primary-button" href="#product">
          Experience AURA <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="site-footer" id="support">
        <a className="logo" href="#home">
          AURA<span className="logo-dot">.</span>
        </a>

        <p>Thoughtfully designed for the way you listen.</p>

        <a className="footer-link" href="#home">
          Back to top ↑
        </a>

        <span className="footer-copyright">
          © {new Date().getFullYear()} AURA. Concept project.
        </span>
      </footer>
    </main>
  )
}

export default App
