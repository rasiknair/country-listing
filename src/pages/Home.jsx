import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/countriesSlice";
import "../styles/Home.css";
import { FaBars, FaArrowLeft, FaArrowRight, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.countries);

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleRows, setVisibleRows] = useState(6); 

  useEffect(() => {
    dispatch(fetchCountries()); 
  }, [dispatch]);

  const totalSlides = 5;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setMenuOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const loadMoreRows = () => {
    setVisibleRows((prev) => prev + 6); //
  };

  const filteredCountries = data.filter((country) => {
    if (selectedTab === "All") {
      return country.region === "Asia" || country.region === "Europe";
    }
    return country.region === selectedTab;
  });

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h4 className="logo">Countries</h4>

        {/* Desktop Tabs */}
        <nav className="tabs d-none d-md-flex">
          <span className={`tab ${selectedTab === "All" ? "active" : ""}`} onClick={() => handleTabClick("All")}>
            All
          </span>
          <span className={`tab ${selectedTab === "Asia" ? "active" : ""}`} onClick={() => handleTabClick("Asia")}>
            Asia
          </span>
          <span className={`tab ${selectedTab === "Europe" ? "active" : ""}`} onClick={() => handleTabClick("Europe")}>
            Europe
          </span>
        </nav>

        {/* Hamburger Menu */}
        <div className="d-md-none">
          <FaBars className="hamburger-menu" onClick={() => setMenuOpen(true)} />
        </div>
      </header>

      {/* Drawer Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
          <div className="menu-content"
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "250px",
                height: "100vh",
                background: "white",
                padding: "20px",
                boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "15px",
                zIndex: "1000",
            }}
        >
            <span
                className="close-menu"
                onClick={() => setMenuOpen(false)}
                style={{
                fontSize: "22px",
                cursor: "pointer",
                alignSelf: "flex-end",
                marginBottom: "20px",
                }}
            >
                ✖
            </span>

            <span
                className={`menu-item ${selectedTab === "All" ? "active" : ""}`}
                onClick={() => handleTabClick("All")}
                style={{ fontSize: "18px", padding: "10px 0", cursor: "pointer" }}
            >
                All
            </span>

            <span
                className={`menu-item ${selectedTab === "Asia" ? "active" : ""}`}
                onClick={() => handleTabClick("Asia")}
                style={{ fontSize: "18px", padding: "10px 0", cursor: "pointer" }}
            >
                Asia
            </span>

            <span
                className={`menu-item ${selectedTab === "Europe" ? "active" : ""}`}
                onClick={() => handleTabClick("Europe")}
                style={{ fontSize: "18px", padding: "10px 0", cursor: "pointer" }}
            >
                Europe
            </span>
            </div>
        </div>
      )}

      <div className="welcome-section">
        <div className="line top-line"></div>
        <h1 className="welcome-text">WELCOME</h1>
        <div className="line bottom-line"></div>
      </div>

      <div className="content-section">
        <div className="left-box"><div className="slider-container">
            <button className="prev-arrow" onClick={prevSlide}><FaArrowLeft /></button>
            <div className="slider">
              <span>Slide {currentSlide + 1}</span>
            </div>
            <button className="next-arrow" onClick={nextSlide}><FaArrowRight /></button>
          </div>

          <div className="dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <span key={index} className={`dot ${currentSlide === index ? "active" : ""}`} onClick={() => setCurrentSlide(index)}></span>
            ))}
          </div></div>

        <div className="right-box">
          
        </div>
      </div>

      <div className="country-section">
        {loading && <p>Loading...</p>}

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={() => dispatch(fetchCountries())}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <div className="country-grid">
            {filteredCountries.slice(0, visibleRows * 2).map((country, index) => (
              <div key={index} className="country-card">
                <img src={country.flags?.png || ""} alt={country.name.common} className="country-flag" />
                <div className="country-info">
                  <h3>{country.name.common}</h3>
                  <p>{country.region}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && visibleRows * 2 < filteredCountries.length && (
          <button className="load-more" onClick={loadMoreRows}>Load More</button>
        )}
      </div>

      <footer className="footer">
        <div className="social-icons">
          <div className="icon-circle"><FaFacebook /></div>
          <div className="icon-circle"><FaTwitter /></div>
          <div className="icon-circle"><FaLinkedin /></div>
          <div className="icon-circle"><FaYoutube /></div>
        </div>
        <p className="footer-email">example@email.com</p>
        <p className="footer-text">Copyright © 2020 Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
