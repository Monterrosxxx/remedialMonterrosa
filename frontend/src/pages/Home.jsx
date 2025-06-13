import React, { useState, useEffect } from 'react';
import "../styles/Home.css"; 

const Home = ({ currentPage, setCurrentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const slides = [
    {
      title: "Bienvenido al Casino Colonial",
      subtitle: "El mejor casino de El Salvador",
      description: "Te esperamos las 24 horas del día, todos los días del año",
      image: "🎰"
    },
    {
      title: "Premios Increíbles",
      subtitle: "Grandes jackpots te esperan",
      description: "Miles de dólares en premios cada día",
      image: "💰"
    },
    {
      title: "Entretenimiento Único",
      subtitle: "Música en vivo y el mejor ambiente",
      description: "Shows especiales y eventos exclusivos",
      image: "🎵"
    }
  ];

  const features = [
    {
      icon: "🎲",
      title: "Juegos Premium",
      description: "La más amplia selección de juegos de casino con la mejor tecnología"
    },
    {
      icon: "🏆",
      title: "Premios Diarios",
      description: "Sorteos y promociones especiales todos los días del año"
    },
    {
      icon: "🎭",
      title: "Shows en Vivo",
      description: "Entretenimiento de primera clase con artistas nacionales e internacionales"
    },
    {
      icon: "🍸",
      title: "Bar Premium",
      description: "Los mejores cócteles y bebidas en un ambiente único y sofisticado"
    },
    {
      icon: "🎊",
      title: "Eventos VIP",
      description: "Noches temáticas y eventos exclusivos para nuestros miembros VIP"
    },
    {
      icon: "🌟",
      title: "Servicio 24/7",
      description: "Atención personalizada las 24 horas con el mejor servicio al cliente"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🎰</span>
            <span className="logo-text">Casino Colonial</span>
          </div>
          <div className="nav-links">
            <button 
              className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              🏠 Inicio
            </button>
            <button 
              className={`nav-btn ${currentPage === 'clients' ? 'active' : ''}`}
              onClick={() => setCurrentPage('clients')}
            >
              👥 Clientes
            </button>
            <button 
              className={`nav-btn ${currentPage === 'games' ? 'active' : ''}`}
              onClick={() => setCurrentPage('games')}
            >
              🎮 Juegos
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="floating-cards">
          <div className="card card-1">♠️</div>
          <div className="card card-2">♥️</div>
          <div className="card card-3">♦️</div>
          <div className="card card-4">♣️</div>
          <div className="card card-5">🃏</div>
          <div className="card card-6">🎰</div>
        </div>
        
        <div className="hero-content">
          <div className="slide-container">
            <div className="slide active">
              <div className="slide-icon">{slides[currentSlide].image}</div>
              <h1 className="hero-title">{slides[currentSlide].title}</h1>
              <h2 className="hero-subtitle">{slides[currentSlide].subtitle}</h2>
              <p className="hero-description">{slides[currentSlide].description}</p>
            </div>
          </div>
          
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          <div className="hero-cta">
            <button className="cta-primary">
              <span>🎯</span>
              ¡Juega Ahora!
            </button>
            <button className="cta-secondary">
              <span>📞</span>
              Contáctanos
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll" id="features-title">
            ¿Por qué elegir Casino Colonial?
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card animate-on-scroll ${isVisible[`feature-${index}`] ? 'visible' : ''}`}
                id={`feature-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-bg"></div>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item animate-on-scroll" id="stat-1">
              <div className="stat-number">10+</div>
              <div className="stat-label">Años de experiencia</div>
            </div>
            <div className="stat-item animate-on-scroll" id="stat-2">
              <div className="stat-number">50k+</div>
              <div className="stat-label">Clientes satisfechos</div>
            </div>
            <div className="stat-item animate-on-scroll" id="stat-3">
              <div className="stat-number">100+</div>
              <div className="stat-label">Juegos disponibles</div>
            </div>
            <div className="stat-item animate-on-scroll" id="stat-4">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Atención al cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Preview */}
      <section className="games-preview">
        <div className="container">
          <h2 className="section-title animate-on-scroll" id="games-title">
            Nuestros Juegos Destacados
          </h2>
          <div className="games-carousel">
            <div className="game-preview-card">
              <div className="game-icon">🎰</div>
              <h3>Slots</h3>
              <p>Las mejores máquinas tragamonedas</p>
            </div>
            <div className="game-preview-card">
              <div className="game-icon">🃏</div>
              <h3>Poker</h3>
              <p>Torneos y mesas VIP</p>
            </div>
            <div className="game-preview-card">
              <div className="game-icon">🎲</div>
              <h3>Ruleta</h3>
              <p>Europea y Americana</p>
            </div>
            <div className="game-preview-card">
              <div className="game-icon">🎯</div>
              <h3>Blackjack</h3>
              <p>El clásico juego de cartas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title">Visítanos Hoy</h2>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Ubicación</h4>
                  <p>San Salvador, El Salvador</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Teléfono</h4>
                  <p>+503 2222-3333</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <h4>Horarios</h4>
                  <p>24 horas, 7 días a la semana</p>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <h3>¿Listo para la experiencia?</h3>
              <p>Únete a miles de jugadores que han elegido Casino Colonial como su destino de entretenimiento favorito.</p>
              <button className="cta-large">
                <span>🎊</span>
                ¡Comienza tu aventura!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon">🎰</span>
              <span className="logo-text">Casino Colonial</span>
            </div>
            <p className="footer-text">
              El destino de entretenimiento más emocionante de El Salvador
            </p>
            <div className="footer-social">
              <span>🌟 Síguenos en redes sociales 🌟</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;