import React, { useState } from "react";
import { Button, Row, Col, Form, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ImageUploadForm = () => {
  let history = useHistory();
  const [uploaded_pic, setUploadedPic] = useState();
  // eslint-disable-next-line
  const [selectedLanguage, setSelectedLanguage] = useState();
  // eslint-disable-next-line
  const [isChecked, setChecked] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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
    " Haitian Creole",
    "Hausa",
  ];

  const dropdown = languageArray.map((item) => (
    <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
  ));

  const handlePhotoUpload = (event) => {
    if (event.target.files.length !== 0) {
      setUploadedPic(URL.createObjectURL(event.target.files[0]));
    }
  };

  const selectLanguage = (event) => {
    setSelectedLanguage(event);
    console.log("selected language is " + event);
  };

  const isSpeechtoText = (event) => {
    console.log("isChecked: " + event.target.checked);
    setChecked(event.target.checked);
  };

  const handleSubmit = () => {
    console.log("handle submit clicked");

    // This is where frontend makes request to backend
    console.log("Selected langauge is: " + selectedLanguage)
    console.log("Image: " + uploaded_pic);


    if (uploaded_pic === undefined) {
      alert("Please upload a pic");
    } else if (selectedLanguage === undefined || selectLanguage === "") {
      alert("Please choose a language you wish to convert the text to.");
    } else {
      history.push({
        pathname: "/details",
        state: {
          imageData: uploaded_pic,
        },
      });
    }
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
                  {showLanguage()}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{ maxHeight: "20rem", overflowY: "auto" }}
                >
                  {dropdown}
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
          <div style={{ maxWidth: "30rem" }}>
            <img
              style={{
                maxHeight: "10rem",
                maxWidth: "30rem",
                textAlign: "center",
              }}
              src={uploaded_pic}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "2rem" }}>
        <Button variant="dark" onClick={handleSubmit}>
          Convert Image Text
        </Button>
      </Row>
    </div>
  );
};

export default ImageUploadForm;
