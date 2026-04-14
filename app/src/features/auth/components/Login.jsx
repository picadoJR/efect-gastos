import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/components/auth";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="d-flex vh-100" aria-label="Formulario de inicio de sesión">

      {/* IMAGE */}
      <aside
        className="w-60 d-none d-md-block"
        style={{ backgroundColor: "#1a1a1a" }}
        aria-hidden="true"
      >
        <img
          src="/img/imgFP.jpg"
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
          aria-label="Login de usuario"
        >

          <h1 className="mb-4 text-center h3">Login</h1>

          {/* ERROR */}
          {error && (
            <div
              className="text-danger text-center mb-3"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* EMAIL */}
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
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="form-control bg-dark text-light border-secondary"
                required
                aria-required="true"
                placeholder="tuemail@correo.com"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
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
                aria-required="true"
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
            className="btn w-100 fw-bold"
            style={{ background: "#d4af37", color: "#000" }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Ingresando..." : "Login"}
          </button>

          {/* LINKS */}
          <nav className="d-flex justify-content-between mt-3" aria-label="Opciones de cuenta">
            <Link to="/register" style={{ color: "#d4af37" }}>
              Registrarme
            </Link>

            <Link to="/forgotPassword" style={{ color: "#d4af37" }}>
              Olvidé mi contraseña
            </Link>
          </nav>

        </form>
      </section>

    </main>
  );
};