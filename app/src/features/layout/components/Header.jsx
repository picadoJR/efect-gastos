import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header>
      <nav 
        className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'shadow-lg' : ''}`}
        style={{ 
          background: scrolled ? 'rgba(26, 15, 10, 0.95)' : 'rgba(26, 15, 10, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${scrolled ? '#e67e22' : '#4a2f22'}`,
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container">
          <NavLink
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
            to="/"
            style={{ 
              fontSize: '1.5rem',
              color: '#e67e22',
              letterSpacing: '1px',
              textDecoration: 'none'
            }}
          >
            <i className="bi bi-coin fs-3" style={{ color: '#e67e22' }}></i>
            EfectGastos
          </NavLink>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ 
              backgroundColor: 'transparent',
              border: 'none'
            }}
          >
            <i className="bi bi-list fs-2" style={{ color: '#e67e22' }}></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-lg-3">
              {[
                { to: "/", icon: "bi-house-door", label: "Inicio" },
                { to: "/ApiRyC", icon: "bi-people", label: "Api Rick" },
                { to: "/ApiRyC_axios", icon: "bi-code-square", label: "Api Rick Axios" },
                { to: "/conocenos", icon: "bi-info-circle", label: "Conócenos" },
                { to: "/dashboard", icon: "bi-wallet2", label: "Mis Gastos" },
                { to: "/perfil", icon: "bi-person-circle", label: "Perfil" },
              ].map((item, i) => (
                <li className="nav-item" key={i}>
                  <NavLink
                    to={item.to}
                    className="nav-link px-3 py-2"
                    style={({ isActive }) => ({
                      color: isActive ? '#e67e22' : '#c9b6a0',
                      fontWeight: isActive ? '600' : '400',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    })}
                  >
                    <i className={`bi ${item.icon} me-2`}></i>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              
              <li className="nav-item">
                {!isAuthenticated ? (
                  <NavLink to="/login" className="btn-warm ms-2" style={{ textDecoration: 'none' }}>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Iniciar Sesión
                  </NavLink>
                ) : (
                  <button onClick={handleLogout} className="btn-outline-warm ms-2" style={{ background: 'transparent', cursor: 'pointer' }}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ height: '76px' }}></div>
    </header>
  );
};
/*mod*/