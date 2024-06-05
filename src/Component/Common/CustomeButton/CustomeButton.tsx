import React from "react";
import Button from "@mui/material/Button";
import { ICustomeButton } from "./CustomeButton.interface";

const CustomeButton = (props: any) => {
  return (
    <Button 
      data-aos={props.animatioName}
      onClick={props.onClick}
      type={props.type}
      id={props.id}
      value={props.value}
      className={props.bg === "fill" ? "fill-btn" : "border-btn"}
      disabled={props.disabled}
      variant={props.bg === "fill" ? "contained" : "outlined"} 
    >
      {
        props.isLoading ? (
          props.bg === "fill" ? 
            <div className="loader-white-wrapper">
              <span className="loader-white"></span>
            </div>
            :
            <div className="loader-black-wrapper">
              <span className="loader-black"></span>
            </div>
        )
        :
        props.children
      }
    </Button>
  );
};

export default CustomeButton;
