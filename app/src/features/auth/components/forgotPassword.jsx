import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../apis/components/auth";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await forgotPassword({ email });

      setSuccess(res.data?.message || "Correo enviado correctamente");
    } catch (err) {
      setError(err.response?.data?.message || "Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="d-flex vh-100" aria-label="Recuperación de contraseña">

      {/* IMAGE SIDE */}
      <aside
        className="w-60 d-none d-md-block"
        style={{ backgroundColor: "#1a1a1a" }}
        aria-hidden="true"
      >
        <img
          src="/img/img2.jpg"
          alt="Ilustración de la aplicación de gastos"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </aside>

      {/* FORM SIDE */}
      <section
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#121212" }}
      >
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded shadow"
          style={{
            width: "90%",
            maxWidth: "450px",
            backgroundColor: "#1a1a1a",
            color: "#d4af37"
          }}
          aria-label="Formulario de recuperación de contraseña"
        >

          <h1 className="mb-4 text-center h3">
            Forgot Password
          </h1>

          {/* STATUS MESSAGES */}
          {error && (
            <div
              className="text-danger text-center mb-3"
              role="alert"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="text-success text-center mb-3"
              role="status"
              aria-live="polite"
            >
              {success}
            </div>
          )}

          {/* EMAIL INPUT */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <div className="input-group">
              <span className="input-group-text bg-dark text-light" aria-hidden="true">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control bg-dark text-light border-secondary"
                placeholder="tuemail@correo.com"
                required
                aria-required="true"
                aria-describedby="emailHelp"
              />
            </div>

            <small id="emailHelp" className="text-secondary">
              Ingresa el correo asociado a tu cuenta
            </small>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn w-100"
            style={{ background: "#d4af37", color: "#000" }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>

          {/* LINK */}
          <div className="text-center mt-3">
            <Link to="/login" style={{ color: "#d4af37" }}>
              Volver al Login
            </Link>
          </div>

        </form>
      </section>

    </main>
  );
};