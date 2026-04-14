import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const Content = () => {
  return (
    <main className="text-light" style={{ background: "linear-gradient(135deg, #1a0f0a 0%, #2d1b13 100%)" }}>
      
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="vh-100 d-flex align-items-center justify-content-center text-center px-3"
        style={{
          backgroundImage: "linear-gradient(rgba(26, 15, 10, 0.65), rgba(45, 27, 19, 0.7)), url('/img/todo_fondo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="display-4 fw-bold mb-4" style={{ 
              background: "linear-gradient(135deg, #e67e22 0%, #f39c12 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}>
              <i className="bi bi-graph-up-arrow me-2"></i>
              Imperio de las finanzas
            </h1>
            <p className="lead mb-4" style={{ color: "#f5e6d3" }}>
              Controla tus gastos con estilo, precisión y elegancia.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <NavLink to="/perfil" className="btn-warm px-5 py-3">
                <i className="bi bi-play-fill me-2"></i>
                Comenzar ahora
              </NavLink>
              <NavLink to="/dashboard" className="btn-outline-warm px-5 py-3">
                <i className="bi bi-wallet2 me-2"></i>
                Ver Dashboard
              </NavLink>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <section className="container py-5 px-3">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#e67e22" }}>
            <i className="bi bi-stars me-2"></i>
            Características principales
          </h2>
          <p style={{ color: "#c9b6a0" }}>Todo lo que necesitas para controlar tus finanzas</p>
        </div>
        <div className="row g-4">
          {[
            { icon: "bi-bar-chart-line", title: "Análisis preciso", text: "Visualiza cada movimiento con claridad" },
            { icon: "bi-wallet2", title: "Gestión total", text: "Administra ingresos y gastos fácilmente" },
            { icon: "bi-piggy-bank", title: "Ahorro inteligente", text: "Optimiza tu dinero como un experto" },
            { icon: "bi-shield-check", title: "Seguro y confiable", text: "Tus datos están protegidos" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="col-12 col-sm-6 col-lg-3"
            >
              <div className="card h-100 text-center border-0 p-4" style={{ background: "#3d261b", borderRadius: "16px", border: "1px solid #4a2f22" }}>
                <i className={`${item.icon} fs-1 mb-3`} style={{ color: "#e67e22" }}></i>
                <h3 className="h5 mb-2" style={{ color: "#e67e22" }}>{item.title}</h3>
                <p className="small mb-0" style={{ color: "#c9b6a0" }}>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* API SECTION - CUADROS CENTRADOS */}
      <section className="py-5 px-3" style={{ background: "#2d1b13" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: "#e67e22" }}>
              <i className="bi bi-code-square me-2"></i>
              APIs de demostración
            </h2>
            <p style={{ color: "#c9b6a0" }}>Explora nuestras integraciones con APIs externas</p>
          </div>
          <div className="row g-4 justify-content-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="col-md-6"
            >
              <div className="p-4 text-center" style={{ background: "#3d261b", borderRadius: "16px", border: "1px solid #4a2f22" }}>
                <i className="bi bi-people fs-2 mb-3" style={{ color: "#e67e22" }}></i>
                <h3 style={{ color: "#e67e22" }}>Rick & Morty API</h3>
                <p style={{ color: "#c9b6a0" }}>Explora personajes, episodios y más de la famosa serie</p>
                <div className="d-flex gap-3 mt-3 justify-content-center">
                  <NavLink to="/ApiRyC" className="btn-warm">
                    Ver versión Fetch
                  </NavLink>
                  <NavLink to="/ApiRyC_axios" className="btn-outline-warm">
                    Ver versión Axios
                  </NavLink>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="col-md-6"
            >
              <div className="p-4 text-center" style={{ background: "#3d261b", borderRadius: "16px", border: "1px solid #4a2f22" }}>
                <i className="bi bi-graph-up fs-2 mb-3" style={{ color: "#e67e22" }}></i>
                <h3 style={{ color: "#e67e22" }}>Tu propia API</h3>
                <p style={{ color: "#c9b6a0" }}>Backend propio con Node.js, Express y MongoDB</p>
                <div className="d-flex gap-3 mt-3 justify-content-center">
                  <NavLink to="/dashboard" className="btn-warm">
                    Ver tus gastos
                  </NavLink>
                  <a href="https://github.com/picadoJR/efect-gastos.git" target="_blank" rel="noopener noreferrer" className="btn-outline-warm">
                    Ver código
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5 px-3">
        <div className="container text-center">
          <h2 className="fw-bold mb-5" style={{ color: "#e67e22" }}>
            <i className="bi bi-gear me-2"></i>
            ¿Cómo funciona?
          </h2>
          <div className="row g-4">
            {[
              { icon: "bi-person-plus", title: "Crea tu cuenta", text: "Empieza en segundos" },
              { icon: "bi-cash-stack", title: "Registra tus gastos", text: "Control total de tus finanzas" },
              { icon: "bi-graph-up", title: "Analiza y optimiza", text: "Mejora tus hábitos financieros" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="col-12 col-md-4"
              >
                <i className={`${item.icon} fs-1`} style={{ color: "#e67e22" }}></i>
                <h3 className="h5 mt-3" style={{ color: "#e67e22" }}>{item.title}</h3>
                <p style={{ color: "#c9b6a0" }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container py-5 text-center px-3">
        <div className="row g-4">
          {[
            { value: "+10K", label: "Usuarios", icon: "bi-people" },
            { value: "+1M", label: "Transacciones", icon: "bi-cash" },
            { value: "99%", label: "Satisfacción", icon: "bi-emoji-smile" },
            { value: "24/7", label: "Soporte", icon: "bi-headset" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="col-6 col-md-3"
            >
              <i className={`${item.icon} fs-2 mb-2`} style={{ color: "#e67e22" }}></i>
              <h3 className="fw-bold" style={{ color: "#e67e22" }}>{item.value}</h3>
              <p className="small" style={{ color: "#c9b6a0" }}>{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-5 px-3" style={{ background: "#2d1b13" }}>
        <div className="container">
          <h2 className="fw-bold mb-3" style={{ color: "#e67e22" }}>
            <i className="bi bi-rocket-takeoff me-2"></i>
            Empieza hoy mismo
          </h2>
          <p className="mb-4" style={{ color: "#c9b6a0" }}>Lleva tus finanzas al siguiente nivel</p>
          <NavLink to="/register" className="btn-warm px-5 py-3">
            Registrarse gratis
          </NavLink>
        </div>
      </section>

      {/* GITHUB SECTION */}
      <section className="text-center py-5 px-3">
        <div className="container">
          <h2 className="fw-bold mb-3" style={{ color: "#e67e22" }}>
            <i className="bi bi-github me-2"></i>
            Código abierto
          </h2>
          <p className="mb-4" style={{ color: "#c9b6a0" }}>Explora el código fuente de este proyecto en GitHub</p>
          <a
            href="https://github.com/picadoJR/efect-gastos.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-warm px-5 py-3"
          >
            <i className="bi bi-box-arrow-up-right me-2"></i>
            Ver repositorio
          </a>
        </div>
      </section>
    </main>
  );
};