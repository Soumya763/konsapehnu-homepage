import { useEffect, useRef, useState } from 'react'
import './App.css'
import heroVideo from './assets/hero-video.mp4'

const INDIA_IMAGE =
  'https://images.unsplash.com/photo-1506629082632-d43afc496550?w=900&q=80'

const tabIconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const IconTabHome = () => (
  <svg {...tabIconProps}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
  </svg>
)

const IconTabWardrobe = () => (
  <svg {...tabIconProps}>
    <path d="M8 4 4 7l2.5 3L8 9v11h8V9l1.5 1L20 7l-4-3-2 2h-4L8 4Z" />
  </svg>
)

const IconTabStyle = () => (
  <svg {...tabIconProps}>
    <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
    <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
  </svg>
)

const IconTabProfile = () => (
  <svg {...tabIconProps}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 20c1.2-3.8 4-5.5 7-5.5s5.8 1.7 7 5.5" />
  </svg>
)

const TAB_ITEMS = [
  { key: 'home', label: 'Today', Icon: IconTabHome },
  { key: 'wardrobe', label: 'Wardrobe', Icon: IconTabWardrobe },
  { key: 'style', label: 'Style', Icon: IconTabStyle },
  { key: 'profile', label: 'Profile', Icon: IconTabProfile },
]

const TabBar = ({ active }) => (
  <div className="mock-tabbar">
    {TAB_ITEMS.map(({ key, label, Icon }) => (
      <span key={key} className={`mock-tab${key === active ? ' active' : ''}`}>
        <Icon />
        <em>{label}</em>
      </span>
    ))}
  </div>
)

const garmentIconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const IconGarmentShirt = () => (
  <svg {...garmentIconProps}>
    <path d="M8.5 4 5 6.5 6.8 9.2 8.5 8v10.5h7V8l1.7 1.2L19 6.5 15.5 4l-1.8 1.5h-3.4L8.5 4Z" />
  </svg>
)

const IconGarmentKurta = () => (
  <svg {...garmentIconProps}>
    <path d="M9 3.2 6.7 5.4 8.3 8l1-.7v13.2h5.4V7.3l1 .7 1.6-2.6L15 3.2l-1.6 1.3h-2.8L9 3.2Z" />
  </svg>
)

const IconGarmentTrouser = () => (
  <svg {...garmentIconProps}>
    <path d="M7.2 3.5h9.6l.6 7-1.7 9.8h-2l-.7-8-.7 8h-2L6.6 10.5l.6-7Z" />
  </svg>
)

const IconGarmentBlazer = () => (
  <svg {...garmentIconProps}>
    <path d="M8.3 4 4.8 6.4 6.2 8.9l2-1.2v12.8h7.6V7.7l2 1.2 1.4-2.5L15.7 4l-1.9 1.4-1.3-1-1 1-1.3-1L8.3 4Z" />
    <path d="M12 12v6" />
  </svg>
)

const IconGarmentShoe = () => (
  <svg {...garmentIconProps}>
    <path d="M3.5 17.2c0-.9.7-1.4 1.6-1.7l4.9-1.6 2.7-2.3c.7-.6 1.7-.8 2.5-.4l3.7 1.6c.7.3 1.1 1 1.1 1.7v1.6c0 1.1-.9 2-2 2H4.7c-.7 0-1.2-.5-1.2-1.2Z" />
    <path d="M9 13.6v-3.4" />
  </svg>
)

const IconGarmentEthnic = () => (
  <svg {...garmentIconProps}>
    <path d="M9.2 3.6 7.3 5.8l1.3 1.5.6-.4v12.4h5.6V6.9l.6.4 1.3-1.5-1.9-2.2-1.3 1h-2.6l-1.3-1Z" />
    <path d="M12 4v3.2" />
  </svg>
)

const GARMENT_ICONS = [
  { match: /kurta/i, Icon: IconGarmentKurta },
  { match: /shirt/i, Icon: IconGarmentShirt },
  { match: /trouser/i, Icon: IconGarmentTrouser },
  { match: /blazer/i, Icon: IconGarmentBlazer },
  { match: /shoe/i, Icon: IconGarmentShoe },
  { match: /ethnic|sherwani|bandhgala/i, Icon: IconGarmentEthnic },
]

