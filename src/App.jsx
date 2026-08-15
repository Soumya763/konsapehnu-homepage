import { useEffect, useState } from 'react'
import './App.css'

const HERO_IMAGE =
   'https://d12d6l12s3d372.cloudfront.net/Tasva_21_12_233514_91c4ffbcd2.jpg'
   
const INDIA_IMAGE =
  'https://www.creaseindia.com/cdn/shop/files/peach-indo-western-outfit-for-men-indian-ethnicwear.jpg?v=1742020209&width=1100'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
        <a href="#top" className="brand" aria-label="Kaunsa Pehnu home" style={{ textTransform: "none" }}>
          Kaunsa Pehnu<span>?</span>
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

              <img
                src={HERO_IMAGE}
                alt="Modern Indian men's fashion"
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
              Kaunsa Pehnu helps you understand your wardrobe,
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
                Kaunsa Pehnu learns your preferences,
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

          <div className="feature-grid">

            <article className="feature-card reveal">

              <span className="feature-number">
                01
              </span>

              <span className="feature-arrow">
                ↗
              </span>

              <h3>
                AI Wardrobe
              </h3>

              <p>
                Turn your existing clothes into a smart
                digital wardrobe.
              </p>

            </article>

            <article className="feature-card reveal reveal-delay">

              <span className="feature-number">
                02
              </span>

              <span className="feature-arrow">
                ↗
              </span>

              <h3>
                Personalized Styling
              </h3>

              <p>
                Get outfit suggestions that match your
                style, preferences and wardrobe.
              </p>

            </article>

            <article className="feature-card reveal reveal-delay-2">

              <span className="feature-number">
                03
              </span>

              <span className="feature-arrow">
                ↗
              </span>

              <h3>
                Indian Occasion Styling
              </h3>

              <p>
                Dress confidently for weddings, festivals,
                office, dates and celebrations.
              </p>

            </article>

            <article className="feature-card reveal">

              <span className="feature-number">
                04
              </span>

              <span className="feature-arrow">
                ↗
              </span>

              <h3>
                Weather-Aware
              </h3>

              <p>
                Get recommendations that make sense for
                your day, location and weather.
              </p>

            </article>

            <article className="feature-card reveal reveal-delay">

              <span className="feature-number">
                05
              </span>

              <span className="feature-arrow">
                ↗
              </span>

              <h3>
                Smart Combinations
              </h3>

              <p>
                Discover new combinations from clothes
                you already own.
              </p>

            </article>

            <article className="feature-card reveal reveal-delay-2">

              <span className="feature-number">
                06
              </span>

              <span className="feature-arrow">
                ↗
              </span>

              <h3>
                AI Stylist
              </h3>

              <p>
                A personal styling assistant available
                whenever you need it.
              </p>

            </article>

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
        <span className="pricing-label">KAUNSA PEHNU PREMIUM</span>
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
            Kaunsa Pehnu
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
            Kaunsa Pehnu<span>?</span>
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
          © 2026 Kaunsa Pehnu
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
                  when Kaunsa Pehnu is ready.
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
                  Kaunsa Pehnu?
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