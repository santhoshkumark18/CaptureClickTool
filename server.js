const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

let captureProcess;

app.use(express.static('frontend'));

// Start capturing clicks
app.get('/start-capture', (req, res) => {
    const url = req.query.url; // Get the URL from the query parameters
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    // Start the capture process with the provided URL
    captureProcess = exec(`node backend/capture_clicks.js ${url}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
    res.json({ message: 'Capture started' });
});

// Stop capturing clicks
app.get('/stop-capture', (req, res) => {
    if (captureProcess) {
        captureProcess.kill();
        res.json({ message: 'Capture stopped' });
    } else {
        res.json({ message: 'No capture process running' });
    }
});

// Generate report
app.get('/generate-report', (req, res) => {
    exec('python backend/generate_report.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.json({ message: 'Report generated' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