const getGarmentIcon = (label) =>
  (GARMENT_ICONS.find(({ match }) => match.test(label)) || GARMENT_ICONS[1]).Icon

const GarmentLabel = ({ label }) => {
  const Icon = getGarmentIcon(label)

  return (
    <span className="mock-label-row">
      <Icon />
      <span>{label}</span>
    </span>
  )
}

const GarmentIcon = ({ label }) => {
  const Icon = getGarmentIcon(label)
  return <Icon />
}

const PhoneMockup = ({ children, activeTab }) => (
  <div className="phone-mockup">
    <div className="phone-notch" />
    <div className="phone-status">
      <span>9:41</span>
      <span>●●●</span>
    </div>
    <div className="phone-screen">
      {children}
    </div>
    <TabBar active={activeTab} />
  </div>
)

const MockupWardrobe = () => (
  <>
    <div className="mock-header-row">
      <p className="mock-topbar">Your Wardrobe</p>
      <span className="mock-badge">48</span>
    </div>
    <div className="mock-grid">
      {['Kurta', 'Shirt', 'Trouser', 'Blazer', 'Shoes', 'Ethnic'].map((label) => (
        <div className="mock-item" key={label}>
          <span className="mock-block">
            <GarmentIcon label={label} />
          </span>
          <GarmentLabel label={label} />
        </div>
      ))}
    </div>
  </>
)

const MockupStyling = () => (
  <>
    <div className="mock-header-row">
      <p className="mock-topbar">Today's Outfit</p>
      <span className="mock-subtitle">Office · 24°C</span>
    </div>
    <div className="mock-stack">
      {['Navy Blazer', 'White Shirt', 'Dark Trousers'].map((label) => (
        <div className="mock-row-item" key={label}>
          <span className="mock-block">
            <GarmentIcon label={label} />
          </span>
          <GarmentLabel label={label} />
        </div>
      ))}
    </div>
    <span className="mock-cta">Create Outfit</span>
  </>
)

const MockupOccasion = () => (
  <>
    <div className="mock-chips">
      <span className="mock-chip active">Wedding</span>
      <span className="mock-chip">Festival</span>
      <span className="mock-chip">Office</span>
    </div>
    <p className="mock-subtitle">12 outfits for Wedding</p>
    <div className="mock-pair">
      <div className="mock-item">
        <span className="mock-block mock-block-tall">
          <GarmentIcon label="Sherwani" />
        </span>
        <GarmentLabel label="Sherwani" />
      </div>
      <div className="mock-item">
        <span className="mock-block mock-block-tall">
          <GarmentIcon label="Bandhgala" />
        </span>
        <GarmentLabel label="Bandhgala" />
      </div>
    </div>
  </>
)

const MockupWeather = () => (
  <>
    <div className="mock-header-row">
      <span className="mock-weather">
        <span className="mock-weather-icon">☀</span>
        <span className="mock-weather-temp">28°</span>
      </span>
      <span className="mock-subtitle">Mumbai</span>
    </div>
    <p className="mock-topbar">Light fabrics recommended</p>
    <div className="mock-stack">
      {['Linen Shirt', 'Cotton Trousers'].map((label) => (
        <div className="mock-row-item" key={label}>
          <span className="mock-block">
            <GarmentIcon label={label} />
          </span>
          <GarmentLabel label={label} />
        </div>
      ))}
    </div>
  </>
)

const MockupCombos = () => (
  <>
    <p className="mock-topbar">3 New Combinations</p>
    {[
      ['Navy', 'White', '92%'],
      ['Beige', 'Black', '88%'],
      ['Grey', 'Maroon', '85%'],
    ].map(([a, b, match]) => (
      <div className="mock-combo" key={a + b}>
        <span className="mock-block">
          <GarmentIcon label="Shirt" />
        </span>
        <span className="mock-plus">+</span>
        <span className="mock-block">
          <GarmentIcon label="Trouser" />
        </span>
        <span className="mock-match">{match}</span>
      </div>
    ))}
  </>
)

