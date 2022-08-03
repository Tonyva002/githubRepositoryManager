import React, { useEffect, useState } from "react";


function Collaborators () {

    const [collaborators, setCollaborators] = useState([]);
    const [top, setTop] = useState(10);
    const [auxCollaborators, setAuxCollaborators] = useState([]);
   

    useEffect( () => {

        loadCollaborators();

    },[]);

   
    const moreCollaborators  = (event) => {
        if ((((setTop(top+5)) - auxCollaborators.length) >= 5) && ((setTop(top+5)) > auxCollaborators.length)){
            alert("Llego al tope");

        }else{
            let arrayAux = [];
            var newTop = top;

            if(((newTop+5) - auxCollaborators.length) < 5){
                var auxTop = (auxCollaborators.length - newTop);
                newTop +=  auxTop;

            }else {
                newTop +=  5;
            }

            for(let i = 0; i < newTop; i++){

                arrayAux.push(setAuxCollaborators[i]);
            }

        }

    }

    async function loadCollaborators(){

        const url = localStorage.getItem("linkCollaborators");
        const headers = {"Accept": "application/vnd.github.hellcat-preview+json"}
        const response = await fetch(" "+ url + "", {"method":"GET","headers": headers});
        const result = await response.json();
        let arrayAux = [];

        if(result.lenght < 10){
            arrayAux = result;

        }else{

            for (let i = 0; i < 10 ; i++) {
                arrayAux.push(result[i]);
            }
        }
        setCollaborators(arrayAux);
        setAuxCollaborators(result);

    }

        return (
            <div className="row">
                <div className="card bg-light mb-3 ">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#" className="card-link">Repositories</a></li>
                            <li className="breadcrumb-item active" aria-current="page"><a href="#" className="card-link">Collaborators</a></li>
                        </ol>
                    </nav>
                </div>

                {collaborators.map((element) => {
                    return (
                        <div className="col-md-4" key={element.id}>
                            <div className="card mb-3 width-card">
                                <div className="card-header" data-tip="Nombre del colaborador">
                                    <i className="far fa-user"></i> {element.login}
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={element.avatar_url} className="card-img" alt="Avatar" />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <span>Contributions: {element.contributions}</span>
                                            <p className="card-text"><a href={element.html_url}>Ir al perfil</a></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    );

                })}

                <div className="col-md-12 text-center">
                    <button className="btn btn-primary btn-block" onClick={moreCollaborators}>
                    <i className="fas fa-angle-down"></i>Obtener más</button>
                </div>
            </div>
        );

    }        

export default Collaborators;