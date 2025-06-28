import express from 'express';
import cors from 'cors';
import { demoData, computeSum } from './data';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Splinde Challenge API is running' });
});

app.get('/api/data', (req, res) => {
    try {
        const computedData = computeSum(demoData);
        res.json({
            data: computedData,
            totalSum: computedData.computedSum
        });
    } catch (error) {
        console.error('Error computing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/data/raw', (req, res) => {
    try {
        res.json({ data: demoData });
    } catch (error) {
        console.error('Error serving raw data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   - GET /api/data (computed sums)`);
    console.log(`   - GET /api/data/raw (original data)`);
    console.log(`   - GET /health (health check)`);
}); 