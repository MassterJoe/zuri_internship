const express = require('express');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    
    const slack_name = req.query.slack_name;
    const track = req.query.track;
    const time = new Date().toISOString();
    const file_url = 'https://github.com/MassterJoe/zuri_internship/blob/main/app.js';
    const repo_url = 'https://github.com/MassterJoe/zuri_internship';
    
    const day = moment().format('dddd');
    if (!slack_name || !track) {
        return res.status(400).json({ error: 'Both slack_name and track are required.' });
      }

    const data = {
            slack_name: slack_name,
            current_day: day,
            utc_time: time,
            track: track,
            github_file_url: file_url ,
            github_repo_url: repo_url,
            status_code: 200
        }
res.status(200).json(data);
 
})
app.listen(port, () => {
    console.log('Welcome!');
});