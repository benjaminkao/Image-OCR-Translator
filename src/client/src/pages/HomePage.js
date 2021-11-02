import React from "react";
import { Helmet } from "react-helmet";
// import HomeIntro from '../components/HomeIntro';
// import Footer from '../components/Footer';
import ImageUploadForm from "../components/ImageUploadForm";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CSC 847 Group 3</title>
        <meta
          name="description"
          content="This website is made for CSC 847 Group 3 Project"
        />
      </Helmet>
      <div
        class="shadow p-3 mb-5 bg-white rounded"
        style={{
          width: "80rem",
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          marginTop: "4rem",
        }}
      >
        <ImageUploadForm />
      </div>
    </div>
  );
};

export default HomePage;
