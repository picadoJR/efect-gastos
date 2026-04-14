import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../../shared/style.css";

export const ApiRyCi = () => {
  const [Data, setData] = useState([]);
  const [Pages, setPages] = useState(1);
  const [Info, setInfo] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(`https://rickandmortyapi.com/api/character`, {
        params: { page: Pages, name: query },
        cancelToken: source.token
      })
      .then(({ data }) => {
        setData(data.results || []);
        setInfo(data.info || {});
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        if (error.response?.status === 404) {
          setData([]);
          setInfo({});
          return;
        }

        console.error(error);
      });

    return () => source.cancel();
  }, [Pages, query]);

  return (
    <main className="bg-black text-light min-vh-100 py-5" aria-label="Rick and Morty characters list">
      <div className="container">

        {/* HEADER */}
        <header className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: "#d4af37" }}>
            <i className="bi bi-tv me-2" aria-hidden="true"></i>
            Rick & Morty API
          </h1>
          <p className="text-secondary">
            Explora personajes con estilo premium
          </p>
        </header>

        {/* SEARCH */}
        <section aria-label="Buscar personaje">
          <label htmlFor="searchChar" className="form-label text-warning">
            Buscar personaje
          </label>

          <input
            id="searchChar"
            type="text"
            className="form-control mb-4 border-2 border-warning bg-black text-white mi-input"
            placeholder="Escribe un personaje..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPages(1);
            }}
            aria-describedby="searchHelp"
          />

          <small id="searchHelp" className="text-secondary">
            Filtra personajes por nombre
          </small>
        </section>

        {/* LIST */}
        <section aria-label="Lista de personajes">
          <div className="row g-4">
            {Data?.length === 0 ? (
              <p className="text-center text-secondary">
                No se encontraron personajes
              </p>
            ) : (
              Data?.map((char) => (
                <article key={char.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div
                    className="card h-100 border-0 shadow"
                    style={{
                      background: "#111",
                      borderRadius: "15px",
                      overflow: "hidden",
                      transition: "0.3s"
                    }}
                  >
                    <img
                      src={char.image}
                      alt={`Imagen de ${char.name}`}
                      className="card-img-top"
                    />

                    <div className="card-body text-center">
                      <h2 className="h5" style={{ color: "#d4af37" }}>
                        {char.name}
                      </h2>

                      <p className="text-secondary mb-1">
                        <i className="bi bi-gender-ambiguous me-1" aria-hidden="true"></i>
                        {char.gender}
                      </p>

                      <p className="text-secondary small">
                        <i className="bi bi-activity me-1" aria-hidden="true"></i>
                        {char.status}
                      </p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* PAGINATION */}
        <nav
          className="d-flex justify-content-center align-items-center gap-3 mt-5 flex-wrap"
          aria-label="Paginación de personajes"
        >
          <button
            className="btn"
            onClick={() => setPages(Pages - 1)}
            disabled={!Info.prev}
            aria-label="Página anterior"
            style={{
              background: "#222",
              color: "#d4af37",
              border: "1px solid #d4af37"
            }}
          >
            <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
            Anterior
          </button>

          <span className="fw-bold" style={{ color: "#d4af37" }} aria-live="polite">
            Página {Pages}
          </span>

          <button
            className="btn"
            onClick={() => setPages(Pages + 1)}
            disabled={!Info.next}
            aria-label="Página siguiente"
            style={{
              background: "#d4af37",
              color: "#000"
            }}
          >
            Siguiente
            <i className="bi bi-arrow-right ms-1" aria-hidden="true"></i>
          </button>
        </nav>

      </div>
    </main>
  );
};