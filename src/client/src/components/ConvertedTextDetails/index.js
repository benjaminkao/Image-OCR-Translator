import React, { useState, useEffect } from "react";
import { Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { BsMicFill } from "react-icons/bs";

const ConvertedTextDetails = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [textToSpeechUrl, setTextToSpeechUrl] = useState();
  const [tempData, setTempData] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  );
  const location = useLocation();
  //const width = "40px";

  let languageArray = [];
  if (location != undefined) {
    languageArray = location.state.dropdownLanguages;
  }

  const selectLanguage = (event) => {
    setSelectedLanguage(event);
    console.log("selected language is " + event);
  };

  const showLanguage = () => {
    let text = "";

    if (selectedLanguage !== undefined) {
      text = selectedLanguage;
    } else {
      let language = location.state.selectedLanguage;
      if (language !== undefined) {
        text = location.state.selectedLanguage;
      } else {
        text = "Choose Language";
      }
    }

    return text;
  };

  const dropdown = languageArray.map((item) => (
    <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
  ));

  const textToSpeech = () => {
    fetch("api/text-to-speech/testAudio")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("inside text to speech fetch function");
          setTextToSpeechUrl(result.url);
          console.log(textToSpeechUrl);
          let audio = new Audio(textToSpeechUrl);
          audio.play();
        },
        (error) => {
          console.log("error: " + error);
        }
      );
  };

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
              textAlign: "left",
              marginLeft: "7rem",
            }}
          >
            <Row>
              <Form.Group>
                <Form.Label
                  style={{
                    color: "#000000",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    marginTop: "1rem",
                  }}
                >
                  Vision API Identified Text
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  required
                  className="input-field"
                  style={{
                    border: "1px",
                    backgroundColor: "#bdc3c7",
                  }}
                  readOnly
                  value={tempData}
                />
              </Form.Group>
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
                    <Button
                      style={{ marginLeft: "2.5rem" }}
                      onClick={textToSpeech}
                      variant="dark"
                    >
                      Text To Speech
                      <BsMicFill style={{ marginBottom: "0.3rem" }} />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <Form.Group>
                <Form.Label
                  style={{
                    color: "#000000",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    marginTop: "1rem",
                  }}
                >
                  Translated Text
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  required
                  className="input-field"
                  style={{
                    border: "1px",
                    backgroundColor: "#2ecc71",
                  }}
                  readOnly
                  value={tempData}
                />
              </Form.Group>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ConvertedTextDetails;
