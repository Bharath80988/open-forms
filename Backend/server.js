const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/openforms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema for form responses
const formResponseSchema = new mongoose.Schema({
    creatorId: String,             // ID of the form creator
    formId: String,                // Optional: if there are multiple forms per creator
    responses: Object,            // Dynamic form data
    submittedAt: { type: Date, default: Date.now }
});

const FormResponse = mongoose.model('FormResponse', formResponseSchema);

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const { creatorId, formId, formData } = req.body;

    try {
        const response = new FormResponse({
            creatorId,
            formId,
            responses: formData
        });
        await response.save();
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
