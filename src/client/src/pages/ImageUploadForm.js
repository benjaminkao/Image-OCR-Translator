import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

const ImageUploadForm = () => {
  return (
    <div>
      <Row>
        <Col>
          <Form>
            <Form.Label style={{ fontSize: "1.5rem" }}>
              Upload an image
            </Form.Label>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                accept="image/gif, image/jpeg, image/png"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ImageUploadForm;