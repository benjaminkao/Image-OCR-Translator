import React from "react";
import { Helmet } from "react-helmet";
import ConvertedTextDetails from "../components/ConvertedTextDetails";

export const DetailsPage = () => {
  return (
    <div>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Translated Text</title>
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
          <ConvertedTextDetails />
        </div>
      </div>
    </div>
  );
};
