import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";


const ImageUploadForm = () => {
  let history = useHistory();
  const [uploaded_pic, setUploadedPic] = useState();
  // eslint-disable-next-line
  const [selectedLanguage, setSelectedLanguage] = useState();
  // eslint-disable-next-line
  // const [isChecked, setChecked] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [dropdownLanguages, setDropdownLanguages] = useState([]);
  const [loadingVisibility, setLoadingVisibility] = useState("hidden");

  useEffect(() => {
    fetch("api/text-to-speech/languages")
      .then((res) => res.json())
      .then(
        (result) => {
          var tmp = [];
          Object.keys(result.languages).map(function (key) {
            tmp.push(key);
          });

          setDropdownLanguages(tmp);
        },
        (error) => {
          console.log("error: " + error);
        }
      );
  }, []);

  const dropdown = dropdownLanguages.map((item) => (
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

  // const isSpeechtoText = (event) => {
  //   console.log("isChecked: " + event.target.checked);
  //   setChecked(event.target.checked);
  // };

  const handleSubmit = () => {

    console.log("handle submit clicked");

    // This is where frontend makes request to backend
    console.log("Selected langauge is: " + selectedLanguage);
    console.log("Image: " + uploaded_pic);

    if (uploaded_pic === undefined) {
      alert("Please upload a pic");
    } else if (selectedLanguage === undefined || selectLanguage === "") {
      alert("Please choose a language you wish to convert the text to.");
    } else {
      setLoadingVisibility("visible");

      const formData = new FormData();

      // // Get Image Data
      const imageData = document.querySelector('#formFile').files[0];
      formData.append("file", imageData);
      formData.append("filename", imageData.name);
      formData.append("language", selectedLanguage);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      console.log(formData);
      console.log(formData.get("file"));

      fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setLoadingVisibility("hidden");
          alert("Succesfully uploaded image");
          console.log(response.text.join("\n"));
          console.log(response.translated.join("\n"));
          console.log(response.audio);

          history.push({
            pathname: "/details",
            state: {
              imageData: uploaded_pic,
              imageName: imageData.name,
              selectedLanguage: selectedLanguage,
              dropdownLanguages: dropdownLanguages,
              textData: response.text.join("\n"),
              translatedData: response.translated.join("\n"),
              textToSpeechUrl: response.audio,
            },
          });
        })
        .catch((error) => {
          alert(error);
          console.log(error);
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
          Upload a photo and get the text translated to your preferred language!
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
            <Col xs={3}>
            <h5>
              Translate to:
            </h5>
            </Col>
            <Col xs={5}>
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
                {/* <Form.Check
                  type="checkbox"
                  onChange={isSpeechtoText}
                  label="Text to speech"
                /> */}
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
      <div
        style={{
          position: "absolute",
          transform: "translate(450%, -250%)",
          visibility: `${loadingVisibility}`,
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    </div>
  );
};

export default ImageUploadForm;
