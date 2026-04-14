import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-auto"
      style={{ background: "#0b0b0b", borderTop: "1px solid #1f1f1f" }}
      aria-label="Pie de página"
    >
      <div className="container">
        <div className="row gy-4">

          {/* MARCA */}
          <section className="col-12 col-md-4 text-center text-md-start" aria-label="Información de la marca">

            <h2
              className="h5 fw-bold d-flex align-items-center justify-content-center justify-content-md-start"
              style={{ color: "#d4af37" }}
            >
              <i className="bi bi-cash-stack me-2" aria-hidden="true"></i>
              GastosApp
            </h2>

            <p className="text-secondary small">
              Gestiona tus finanzas personales con elegancia y control total.
              Optimiza tus gastos y mejora tus decisiones.
            </p>

            {/* REDES */}
            <nav
              className="d-flex justify-content-center justify-content-md-start gap-3 mt-3"
              aria-label="Redes sociales"
            >
              {["facebook", "instagram", "twitter-x"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="fs-5"
                  style={{ color: "#aaa", transition: "0.3s" }}
                  aria-label={`Ir a ${icon}`}
                >
                  <i className={`bi bi-${icon}`} aria-hidden="true"></i>
                </a>
              ))}
            </nav>

          </section>

          {/* NAVEGACIÓN */}
          <nav
            className="col-6 col-md-4 text-center text-md-start"
            aria-label="Navegación del sitio"
          >
            <h3 className="h6 fw-bold mb-3" style={{ color: "#d4af37" }}>
              Navegación
            </h3>

            <ul className="navbar-nav">
              {[
                { to: "/", icon: "bi-house", label: "Inicio" },
                { to: "/conocenos", icon: "bi-people", label: "Conócenos" },
                { to: "/gastos", icon: "bi-wallet2", label: "Mis Gastos" },
                { to: "/perfil", icon: "bi-person-circle", label: "Perfil" },
              ].map((item, i) => (
                <li className="nav-item" key={i}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      "nav-link py-1" + (isActive ? " fw-bold" : "")
                    }
                    style={({ isActive }) => ({
                      color: isActive ? "#d4af37" : "#bbb",
                      transition: "0.3s",
                    })}
                    aria-label={`Ir a ${item.label}`}
                  >
                    <i className={`bi ${item.icon} me-1`} aria-hidden="true"></i>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACTO */}
          <section className="col-6 col-md-4 text-center text-md-start" aria-label="Información de contacto">

            <h3 className="h6 fw-bold mb-3" style={{ color: "#d4af37" }}>
              Contacto
            </h3>

            <p className="text-secondary mb-2 small">
              <i className="bi bi-envelope me-2" aria-hidden="true"></i>
              soporte@gastosapp.com
            </p>

            <p className="text-secondary small">
              <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
              Colombia
            </p>

            <button
              type="button"
              className="btn btn-sm mt-2"
              style={{ background: "#d4af37", color: "#000", border: "none" }}
              aria-label="Contactar soporte"
            >
              Contáctanos
            </button>

          </section>

        </div>

        <hr style={{ borderColor: "#1f1f1f" }} className="my-4" />

        {/* BOTTOM */}
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary small"
          aria-label="Información legal"
        >
          <span>
            <i className="bi bi-c-circle me-1" aria-hidden="true"></i>
            2026 GastosApp
          </span>

          <nav className="d-flex gap-3 mt-2 mt-md-0" aria-label="Enlaces legales">
            <button className="footer-link btn btn-link p-0 text-secondary" aria-label="Ver política de privacidad">
              Privacidad
            </button>

            <button className="footer-link btn btn-link p-0 text-secondary" aria-label="Ver términos y condiciones">
              Términos
            </button>
          </nav>
        </div>

      </div>
    </footer>
  );
};