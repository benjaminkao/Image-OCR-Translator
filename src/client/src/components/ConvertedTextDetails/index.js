import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
  Button,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { BsMicFill } from "react-icons/bs";

const ConvertedTextDetails = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const location = useLocation();
  //const width = "40px";

  const languageArray = [
    "Afrikaans",
    "Albanian",
    "Arabic",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chichewa",
    "Chinese",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Filipino",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "German",
    "Greek",
    "Haitian Creole",
    "Hausa",
  ];

  const selectLanguage = (event) => {
    setSelectedLanguage(event);
    console.log("selected language is " + event);
  };
  const showLanguage = () => {
    let text = "";

    if (selectedLanguage !== undefined) {
      text = selectedLanguage;
    } else {
      text = "Choose Language";
    }

    return text;
  };

  const dropdown = languageArray.map((item) => (
    <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
  ));

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
          <div
            style={{
              margin: "0 auto",
              width: "100%",
            }}
          >
            <Row>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Vision Api identified Text
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Col>
                <Row>
                  <Col>
                    <Dropdown onSelect={selectLanguage}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {showLanguage()}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{ maxHeight: "15rem", overflowY: "auto" }}
                      >
                        {dropdown}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Button style={{ marginLeft: "2.5rem" }} variant="dark">
                      Text To Speech{" "}
                      <BsMicFill style={{ marginBottom: "0.3rem" }} />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Translated Text
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ConvertedTextDetails;
