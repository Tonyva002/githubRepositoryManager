import React, { useState, useEffect } from "react";

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [search, setSearch] = useState("js");

  // Funcion para cargar repositorios por defecto
  useEffect(() => {
    loadRepository();
  }, [search]);

  // Funcion para buscar repositorio por el input
  const clickEnter = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  
  };

  // Funcion para buscar repositorio por el boton
  const clickSearch = (e) => {
    setSearch(e.target.value);
  };

  // Funcion para conectarte al API de github
  async function loadRepository() {
    const url =
      "https://api.github.com/search/repositories?q=" +
      search +
      "+in:full_name&type=Repositories&sort=score&order=desc&per_page=6";
    const headers = { Accept: "application/vnd.github.cloak-preview" };
    const response = await fetch(url, { method: "GET", headers: headers });
    const result = await response.json();

    if (result.items != null) {
      setRepositories(result.items);
    } else {
      setRepositories([]);
    }
  }

  // Funcion para validar si los campos estan vacio.
  const isEmpty = (e) => {
    if (e == null) {
      return "Sin informacion";
    }
    return e;
  };

  //Funcion para navegar a colaboradores
  const goToCollaborators = (event, id) => {
    if (localStorage != null) {
      localStorage.setItem("linkCollaborators", id);
      window.location = "/collaborators";
    } else {
      alert("Don't has collaborators");
    }
  };

  return (
    <div className="row">
      {/* Encabezado de la pagina */}
      <div className="card-title">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              Repository
            </li>
          </ol>
        </nav>
      </div>

      {/* Buscar por el input */}
      <div className="col-sm-12">
        <div className="input-group mb-3 ">
          <input
            className="form-control"
            type="text"
            autoComplete="off"
            name="buscador"
            onKeyUp={clickEnter}
            placeholder="Buscador"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />

          {/* Buscar por el boton */}
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={clickSearch}
              value="este es el boton"
            >
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </div>

      {/* Tarjeta */}
      {repositories.map((element) => {
        return (
          <div className="col-sm-4" key={element.id}>
            <div className="card text-center mb-3">
              {/* Nombre del repositorio */}
              <div className="card-header">
                <i className="far fa-folder"></i> {isEmpty(element.full_name)}
              </div>

              <div className="card-body">
                <span className="card-title">
                  <div className="row">
                    {/* Cantidad de estrellas */}
                    <div
                      className="card text-white bg-primary mb-3 col-sm-4 m-4"
                      data-tip="Cantidad de estrella"
                    >
                      <div className="row">
                        <div className="col-sm-4 text-center">
                          <i className="fas fa-star"></i>
                        </div>
                        <div className="col-sm-4 text-rigth">
                          <span className="badge badge-light">
                            {element.stargazers_count}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cantidad de problemas */}
                    <div
                      className="card text-white bg-danger mb-3 col-sm-4 m-4"
                      data-tip="Cantidad de problemas"
                    >
                      <div className="row">
                        <div className="col-sm-6 text-center">
                          <i className="fas fa-info-circle"></i>
                        </div>
                        <div className="col-sm-6 text-rigth">
                          <span className="badge badge-light">
                            {element.open_issues_count}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Linea de division */}
                    <div className="col-sm-12">
                      <hr />
                    </div>

                    {/* Lenguaje en que esta hecho el proyecto */}
                    <div
                      className="col-sm-12 text-left p-2"
                      data-tip="Lenguaje de programacion"
                    >
                      <span>
                        <i className="fas fa-language"></i>{" "}
                        {isEmpty(element.language)}
                      </span>
                    </div>

                    {/* Linea de division */}
                    <div className="col-sm-12">
                      <hr />
                    </div>
                  </div>
                </span>

                {/* Descripcion del repositorio */}
                <p className="card-text text-left text-justify">
                  {" "}
                  {isEmpty(element.description)}
                </p>
              </div>

              {/* Link para ir a los colaboradores */}
              <div className="card-footer text-muted">
                <div className="row">
                  <div className="col-sm-6">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={(event) =>
                        goToCollaborators(event, element.contributors_url)
                      }
                    >
                      <i className="fas fa-users"></i>Colaboradores
                    </button>
                  </div>

                  {/* Link para ir al repositorio */}
                  <div className="col-sm-6">
                    <a
                      className="btn btn-link"
                      target="blank"
                      href={element.html_url}
                    >
                      <i className="fas fa-link"></i> Ir al Repositorio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Repositories;
