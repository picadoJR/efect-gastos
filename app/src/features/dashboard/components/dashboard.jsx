import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGastos, createGasto, deleteGasto, updateGasto } from "../../apis/components/authGastos";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const Dashboard = () => {

  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    categoria: "",
    fecha: "",
    metodo: "",
    notas: "",
    icono: "bi-cash"
  });

  const [gastos, setGastos] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [showDoughnut, setShowDoughnut] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }

    setIsAuth(true);
    cargarGastos();
  }, []);

  const cargarGastos = async () => {
    try {
      const res = await getGastos();
      setGastos(res.data);
    } catch (error) {
      console.log("Error cargando gastos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const validar = () => {
    let nuevosErrores = {};

    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }

    if (!form.monto || Number(form.monto) <= 0) {
      nuevosErrores.monto = "El monto debe ser mayor a 0";
    }

    if (!form.categoria) {
      nuevosErrores.categoria = "Selecciona una categoría";
    }

    if (!form.fecha) {
      nuevosErrores.fecha = "Selecciona una fecha";
    }

    if (!form.metodo) {
      nuevosErrores.metodo = "Selecciona un método";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      const res = await createGasto(form);
      setGastos([res.data, ...gastos]);

      setForm({
        descripcion: "",
        monto: "",
        categoria: "",
        fecha: "",
        metodo: "",
        notas: "",
        icono: "bi-cash"
      });

      setErrors({});
    } catch (error) {
      console.log("Error al guardar");
    }
  };

  const eliminarGasto = async (id) => {
    try {
      await deleteGasto(id);
      setGastos(gastos.filter(g => g._id !== id));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const editarGasto = async (gasto) => {
    const nuevaDescripcion = prompt("Nueva descripción", gasto.descripcion);
    const nuevoMonto = prompt("Nuevo monto", gasto.monto);

    if (!nuevaDescripcion || !nuevoMonto) return;

    try {
      const res = await updateGasto(gasto._id, {
        descripcion: nuevaDescripcion,
        monto: Number(nuevoMonto)
      });

      setGastos(gastos.map(g => g._id === gasto._id ? res.data : g));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Filtrar gastos
  const filteredGastos = gastos.filter(gasto => {
    if (filter !== "all" && gasto.categoria !== filter) return false;
    if (searchTerm && !gasto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const total = gastos.reduce((acc, g) => acc + Number(g.monto), 0);
  const cantidad = gastos.length;
  const promedio = cantidad > 0 ? (total / cantidad).toFixed(2) : 0;
  const mayor = gastos.length > 0 ? Math.max(...gastos.map(g => g.monto)) : 0;
  const menor = gastos.length > 0 ? Math.min(...gastos.map(g => g.monto)) : 0;

  const gastoFrecuente = () => {
    if (gastos.length === 0) return "N/A";

    const conteo = {};

    gastos.forEach(g => {
      const desc = g.descripcion.toLowerCase().trim();
      conteo[desc] = (conteo[desc] || 0) + 1;
    });

    let max = 0;
    let frecuente = "";

    for (let key in conteo) {
      if (conteo[key] > max) {
        max = conteo[key];
        frecuente = key;
      }
    }

    return frecuente;
  };

  // Datos para gráfico de barras
  const agruparPorFecha = () => {
    const data = {};

    gastos.forEach(g => {
      const fecha = g.fecha ? g.fecha.split("T")[0] : "Sin fecha";
      data[fecha] = (data[fecha] || 0) + Number(g.monto);
    });

    const fechasOrdenadas = Object.keys(data).sort((a, b) => {
      if (a === "Sin fecha") return 1;
      if (b === "Sin fecha") return -1;
      return new Date(a) - new Date(b);
    });

    return {
      labels: fechasOrdenadas,
      datasets: [
        {
          label: "Gastos por día",
          data: fechasOrdenadas.map(f => data[f]),
          backgroundColor: "rgba(230, 126, 34, 0.8)",
          borderColor: "#e67e22",
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: "rgba(230, 126, 34, 1)"
        }
      ]
    };
  };

  // Datos para gráfico de dona (por categoría)
  const agruparPorCategoria = () => {
    const categorias = {};

    gastos.forEach(g => {
      if (g.categoria) {
        categorias[g.categoria] = (categorias[g.categoria] || 0) + Number(g.monto);
      }
    });

    return {
      labels: Object.keys(categorias),
      datasets: [
        {
          data: Object.values(categorias),
          backgroundColor: [
            "rgba(230, 126, 34, 0.8)",
            "rgba(243, 156, 18, 0.8)",
            "rgba(211, 84, 0, 0.8)",
            "rgba(241, 196, 15, 0.8)",
            "rgba(230, 126, 34, 0.6)",
          ],
          borderWidth: 2,
          borderColor: "#2d1b13"
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#f5e6d3"
        }
      },
      tooltip: {
        backgroundColor: "#2d1b13",
        titleColor: "#e67e22",
        bodyColor: "#f5e6d3"
      }
    }
  };

  if (!loading && !isAuth) {
    return (
      <motion.div 
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "#1a0f0a" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center p-5" style={{ background: "#2d1b13", borderRadius: "20px", border: "1px solid #4a2f22" }}>
          <i className="bi bi-shield-lock fs-1" style={{ color: "#e67e22" }}></i>
          <h2 className="mt-3" style={{ color: "#e67e22" }}>Acceso restringido</h2>
          <p className="text-secondary">Debes iniciar sesión para ver tus gastos</p>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#1a0f0a" }}>
        <div className="text-center">
          <div className="spinner-warm mx-auto mb-3"></div>
          <p style={{ color: "#e67e22" }}>Cargando tus gastos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 p-4" style={{ background: "linear-gradient(135deg, #1a0f0a 0%, #2d1b13 100%)" }}>
      <div className="container">
        
        {/* Header con animación */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold mb-2" style={{ 
            background: "linear-gradient(135deg, #e67e22 0%, #f39c12 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent"
          }}>
            <i className="bi bi-graph-up me-3"></i>
            Dashboard de Gastos
          </h1>
          <p style={{ color: "#c9b6a0" }}>Controla y analiza tus finanzas personales</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { label: "Total Gastado", value: `$${total.toLocaleString()}`, icon: "bi-cash-stack", color: "#e67e22" },
            { label: "Cantidad Gastos", value: cantidad, icon: "bi-receipt", color: "#f39c12" },
            { label: "Promedio", value: `$${promedio}`, icon: "bi-calculator", color: "#e67e22" },
            { label: "Mayor Gasto", value: `$${mayor.toLocaleString()}`, icon: "bi-arrow-up", color: "#d35400" },
            { label: "Menor Gasto", value: `$${menor.toLocaleString()}`, icon: "bi-arrow-down", color: "#f39c12" },
            { label: "Más Frecuente", value: gastoFrecuente(), icon: "bi-star-fill", color: "#e67e22" }
          ].map((item, i) => (
            <div className="col-md-2 col-sm-4" key={i}>
              <motion.div 
                className="p-3 text-center"
                style={{ 
                  background: "linear-gradient(135deg, #2d1b13 0%, #3d261b 100%)",
                  borderRadius: "16px",
                  border: "1px solid #4a2f22",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                whileHover={{ y: -5, borderColor: "#e67e22" }}
              >
                <i className={`${item.icon} fs-2 mb-2 d-block`} style={{ color: item.color }}></i>
                <small style={{ color: "#a8927a", textTransform: "uppercase" }}>{item.label}</small>
                <h4 className="mt-1 mb-0" style={{ color: item.color, fontWeight: "bold" }}>
                  {item.value}
                </h4>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Filtros y búsqueda */}
        <motion.div 
          className="row g-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="col-md-6">
            <div className="position-relative">
              <i className="bi bi-search position-absolute ms-3 mt-3" style={{ color: "#a8927a" }}></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Buscar gastos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: "#3d261b",
                  border: "1px solid #4a2f22",
                  color: "#f5e6d3",
                  padding: "10px",
                  borderRadius: "12px"
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                background: "#3d261b",
                border: "1px solid #4a2f22",
                color: "#f5e6d3",
                borderRadius: "12px"
              }}
            >
              <option value="all">Todas las categorías</option>
              <option value="Comida">🍔 Comida</option>
              <option value="Transporte">🚗 Transporte</option>
              <option value="Entretenimiento">🎮 Entretenimiento</option>
              <option value="Servicios">💡 Servicios</option>
              <option value="Salud">🏥 Salud</option>
            </select>
          </div>
        </motion.div>

        <div className="row g-4">
          
          {/* Formulario */}
          <motion.div 
            className="col-md-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-4" style={{ 
              background: "linear-gradient(135deg, #2d1b13 0%, #3d261b 100%)", 
              borderRadius: "20px",
              border: "1px solid #4a2f22"
            }}>
              <h5 className="mb-4" style={{ color: "#e67e22" }}>
                <i className="bi bi-plus-circle me-2"></i>
                Agregar Nuevo Gasto
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#c9b6a0" }}>Descripción</label>
                  <input
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                    style={{ background: "#1a0f0a", border: "1px solid #4a2f22", color: "#f5e6d3" }}
                  />
                  {errors.descripcion && <small className="text-danger">{errors.descripcion}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "#c9b6a0" }}>Monto ($)</label>
                  <input
                    type="number"
                    name="monto"
                    value={form.monto}
                    onChange={handleChange}
                    className={`form-control ${errors.monto ? 'is-invalid' : ''}`}
                    style={{ background: "#1a0f0a", border: "1px solid #4a2f22", color: "#f5e6d3" }}
                  />
                  {errors.monto && <small className="text-danger">{errors.monto}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "#c9b6a0" }}>Categoría</label>
                  <select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className={`form-select ${errors.categoria ? 'is-invalid' : ''}`}
                    style={{ background: "#1a0f0a", border: "1px solid #4a2f22", color: "#f5e6d3" }}
                  >
                    <option value="">Seleccionar</option>
                    <option>Comida</option>
                    <option>Transporte</option>
                    <option>Entretenimiento</option>
                    <option>Servicios</option>
                    <option>Salud</option>
                  </select>
                  {errors.categoria && <small className="text-danger">{errors.categoria}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "#c9b6a0" }}>Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
                    style={{ background: "#1a0f0a", border: "1px solid #4a2f22", color: "#f5e6d3" }}
                  />
                  {errors.fecha && <small className="text-danger">{errors.fecha}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "#c9b6a0" }}>Método de pago</label>
                  <select
                    name="metodo"
                    value={form.metodo}
                    onChange={handleChange}
                    className={`form-select ${errors.metodo ? 'is-invalid' : ''}`}
                    style={{ background: "#1a0f0a", border: "1px solid #4a2f22", color: "#f5e6d3" }}
                  >
                    <option value="">Seleccionar</option>
                    <option>Efectivo</option>
                    <option>Tarjeta</option>
                    <option>Transferencia</option>
                  </select>
                  {errors.metodo && <small className="text-danger">{errors.metodo}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "#c9b6a0" }}>Notas (opcional)</label>
                  <textarea
                    name="notas"
                    value={form.notas}
                    onChange={handleChange}
                    rows="2"
                    className="form-control"
                    style={{ background: "#1a0f0a", border: "1px solid #4a2f22", color: "#f5e6d3" }}
                  />
                </div>

                <motion.button 
                  type="submit"
                  className="btn w-100 fw-bold"
                  style={{ background: "linear-gradient(135deg, #e67e22 0%, #f39c12 100%)", color: "#ffffff", border: "none" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-save me-2"></i>
                  Guardar Gasto
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Lista de Gastos */}
          <motion.div 
            className="col-md-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-4" style={{ 
              background: "linear-gradient(135deg, #2d1b13 0%, #3d261b 100%)", 
              borderRadius: "20px",
              border: "1px solid #4a2f22"
            }}>
              <h5 className="mb-4" style={{ color: "#e67e22" }}>
                <i className="bi bi-clock-history me-2"></i>
                Historial de Gastos ({filteredGastos.length})
              </h5>

              {filteredGastos.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1" style={{ color: "#a8927a" }}></i>
                  <p className="mt-3" style={{ color: "#a8927a" }}>No hay gastos registrados</p>
                </div>
              ) : (
                <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                  {filteredGastos.map((g, index) => (
                    <motion.div
                      key={g._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="mb-3 p-3"
                      style={{ 
                        background: "#1a0f0a", 
                        borderRadius: "12px", 
                        border: "1px solid #4a2f22",
                        transition: "all 0.3s ease"
                      }}
                      whileHover={{ x: 5, borderColor: "#e67e22" }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <i className={`bi ${g.icono || "bi-cash"}`} style={{ color: "#e67e22", fontSize: "1.2rem" }}></i>
                          <strong style={{ color: "#f5e6d3" }}>{g.descripcion}</strong>
                        </div>
                        <strong style={{ color: "#e67e22", fontSize: "1.1rem" }}>
                          ${Number(g.monto).toLocaleString()}
                        </strong>
                      </div>

                      <div className="row small mb-2">
                        <div className="col-md-4" style={{ color: "#a8927a" }}>
                          <i className="bi bi-tag me-1"></i> {g.categoria || "Sin categoría"}
                        </div>
                        <div className="col-md-4" style={{ color: "#a8927a" }}>
                          <i className="bi bi-calendar-event me-1"></i> {g.fecha ? new Date(g.fecha).toLocaleDateString() : "Sin fecha"}
                        </div>
                        <div className="col-md-4" style={{ color: "#a8927a" }}>
                          <i className="bi bi-credit-card me-1"></i> {g.metodo || "Sin método"}
                        </div>
                      </div>

                      {g.notas && (
                        <div className="mt-2 p-2 rounded" style={{ background: "#2d1b13" }}>
                          <small style={{ color: "#a8927a" }}>
                            <i className="bi bi-chat me-1"></i> {g.notas}
                          </small>
                        </div>
                      )}

                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <motion.button
                          className="btn btn-sm"
                          style={{ background: "#e67e22", color: "#ffffff", border: "none" }}
                          onClick={() => editarGasto(g)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="bi bi-pencil"></i>
                        </motion.button>
                        <motion.button
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarGasto(g._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="bi bi-trash"></i>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Botones de gráficos */}
              <div className="d-flex gap-3 mt-4 justify-content-center">
                <motion.button
                  className="btn fw-bold px-4"
                  style={{ background: "linear-gradient(135deg, #e67e22 0%, #f39c12 100%)", color: "#ffffff", border: "none" }}
                  onClick={() => setShowChart(!showChart)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="bi bi-bar-chart me-2"></i>
                  {showChart ? "Ocultar" : "Ver"} Gráfica Temporal
                </motion.button>
                <motion.button
                  className="btn fw-bold px-4"
                  style={{ background: "linear-gradient(135deg, #e67e22 0%, #f39c12 100%)", color: "#ffffff", border: "none" }}
                  onClick={() => setShowDoughnut(!showDoughnut)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="bi bi-pie-chart me-2"></i>
                  {showDoughnut ? "Ocultar" : "Ver"} Gráfica por Categorías
                </motion.button>
              </div>

              {/* Gráfico de barras */}
              {showChart && gastos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-3"
                  style={{ background: "#1a0f0a", borderRadius: "12px" }}
                >
                  <h6 className="text-center mb-3" style={{ color: "#e67e22" }}>
                    <i className="bi bi-calendar-week me-2"></i>
                    Evolución de Gastos por Fecha
                  </h6>
                  <div style={{ height: "400px" }}>
                    <Bar data={agruparPorFecha()} options={chartOptions} />
                  </div>
                </motion.div>
              )}

              {/* Gráfico de dona */}
              {showDoughnut && gastos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-3"
                  style={{ background: "#1a0f0a", borderRadius: "12px" }}
                >
                  <h6 className="text-center mb-3" style={{ color: "#e67e22" }}>
                    <i className="bi bi-pie-chart me-2"></i>
                    Distribución por Categorías
                  </h6>
                  <div style={{ height: "400px" }}>
                    <Doughnut data={agruparPorCategoria()} options={chartOptions} />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};