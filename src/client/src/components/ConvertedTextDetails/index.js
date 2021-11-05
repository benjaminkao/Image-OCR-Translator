import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";

const ConvertedTextDetails = () => {
  const location = useLocation();

  return (
    <div>
      <Row>
        <Col>
          <div>
            <img
              style={{ maxHeight: "30rem", maxWidth: "30rem" }}
              src={location.state.imageData}
            />
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
