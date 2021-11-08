import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";

const ConvertedTextDetails = () => {
  const location = useLocation();
  //const width = "40px";

  return (
    <div>
      <Row>
        <Col>
          <div style={{ position: "relative", top: "0", left: "0" }}>
            <img
              style={{
                maxHeight: "30rem",
                maxWidth: "30rem",
                position: "relative",
                top: "0",
                left: "0",
              }}
              src={location.state.imageData}
            />
            {/* <div
              style={{
                position: "absolute",
                left: "300px",
                top: "0px",
                zIndex: "1000",
                width: `${width}`,
                backgroundColor: "#92AD40",
                padding: "5px",
                color: "white",
                fontWeight: "bold",
                opacity: "0.6",
              }}
            ></div> */}
          </div>
        </Col>
        <Col>
          <h1>Do Comments Here</h1>
          {/* A place where all of the OCR identified text can be put
              A place where all of the translated text can be put
              A button with the volume icon (preferably small and square) that 
              allows the user to press the button and we will play the mp3 file. */}
        </Col>
      </Row>
    </div>
  );
};

export default ConvertedTextDetails;
