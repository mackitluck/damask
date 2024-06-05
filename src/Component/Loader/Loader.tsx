import React from 'react';
import Cupcake from "../../Assets/img/cupcake.svg";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="wrapper">
          <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
