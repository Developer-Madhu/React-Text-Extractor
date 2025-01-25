// const express = require('express');
// const fileUpload = require('express-fileupload')
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const cors = require('cors');
// const path = require('path')
// const fs = require('fs');

// const app = express();
// const PORT = 5000;

// // app.use(cors());
// // const filePath = path.join(__dirname, 'test', 'data', '05-versions-space');


// app.use(cors());
// app.use('/', express.static('uploads'))
// app.use(fileUpload())

// const upload = multer({
//   storage: multer.memoryStorage(), // Store file in memory for easier parsing
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// });

// // Route to upload and process PDF
// app.post("/", upload.single("pdf"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No PDF file uploaded" });
//   }

//   try {
//     const fileBuffer = req.file.buffer; // Get the uploaded file buffer
//     const pdfData = await pdfParse(fileBuffer); // Extract text from PDF
//     return res.send({ text: pdfData.text }); // Send extracted text as response
//   } catch (error) {
//     console.error("Error extracting text from PDF:", error);
//     return res.status(500).json({ error: "Failed to extract text from PDF" });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js'); // OCR library for images
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/', express.static('uploads'));
app.use(fileUpload());

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const upload = multer({
  // storage: multer.memoryStorage(), // Store file in memory for easier parsing
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 5MB
});

const extractTextFromImage = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    tesseract.recognize(
      imageBuffer,
      'eng', // Language for OCR
      {
        logger: (m) => console.log(m), // Optional logging
      }
    )
      .then(({ data: { text } }) => resolve(text))
      .catch((error) => reject(error));
  });
};

// Route to upload and process files (PDF or image)
app.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    fs.readFile('example.pdf', (err, data) => {
      if (err) {
        console.error("Error reading PDF:", err);
        return;
      }
    
      pdfParse(data).then((pdfData) => {
        console.log("Extracted text from PDF:", pdfData.text);
      }).catch((error) => {
        console.error("Error extracting PDF text:", error);
      });
    });
    // const fileBuffer = req.file.buffer;
    // const fileExtension = path.extname(req.file.originalname).toLowerCase();

    // // If file is a PDF, extract text using pdf-parse
    // if (fileExtension === '.pdf') {
    //   const pdfData = await pdfParse(fileBuffer);
    //   return res.send({ text: pdfData.text });

    // // If file is an image, extract text using Tesseract.js
    // } else if (['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
    //   const extractedText = await extractTextFromImage(fileBuffer);
    //   return res.send({ text: extractedText });

    // } else {
    //   return res.status(400).json({ error: "Unsupported file type. Please upload a PDF or an image (JPG, JPEG, PNG)." });
    // }
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ error: "Failed to extract text from the file" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
