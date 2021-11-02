import React, { useState } from "react";
import { Button, Row, Col, Form, Dropdown } from "react-bootstrap";

const ImageUploadForm = () => {
  const [uploaded_pic, setUploadedPic] = useState();
  // eslint-disable-next-line
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // eslint-disable-next-line
  const [isChecked, setChecked] = useState(false);

  const handlePhotoUpload = (event) => {
    setUploadedPic(URL.createObjectURL(event.target.files[0]));
  };

  const selectLanguage = (event) => {
    setSelectedLanguage(event);
    console.log("selected language is " + event);
  };

  const isSpeechtoText = (event) => {
    console.log("isChecked: " + event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Row>
        <h1>
          Upload a pic and get the text translated to your preferred language!
        </h1>
      </Row>
      <Row style={{ marginTop: "2rem" }}>
        <Col>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                onChange={handlePhotoUpload}
                type="file"
                accept="image/gif, image/jpeg, image/png"
              />
            </Form.Group>
          </Form>

          <Row>
            <Col>
              <Dropdown onSelect={selectLanguage}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Choose Language
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="english">English</Dropdown.Item>
                  <Dropdown.Item eventKey="hindi">Hindi</Dropdown.Item>
                  <Dropdown.Item eventKey="chinese (simplified)">
                    Chinese (Simplified)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  onChange={isSpeechtoText}
                  label="Text to speech"
                />
              </Form.Group>
            </Form>
          </Row>
        </Col>
        <Col>
          <img
            style={{ height: "10rem", width: "auto", textAlign: "center" }}
            src={uploaded_pic}
            alt="uploaded pic"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "2rem" }}>
        <Button variant="dark">Convert Image Text</Button>
      </Row>
    </div>
  );
};

export default ImageUploadForm;
