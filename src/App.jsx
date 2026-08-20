import { useEffect, useRef, useState } from 'react'
import './App.css'
import heroVideo from './assets/hero-video.mp4'
import heroPoster from './assets/hero-poster.jpg'
import indiaSectionImage from './assets/india-section.png'
import outfitCasual from './assets/outfit-casual.jpg'
import outfitWeddingGuest from './assets/outfit-wedding-guest.jpg'
import screenWardrobe from './assets/app-screens/wardrobe.png'
import screenTodaysOutfit from './assets/app-screens/todays-outfit.png'
import screenOccasion from './assets/app-screens/occasion.png'
import screenOutfitBuilder from './assets/app-screens/outfit-builder.png'
import screenAiChat from './assets/app-screens/ai-chat.png'

const INDIA_IMAGE = indiaSectionImage

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

const PhoneMockup = ({ children, activeTab, screenshot }) => (
  <div className="phone-mockup">
    <div className="phone-notch" />
    <div className="phone-status">
      <span>9:41</span>
      <span>●●●</span>
    </div>
    <div className="phone-screen">
      {screenshot ? (
        <img alt="" aria-hidden="true" className="phone-screenshot" src={screenshot} />
      ) : (
        children
      )}
    </div>
    <TabBar active={activeTab} />
  </div>
)

