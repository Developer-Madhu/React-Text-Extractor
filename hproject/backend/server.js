
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse'); // Import pdf-parse
const path = require('path');
const fs = require('fs');

const app = express();
const cors = require('cors');
app.use(cors());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});
const upload = multer({ storage }); // Initialize Multer

app.post('/home', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = path.join(__dirname, req.file.path);

        // Check file type
        const fileExtension = path.extname(req.file.originalname).toLowerCase();

        if (fileExtension === '.pdf') {
            // Handle PDF file
            const fileBuffer = fs.readFileSync(filePath);

            pdfParse(fileBuffer)
                .then((pdfData) => {
                    res.json({ extractedText: pdfData.text });

                    // Delete the uploaded file
                    fs.unlink(filePath, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                })
                .catch((error) => {
                    console.error('Error processing PDF:', error);
                    res.status(500).json({ error: 'Failed to process PDF' });
                });
        } else {
            // Handle image file with Tesseract.js
            const imageBuffer = fs.readFileSync(filePath);

            Tesseract.recognize(imageBuffer, 'eng', { logger: (info) => console.log(info) })
                .then(({ data: { text } }) => {
                    res.json({ extractedText: text });

                    // Delete the uploaded file
                    fs.unlink(filePath, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                })
                .catch((error) => {
                    console.error('Error during OCR:', error);
                    res.status(500).json({ error: 'Failed to process image' });
                });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5000, () => {
    console.log('Connected to port successfully');
});
