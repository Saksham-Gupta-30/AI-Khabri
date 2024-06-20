const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/news', async (req, res) => {
    const { countryCode, category } = req.query;

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}`, {
            headers: {
                'x-api-key': process.env.NEWS_API
            },
            params: {
                country: countryCode,
                category: category,
                apiKey: process.env.NEWS_API_KEY
            }
        });

        const data = response.data;
        // console.log('Data:', data);

        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;