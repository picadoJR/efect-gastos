import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/components/auth";

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 VALIDACIÓN DE PASSWORD
  const validatePassword = (password) => {
    const minLength = password.length >= 5;

    const numbers = password.replace(/[^0-9]/g, "").length >= 3;

    const specialChar = /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password);

    return minLength && numbers && specialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 VALIDACIÓN ANTES DE ENVIAR
    if (!validatePassword(form.password)) {
      setError(
        "La contraseña debe tener mínimo 5 caracteres, 3 números y 1 carácter especial"
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await registerUser(form);

      setSuccess(res.data?.message || "Usuario registrado correctamente");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="d-flex vh-100" aria-label="Formulario de registro">

      {/* IMAGE */}
      <aside
        className="w-60 d-none d-md-block"
        style={{ backgroundColor: "#1a1a1a" }}
        aria-hidden="true"
      >
        <img
          src="/img/imgRe.jpg"
          alt="Ilustración de la aplicación de gastos"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </aside>

      {/* FORM */}
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
          aria-label="Registro de usuario"
        >

          <h1 className="mb-4 text-center h3">Register</h1>

          {/* ERROR */}
          {error && (
            <div className="text-danger text-center mb-3" role="alert">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="text-success text-center mb-3" role="status" aria-live="polite">
              {success}
            </div>
          )}

          {/* NAME */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>

            <div className="input-group">
              <span className="input-group-text bg-dark text-light" aria-hidden="true">
                <i className="bi bi-person"></i>
              </span>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control bg-dark text-light border-secondary"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-3">
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
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control bg-dark text-light border-secondary"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text bg-dark text-light" aria-hidden="true">
                <i className="bi bi-lock"></i>
              </span>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control bg-dark text-light border-secondary"
                required
              />

              <button
                type="button"
                className="input-group-text bg-dark text-light"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn w-100"
            style={{ background: "#d4af37", color: "#000" }}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Register"}
          </button>

          {/* LINK */}
          <div className="text-center mt-3">
            <Link to="/login" style={{ color: "#d4af37" }}>
              Ya tengo una cuenta
            </Link>
          </div>

        </form>
      </section>

    </main>
  );
};