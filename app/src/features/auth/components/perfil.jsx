import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Perfil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <main
      className="text-light min-vh-100 d-flex align-items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(10,10,10,0.95)), url('/img/imgLanding.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Página de perfil"
    >
      <div className="container text-center">

        {/* TITLE */}
        <header>
          <h1 className="fw-bold mb-3" style={{ color: "#d4af37" }}>
            <i className="bi bi-person-circle me-2" aria-hidden="true"></i>
            Mi Perfil
          </h1>
        </header>

        {!user ? (
          <>
            <p className="text-secondary mb-5">
              Accede a tu cuenta o crea una nueva para comenzar a gestionar tus finanzas.
            </p>

            {/* OPTIONS */}
            <section aria-label="Opciones de acceso">
              <div className="row g-4 justify-content-center">

                {/* LOGIN */}
                <article className="col-12 col-md-4">
                  <div
                    className="card border-0 shadow h-100 p-4"
                    style={{
                      background: "rgba(20,20,20,0.85)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "15px"
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right fs-1 mb-3"
                      style={{ color: "#d4af37" }}
                      aria-hidden="true"
                    ></i>

                    <h2 className="h5">Iniciar sesión</h2>
                    <p className="text-secondary small">
                      Accede a tu cuenta existente
                    </p>

                    <NavLink
                      to="/login"
                      className="btn mt-3"
                      style={{ background: "#d4af37", color: "#000" }}
                      aria-label="Ir a iniciar sesión"
                    >
                      Entrar
                    </NavLink>
                  </div>
                </article>

                {/* REGISTER */}
                <article className="col-12 col-md-4">
                  <div
                    className="card border-0 shadow h-100 p-4"
                    style={{
                      background: "rgba(20,20,20,0.85)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "15px"
                    }}
                  >
                    <i className="bi bi-person-plus fs-1 mb-3"
                      style={{ color: "#d4af37" }}
                      aria-hidden="true"
                    ></i>

                    <h2 className="h5">Crear cuenta</h2>
                    <p className="text-secondary small">
                      Regístrate y empieza gratis
                    </p>

                    <NavLink
                      to="/register"
                      className="btn mt-3"
                      style={{ background: "#d4af37", color: "#000" }}
                      aria-label="Ir a registro"
                    >
                      Registrarse
                    </NavLink>
                  </div>
                </article>

                {/* FORGOT */}
                <article className="col-12 col-md-4">
                  <div
                    className="card border-0 shadow h-100 p-4"
                    style={{
                      background: "rgba(20,20,20,0.85)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "15px"
                    }}
                  >
                    <i className="bi bi-key fs-1 mb-3"
                      style={{ color: "#d4af37" }}
                      aria-hidden="true"
                    ></i>

                    <h2 className="h5">Recuperar acceso</h2>
                    <p className="text-secondary small">
                      ¿Olvidaste tu contraseña?
                    </p>

                    <NavLink
                      to="/forgotPassword"
                      className="btn mt-3"
                      style={{ background: "#d4af37", color: "#000" }}
                      aria-label="Ir a recuperación de contraseña"
                    >
                      Recuperar
                    </NavLink>
                  </div>
                </article>

              </div>
            </section>
          </>
        ) : (
          <>
            {/* USER LOGGED */}
            <p className="text-secondary mb-5">
              Bienvenido a tu cuenta
            </p>

            <section aria-label="Información del usuario">
              <div className="d-flex justify-content-center">

                <article
                  className="card border-0 shadow p-5 text-center"
                  style={{
                    background: "rgba(20,20,20,0.85)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "15px",
                    maxWidth: "400px",
                    width: "100%"
                  }}
                >

                  <i className="bi bi-person-check fs-1 mb-3"
                    style={{ color: "#d4af37" }}
                    aria-hidden="true"
                  ></i>

                  <h2 className="h4">{user.name || "Usuario"}</h2>

                  <p className="text-secondary">
                    {user.email}
                  </p>

                  <button
                    onClick={logout}
                    className="btn mt-3"
                    style={{ background: "#d4af37", color: "#000" }}
                    aria-label="Cerrar sesión"
                  >
                    Cerrar sesión
                  </button>

                </article>

              </div>
            </section>
          </>
        )}

      </div>
    </main>
  );
};