import React from "react";

const Card = (props) => {
  return (
    <React.Fragment>
      <div className="card text-center">
        <img className="card-img-top" src={props.data.img} alt="med" />
        <div className="card-body">
          <h5 className="card-title">{props.data.title}</h5>
          <p className="card-text">Precio {props.data.price}</p>
          <a href={props.data.link} className="btn btn-primary">
            Ir al sitio
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
