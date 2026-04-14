import React from "react";

export const Conocenos = () => {
  return (
    <main className="text-light" style={{ background: "linear-gradient(135deg, #1a0f0a 0%, #2d1b13 100%)" }} aria-label="Página sobre ApiGastos">

      {/* SKIP LINK (ACCESIBILIDAD PRO) */}
      <a
        href="#contenido"
        className="visually-hidden-focusable"
        style={{ color: "#e67e22" }}
      >
        Saltar al contenido principal
      </a>

      {/* HERO */}
      <section
        className="vh-100 d-flex align-items-center justify-content-center text-center px-3"
        style={{
          backgroundImage: "linear-gradient(rgba(26, 15, 10, 0.95), rgba(45, 27, 19, 0.95)), url('/img/imgFP.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Presentación de ApiGastos"
      >
        <header>
          <h1 className="display-4 fw-bold" style={{ color: "#e67e22" }}>
            Sobre ApiGastos
          </h1>

          <p className="lead mt-3" style={{ color: "#c9b6a0" }}>
            Una plataforma que transforma la manera en que gestionas tu dinero
          </p>
        </header>
      </section>

      <div id="contenido">

        {/* QUIENES SOMOS */}
        <section className="container py-5" aria-labelledby="quienes">

          <div className="row align-items-center g-4">

            <article className="col-md-6">
              <h2 id="quienes" className="fw-bold" style={{ color: "#e67e22" }}>
                ¿Quiénes somos?
              </h2>

              <p style={{ color: "#f5e6d3" }}>
                ApiGastos nació con el propósito de revolucionar el control financiero personal, 
                ofreciendo una experiencia moderna, intuitiva y al alcance de todos.
              </p>

              <p style={{ color: "#c9b6a0" }}>
                Nos dedicamos a brindar herramientas que empoderan a las personas para que tomen 
                decisiones económicas más inteligentes y mejoren su bienestar financiero día a día.
              </p>
            </article>

            <div className="col-md-6">
              <img
                src="/img/Elon-Musk-2.webp"
                className="img-fluid rounded shadow"
                alt="Equipo analizando finanzas"
                loading="lazy"
                style={{ border: "1px solid #4a2f22" }}
              />
            </div>

          </div>
        </section>

        {/* MISION VISION */}
        <section className="py-5 px-3" style={{ background: "#2d1b13" }} aria-labelledby="mv">

          <div className="container text-center">

            <h2 id="mv" className="fw-bold mb-5" style={{ color: "#e67e22" }}>
              Misión y Visión
            </h2>

            <div className="row g-4">

              <article className="col-md-6">
                <div className="p-4 h-100" style={{ background: "#3d261b", borderRadius: "12px", border: "1px solid #4a2f22" }}>
                  <h3 style={{ color: "#e67e22" }}>Misión</h3>
                  <p style={{ color: "#c9b6a0" }}>
                    Proveer soluciones tecnológicas accesibles que simplifiquen la administración 
                    del dinero y fomenten hábitos financieros saludables.
                  </p>
                </div>
              </article>

              <article className="col-md-6">
                <div className="p-4 h-100" style={{ background: "#3d261b", borderRadius: "12px", border: "1px solid #4a2f22" }}>
                  <h3 style={{ color: "#e67e22" }}>Visión</h3>
                  <p style={{ color: "#c9b6a0" }}>
                    Consolidarnos como la plataforma de referencia en educación y gestión financiera 
                    en América Latina, impactando positivamente a millones de usuarios.
                  </p>
                </div>
              </article>

            </div>

          </div>
        </section>

        

        {/* TEAM */}
        <section className="py-5 px-3" style={{ background: "#2d1b13" }} aria-label="Equipo">

          <div className="container text-center">

            <h2 className="fw-bold mb-5" style={{ color: "#e67e22" }}>
              Nuestro equipo
            </h2>

            <div className="row g-4">

              {[
                { name: "Ana Martínez", role: "Desarrolladora Frontend", img: "/img/mujer_diseño.jpg" },
                { name: "Carlos Rodríguez", role: "Tecnologia", img: "/img/Gates_bill.jpg" },
                { name: "Luis Fernández", role: "Desarrollador Backend", img: "/img/Steve-Jobs.jpg" }
              ].map((member, i) => (
                <article className="col-md-4" key={i}>
                  <div className="card border-0" style={{ background: "#3d261b", border: "1px solid #4a2f22" }}>

                    <img
                      src={member.img}
                      className="card-img-top"
                      alt={`Foto de ${member.name}`}
                      loading="lazy"
                      style={{ borderBottom: "1px solid #4a2f22" }}
                    />

                    <div className="card-body">
                      <h3 className="h5" style={{ color: "#e67e22" }}>{member.name}</h3>
                      <p style={{ color: "#c9b6a0" }}>{member.role}</p>
                    </div>

                  </div>
                </article>
              ))}

            </div>

          </div>
        </section>

      </div>
    </main>
  );
};