import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Home = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleOrderRedirect = () => {
    if (isLoggedIn) {
      navigate('/menu');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            Craft Your Perfect <span className="highlight-text">Pizza Slice</span>
          </h1>
          <p className="subtitle">
            Fresh ingredients, unlimited customizations, and sizzling flavors delivered straight to your doorstep.
          </p>
          <button className="cta-button" onClick={handleOrderRedirect}>
            {isLoggedIn ? '🍕 Order Now' : '👉 Login to Customize'}
          </button>
        </div>
      </header>

      
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon">🥖</div>
            <h3>Freshly Baked Crust</h3>
            <p>From Classic Thin to Cheese Burst, we serve the finest hand-tossed crusts daily.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🍅</div>
            <h3>Premium Toppings</h3>
            <p>Load your pizza with unlimited farm-fresh veggies and premium toppings like Paneer & Jalapenos.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Super Fast Delivery</h3>
            <p>Hot, fresh, and steaming custom pizza delivered within 30 minutes or it's free.</p>
          </div>

        </div>
      </section>

      
      <footer className="home-footer">
        <p>© 2026 Pizza Slice App. Made with ❤️ for Pizza Lovers.</p>
      </footer>
    </div>
  );
};

export default Home;