const FEATURES = [
  {
    number: '01',
    lines: ['AI', 'Wardrobe'],
    description: 'Turn your existing clothes into a smart digital wardrobe.',
    tab: 'wardrobe',
    screenshot: screenWardrobe,
  },
  {
    number: '02',
    lines: ['Personalized', 'Styling'],
    description: 'Get outfit suggestions that match your style, preferences and wardrobe.',
    tab: 'style',
    screenshot: screenTodaysOutfit,
  },
  {
    number: '03',
    lines: ['Indian Occasion', 'Styling'],
    description: 'Dress confidently for weddings, festivals, office, dates and celebrations.',
    tab: 'style',
    screenshot: screenOccasion,
  },
  {
    number: '04',
    lines: ['Weather', 'Aware'],
    description: 'Get recommendations that make sense for your day, location and weather.',
    tab: 'home',
    screenshot: screenTodaysOutfit,
  },
  {
    number: '05',
    lines: ['Smart', 'Combinations'],
    description: 'Discover new combinations from clothes you already own.',
    tab: 'wardrobe',
    screenshot: screenOutfitBuilder,
  },
  {
    number: '06',
    lines: ['AI', 'Stylist'],
    description: 'A personal styling assistant available whenever you need it.',
    tab: 'profile',
    screenshot: screenAiChat,
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
                poster={heroPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
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
              Your personal stylist, in 3 simple steps.
            </p>

          </div>

          <div className="steps">

            <article className="step reveal">

              <span className="step-number">
                01
              </span>

              <div className="step-line" />

              <span className="step-icon" aria-hidden="true">⊕</span>

              <h3>
                Add Your Wardrobe
              </h3>

              <p>
                Upload photos of your clothes in seconds.
              </p>

            </article>

            <article className="step reveal reveal-delay">

              <span className="step-number">
                02
              </span>

              <div className="step-line" />

              <span className="step-icon" aria-hidden="true">✦</span>

              <h3>
                Get AI Outfit Ideas
              </h3>

              <p>
                AI creates stylish outfit combinations just for you.
              </p>

            </article>

            <article className="step reveal reveal-delay-2">

              <span className="step-number">
                03
              </span>

              <div className="step-line" />

              <span className="step-icon" aria-hidden="true">✓</span>

              <h3>
                Wear with Confidence
              </h3>

              <p>
                Look good, feel great, every single day.
              </p>

            </article>

          </div>

          <p className="how-footnote reveal">
            One wardrobe. Many ways to wear it.
          </p>

        </section>

        {/* ================= OUTFIT INSPIRATION ================= */}

        <section className="outfit-section">

          <div className="section-heading reveal">

            <div>

              <p className="eyebrow">
                OUTFIT INSPIRATION
              </p>

              <h2>
                Real outfits. Real men.
                <br />
                <em>Ideas you can actually wear.</em>
              </h2>

            </div>

            <p className="heading-description">
              From everyday casual to wedding-ready, discover outfit
              combinations made for real occasions and real wardrobes.
            </p>

          </div>

          <div className="outfit-grid">

            <article className="outfit-card reveal">
              <div className="image-frame outfit-image-frame">
                <img
                  src={outfitCasual}
                  alt="Casual outfit for everyday wear"
                />
              </div>
              <span className="section-number">01 — CASUAL</span>
              <p>
                Easy layers, relaxed fits and everyday pieces that
                already belong in your wardrobe. See how simple
                combinations can look effortlessly put together.
              </p>
            </article>

            <article className="outfit-card reveal reveal-delay">
              <div className="image-frame outfit-image-frame">
                <img
                  src={outfitWeddingGuest}
                  alt="Wedding guest outfit, festive Indian wear"
                />
              </div>
              <span className="section-number">02 — WEDDING GUEST</span>
              <p>
                Dress up without starting from scratch. Discover
                polished combinations that make the most of what you
                already own, from subtle details to occasion-ready layers.
              </p>
            </article>

          </div>

        </section>

        {/* ================= WHY YOU'LL LOVE IT ================= */}

        <section
          className="how-section love-section"
          id="why-love-it"
        >

          <div className="section-heading reveal">

            <div>

              <p className="eyebrow">
                WHY YOU'LL LOVE IT
              </p>

              <h2>
                Made to fit
                <br />
                <em>your life.</em>
              </h2>

            </div>

          </div>

          <div className="steps love-grid">

            <article className="step love-item reveal">

              <span className="step-number love-icon" aria-hidden="true">
                ↺
              </span>

              <div className="step-line" />

              <h3>
                Use What You Own
              </h3>

              <p>
                Get the most out of your existing wardrobe.
              </p>

            </article>

            <article className="step love-item reveal reveal-delay">

              <span className="step-number love-icon" aria-hidden="true">
                ◆
              </span>

              <div className="step-line" />

              <h3>
                Outfits for Every Occasion
              </h3>

              <p>
                From casual hangouts to weddings, we've got you.
              </p>

            </article>

            <article className="step love-item reveal reveal-delay-2">

              <span className="step-number love-icon" aria-hidden="true">
                ✦
              </span>

              <div className="step-line" />

              <h3>
                Personalized for You
              </h3>

              <p>
                Based on your style, body type &amp; lifestyle.
              </p>

            </article>

            <article className="step love-item reveal reveal-delay-2">

              <span className="step-number love-icon" aria-hidden="true">
                ◇
              </span>

              <div className="step-line" />

              <h3>
                Save Time &amp; Money
              </h3>

              <p>
                No more overthinking or impulse shopping.
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

            {FEATURES.map(({ number, lines, description, tab, screenshot }, index) => (

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
                  <PhoneMockup activeTab={tab} screenshot={screenshot} />
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

        {/* ================= ASK YOUR STYLIST ================= */}

        <section className="stylist-section">

          <div className="stylist-content reveal">

            <p className="eyebrow">
              AI STYLIST
            </p>

            <h2>
              Ask your stylist
              <br />
              <em>anything.</em>
            </h2>

            <p>
              Tell Konsa Pehnu where you're going, what you're
              wearing, or what you want to style — and get
              personalized outfit ideas from your own wardrobe.
            </p>

          </div>

          <div className="stylist-prompts">

            <div className="prompt-bubble reveal">
              What should I wear to a friend's wedding?
            </div>

            <div className="prompt-bubble reveal reveal-delay">
              Style my beige trousers three different ways.
            </div>

            <div className="prompt-bubble reveal reveal-delay-2">
              Smart-casual look for a 32°C office day?
            </div>

            <div className="prompt-bubble reveal reveal-delay-2">
              Help me dress for Diwali.
            </div>

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
                <span className="occasion-icon" aria-hidden="true">✦</span>
                Weddings
              </span>

              <span>
                <span className="occasion-icon" aria-hidden="true">◆</span>
                Festivals
              </span>

              <span>
                <span className="occasion-icon" aria-hidden="true">✓</span>
                Office
              </span>

              <span>
                <span className="occasion-icon" aria-hidden="true">♥</span>
                Date Night
              </span>

              <span>
                <span className="occasion-icon" aria-hidden="true">⊕</span>
                Casual
              </span>

              <span>
                <span className="occasion-icon" aria-hidden="true">↗</span>
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

        {/* ================= COMING NEXT ================= */}

        <section className="roadmap-section">

          <div className="section-heading reveal">

            <div>

              <p className="eyebrow">
                COMING NEXT
              </p>

              <h2>
                Always getting
                <br />
                <em>smarter.</em>
              </h2>

            </div>

            <p className="heading-description">
              Konsa Pehnu keeps learning. Here's what we're building next.
            </p>

          </div>

          <div className="roadmap-grid">

            <article className="roadmap-item reveal">
              <span className="roadmap-tag">Coming Soon</span>
              <span className="step-icon" aria-hidden="true">👁</span>
              <h3>Virtual Try-On</h3>
              <p>See how an outfit looks on you before you wear it.</p>
            </article>

            <article className="roadmap-item reveal reveal-delay">
              <span className="roadmap-tag">Coming Soon</span>
              <span className="step-icon" aria-hidden="true">◆</span>
              <h3>Wardrobe Insights</h3>
              <p>Most-worn pieces, wardrobe gaps and cost-per-wear.</p>
            </article>

            <article className="roadmap-item reveal reveal-delay-2">
              <span className="roadmap-tag">Coming Soon</span>
              <span className="step-icon" aria-hidden="true">▦</span>
              <h3>Outfit Planning</h3>
              <p>Plan what you'll wear for the days ahead, in advance.</p>
            </article>

            <article className="roadmap-item reveal reveal-delay-2">
              <span className="roadmap-tag">Coming Soon</span>
              <span className="step-icon" aria-hidden="true">✦</span>
              <h3>Style Memory</h3>
              <p>Gets to know your preferences better over time.</p>
            </article>

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