const MockupChat = () => (
  <>
    <div className="mock-status-row">
      <span className="mock-dot" />
      <p className="mock-topbar">AI Stylist</p>
    </div>
    <p className="mock-bubble mock-bubble-user">
      What should I wear tonight?
    </p>
    <p className="mock-bubble mock-bubble-ai">
      Try your navy kurta with white pants.
    </p>
    <p className="mock-bubble mock-bubble-user">
      For a dinner or festival?
    </p>
    <span className="mock-input">Ask a style question…</span>
  </>
)

const FEATURES = [
  {
    number: '01',
    lines: ['AI', 'Wardrobe'],
    description: 'Turn your existing clothes into a smart digital wardrobe.',
    Mockup: MockupWardrobe,
    tab: 'wardrobe',
  },
  {
    number: '02',
    lines: ['Personalized', 'Styling'],
    description: 'Get outfit suggestions that match your style, preferences and wardrobe.',
    Mockup: MockupStyling,
    tab: 'style',
  },
  {
    number: '03',
    lines: ['Indian Occasion', 'Styling'],
    description: 'Dress confidently for weddings, festivals, office, dates and celebrations.',
    Mockup: MockupOccasion,
    tab: 'style',
  },
  {
    number: '04',
    lines: ['Weather', 'Aware'],
    description: 'Get recommendations that make sense for your day, location and weather.',
    Mockup: MockupWeather,
    tab: 'home',
  },
  {
    number: '05',
    lines: ['Smart', 'Combinations'],
    description: 'Discover new combinations from clothes you already own.',
    Mockup: MockupCombos,
    tab: 'wardrobe',
  },
  {
    number: '06',
    lines: ['AI', 'Stylist'],
    description: 'A personal styling assistant available whenever you need it.',
    Mockup: MockupChat,
    tab: 'profile',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const featureTrackRef = useRef(null)

  const scrollFeatures = (direction) => {
    const track = featureTrackRef.current
    if (!track) return

    const card = track.querySelector('.feature-card')
    const step = card ? card.getBoundingClientRect().width + 20 : 300

    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  useEffect(() => {
    const track = featureTrackRef.current
    if (!track) return

    let isDown = false
    let startX = 0
    let startScroll = 0

    const onPointerDown = (event) => {
      isDown = true
      track.classList.add('dragging')
      startX = event.pageX
      startScroll = track.scrollLeft
    }

    const onPointerMove = (event) => {
      if (!isDown) return
      track.scrollLeft = startScroll - (event.pageX - startX)
    }

    const stopDrag = () => {
      isDown = false
      track.classList.remove('dragging')
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', stopDrag)
    track.addEventListener('pointerleave', stopDrag)

    return () => {
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', stopDrag)
      track.removeEventListener('pointerleave', stopDrag)
    }
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const openModal = () => {
    setModalOpen(true)
    setMenuOpen(false)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="site">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <a href="#top" className="brand" aria-label="Konsa Pehnu home" style={{ textTransform: "none" }}>
          Konsa Pehnu<span>?</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>

          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </a>

          <a
            href="#plans"
            onClick={() => setMenuOpen(false)}
          >
            Plans
          </a>

          <button
            className="nav-cta"
            onClick={openModal}
          >
            Interested Now
          </button>
        </nav>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main id="top">

        {/* ================= HERO ================= */}

        <section className="hero-section">

          <div className="hero-content reveal">

            <p className="eyebrow">
              AI STYLING • MADE FOR INDIAN MEN
            </p>

            <h1>
              Your
              <br />
              wardrobe.
              <br />
              <em>Your personal stylist.</em>
            </h1>

            <p className="hero-description">
              Discover better outfits from your own wardrobe,
              designed around your style, lifestyle and the way
              modern Indian men actually dress.
            </p>

            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={openModal}
              >
                Interested Now
                <span>↗</span>
              </button>

              <a
                href="#how-it-works"
                className="secondary-button"
              >
                See how it works
              </a>

            </div>

            <p className="hero-note">
              Built for Indian wardrobes, occasions and everyday life.
            </p>

          </div>

          <div className="hero-visual reveal reveal-delay">

            <div className="image-frame hero-image-frame">

              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Modern Indian men's fashion"
              />

              <div className="image-label">
                <span>01</span>
                <span>YOUR STYLE, REIMAGINED</span>
              </div>

            </div>

            <div className="floating-card">

              <div className="floating-icon">
                ✦
              </div>

              <div>
                <strong>AI Styling</strong>
                <small>Made personal</small>
              </div>

            </div>

          </div>

        </section>

        {/* ================= INTRO ================= */}

        <section className="intro-section reveal">

          <div className="section-number">
            01 — THE IDEA
          </div>

          <div className="intro-content">

            <h2>
              Your clothes already have
              <span> more possibilities.</span>
            </h2>

            <p>
              Konsa Pehnu helps you understand your wardrobe,
              discover better combinations and dress with more
              confidence — without constantly buying something new.
            </p>

          </div>

        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading reveal">

            <div>

              <p className="eyebrow">
                HOW IT WORKS
              </p>

              <h2>
                Simple in.
                <br />
                <em>Stylish out.</em>
              </h2>

            </div>

            <p className="heading-description">
              No complicated styling rules. Just your clothes,
              your preferences and a little AI.
            </p>

          </div>

          <div className="steps">

            <article className="step reveal">

              <span className="step-number">
                01
              </span>

              <div className="step-line" />

              <h3>
                Add Your Wardrobe
              </h3>

              <p>
                Upload your clothes and build your own
                digital wardrobe.
              </p>

            </article>

            <article className="step reveal reveal-delay">

              <span className="step-number">
                02
              </span>

              <div className="step-line" />

              <h3>
                Understand Your Style
              </h3>

              <p>
                Konsa Pehnu learns your preferences,
                wardrobe and lifestyle.
              </p>

            </article>

            <article className="step reveal reveal-delay-2">

              <span className="step-number">
                03
              </span>

              <div className="step-line" />

              <h3>
                Get Your Outfit
              </h3>

              <p>
                Receive personalized recommendations
                for every occasion.
              </p>

            </article>

          </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading reveal">

            <div>

              <p className="eyebrow">
                WHAT YOU GET
              </p>

              <h2>
                More than a
                <br />
                <em>wardrobe.</em>
              </h2>

            </div>

            <p className="heading-description">
              A smarter way to decide what to wear,
              built around the way Indian men actually dress.
            </p>

          </div>

          <div className="feature-carousel">

            <button
              type="button"
              className="carousel-arrow"
              onClick={() => scrollFeatures(-1)}
              aria-label="Previous features"
            >
              ‹
            </button>

            <div className="feature-grid" ref={featureTrackRef}>

            {FEATURES.map(({ number, lines, description, Mockup, tab }, index) => (

              <article
                key={number}
                className={`feature-card reveal${index % 3 !== 0 ? ` reveal-delay${index % 3 === 2 ? '-2' : ''}` : ''}`}
              >

                <div className="feature-card-head">

                  <span className="feature-number">
                    {number}
                  </span>

                  <span className="feature-arrow">
                    ↗
                  </span>

                </div>

                <h3 className="feature-headline">
                  {lines[0]}
                  <br />
                  {lines[1]}
                </h3>

                <div className="feature-visual">
                  <PhoneMockup activeTab={tab}>
                    <Mockup />
                  </PhoneMockup>
                </div>

                <p>
                  {description}
                </p>

              </article>

            ))}

            </div>

            <button
              type="button"
              className="carousel-arrow"
              onClick={() => scrollFeatures(1)}
              aria-label="Next features"
            >
              ›
            </button>

          </div>

        </section>

        {/* ================= INDIA SECTION ================= */}

        <section className="india-section">

          <div className="india-image reveal">

            <img
              src={INDIA_IMAGE}
              alt="Indian men's fashion"
            />

          </div>

          <div className="india-content reveal">

            <p className="eyebrow">
              BUILT FOR INDIA
            </p>

            <h2>
              From office
              <br />
              <em>to shaadi.</em>
            </h2>

            <p>
              Indian men don't dress for just one kind of life.
              Your wardrobe needs to work across workdays,
              weekends, weddings, festivals and everything
              in between.
            </p>

            <div className="occasion-list">

              <span>
                Weddings
              </span>

              <span>
                Festivals
              </span>

              <span>
                Office
              </span>

              <span>
                Date Night
              </span>

              <span>
                Casual
              </span>

              <span>
                Indian + Western
              </span>

            </div>

          </div>

        </section>

        {/* ================= PLANS ================= */}

        <section className="plans-section" id="plans">
  <div className="plans-inner">

    <p className="eyebrow">PLANS</p>

    <h2>
      Dress better.
      <br />
      <em>Every day.</em>
    </h2>

    <p className="plans-description">
      Choose the plan that works best for you.
      Get personalized AI styling built around your wardrobe,
      lifestyle and occasions.
    </p>

    <div className="pricing-card">

      <div className="pricing-header">
        <span className="pricing-label">KONSA PEHNU PREMIUM</span>
        <span className="pricing-badge">BEST VALUE</span>
      </div>

      <div className="price-row">

        <div className="price-option featured">
          <p>YEARLY SUBSCRIPTION</p>

          <h3>
            ₹3,650
            <span>/year</span>
          </h3>

          <small>
            ₹305 / month
          </small>

          <div className="price-note">
            + applicable taxes
          </div>
        </div>

        <div className="price-option">

          <p>MONTHLY SUBSCRIPTION</p>

          <h3>
            ₹400
            <span>/month</span>
          </h3>

          <small>
            15% extra
          </small>

          <div className="price-note">
            Flexible monthly billing
          </div>

        </div>

      </div>

      <div className="plan-divider" />

      <ul className="plan-features">
        <li>✓ Personalized AI styling</li>
        <li>✓ Smart wardrobe recommendations</li>
        <li>✓ Indian occasion styling</li>
        <li>✓ Outfit combinations from your wardrobe</li>
        <li>✓ Weather-aware recommendations</li>
      </ul>

      <button
        className="primary-button"
        onClick={openModal}
      >
        Interested Now
        <span>↗</span>
      </button>

    </div>

  </div>
</section>

        {/* ================= FINAL CTA ================= */}

        <section className="final-section reveal">

          <p className="eyebrow">
            Konsa Pehnu
          </p>

          <h2>
            Ready to
            <br />
            <em>dress smarter?</em>
          </h2>

          <p>
            Your wardrobe has more possibilities than you think.
          </p>

          <button
            className="primary-button"
            onClick={openModal}
          >
            Interested Now
            <span>↗</span>
          </button>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">

          <strong>
            Konsa Pehnu<span>?</span>
          </strong>

          <p>
            AI styling for the modern Indian man.
          </p>

        </div>

        <div className="footer-links">

          <a href="#features">
            Features
          </a>

          <a href="#plans">
            Plans
          </a>

          <a href="#top">
            Back to top ↑
          </a>

        </div>

        <div className="footer-copy">
          © 2026 Konsa Pehnu
        </div>

      </footer>

      {/* ================= INTEREST MODAL ================= */}

      {modalOpen && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {

            if (event.target === event.currentTarget) {
              closeModal()
            }

          }}
        >

          <div className="interest-modal">

            <button
              className="close-button"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            {!submitted ? (

              <>

                <p className="eyebrow">
                  EARLY ACCESS
                </p>

                <h2>
                  Be the first
                  <br />
                  to know.
                </h2>

                <p>
                  Leave your details and we'll let you know
                  when Konsa Pehnu is ready.
                </p>

                <form onSubmit={handleSubmit}>

                  <input
                    type="text"
                    placeholder="Your name"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                  />

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    I'm Interested
                    <span>↗</span>
                  </button>

                </form>

              </>

            ) : (

              <div className="success-message">

                <p className="eyebrow">
                  YOU'RE IN
                </p>

                <h2>
                  Welcome to
                  <br />
                  Konsa Pehnu?
                </h2>

                <p>
                  Thanks for your interest. We'll keep you
                  posted when early access opens.
                </p>

                <button
                  className="primary-button"
                  onClick={closeModal}
                >
                  Done
                  <span>✓</span>
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  )
}

export default App