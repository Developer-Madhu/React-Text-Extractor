import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile && !pdfFile) {
      alert("Please select an image or a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile); 
    }
    if (pdfFile) {
      formData.append("pdfFile", pdfFile); 
    } 
    try {
      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result); // Process the result (extracted text)
      } else {
        console.error("Error:", res.statusText);
      }

      const data = await res.json();
      setResponse(data.text);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file. Please try again.");
    }
  };

  const handleRemove = () => {
    setImageFile(null);
    setPdfFile(null);
    setResponse(null);
  };

  return (
    <div className="upload-container">
    
      <div className="upload-section">
        <h2 className="upload-title">Upload Image</h2>
        <div className="upload-box">
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded preview"
              className="uploaded-preview"
            />
          ) : (
            <label className="upload-label">
              <input type="file" accept="image/*" onChange={handleImageChange} className="upload-input" />
              <div className="upload-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="upload-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5v-9m0 9l-3.75-3.75M12 16.5l3.75-3.75M9.75 12.75L12 16.5m0-12A4.5 4.5 0 0112 21a4.5 4.5 0 010-9z"
                  />
                </svg>
                <span>Upload Image</span>
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="upload-section">
        <h2 className="upload-title">Upload PDF</h2>
        <div className="upload-box">
          {pdfFile ? (
            <div className="uploaded-pdf-preview">
              <span>{pdfFile.name}</span>
            </div>
          ) : (
            <label className="upload-label">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="upload-input"
              />
              <div className="upload-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="upload-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 16.5v-6m0 0l-3 3m3-3l3 3m6-9v12m0-12l-3 3m3-3l3 3"
                  />
                </svg>
                <span>Upload PDF</span>
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="ebtn">
        <button className="eb1" onClick={handleUpload}>
          Upload
        </button>
        <button className="eb2" onClick={handleRemove}>
          Remove
        </button>
      </div>
      {response && (
        <div className="response-section">
          <h3>Uploaded Files:</h3>
          <ul>
            {response.files.map((file, index) => (
              <li key={index}>
                {file.filename} (ID: {file.image_id || file.pdf_id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
