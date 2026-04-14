import React, { useEffect, useState } from "react";

export const ApiRyC = () => {
  const [Data, setData] = useState([]);
  const [Pages, setPages] = useState(1);
  const [Info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://rickandmortyapi.com/api/character?page=${Pages}`)
      .then((response) => response.json())
      .then((Data) => {
        setData(Data.results || []);
        setInfo(Data.info || {});
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [Pages]);

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

        {/* LOADING */}
        {loading && (
          <div
            className="text-center text-secondary"
            role="status"
            aria-live="polite"
          >
            Cargando personajes...
          </div>
        )}

        {/* GRID */}
        <section aria-label="Lista de personajes">
          <div className="row g-4">
            {!loading && Data?.length === 0 && (
              <p className="text-center text-secondary">
                No hay personajes disponibles
              </p>
            )}

            {Data?.map((char) => (
              <article
                key={char.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div
                  className="card h-100 border-0 shadow"
                  style={{
                    background: "#111",
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  {/* IMAGE */}
                  <img
                    src={char.image}
                    alt={`Imagen del personaje ${char.name}`}
                    className="card-img-top"
                  />

                  {/* INFO */}
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
            ))}
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
              border: "1px solid #d4af37",
            }}
          >
            <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
            Anterior
          </button>

          <span
            className="fw-bold"
            style={{ color: "#d4af37" }}
            aria-live="polite"
          >
            Página {Pages}
          </span>

          <button
            className="btn"
            onClick={() => setPages(Pages + 1)}
            disabled={!Info.next}
            aria-label="Página siguiente"
            style={{
              background: "#d4af37",
              color: "#000",
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