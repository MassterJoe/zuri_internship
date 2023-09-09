const express = require('express');
const moment = require('moment');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    
    const slack_name = req.query.slack_name;
    const track = req.query.track;
    const time = new Date().toISOString();

    const day = moment().format('dddd');
    if (!slack_name || !track) {
        return res.status(400).json({ error: 'Both slack_name and track are required.' });
      }

    const data = {
        message: 'Stage one assignment',
        data: {
            slack_name: slack_name,
            current_day: day,
            utc_time: time,
            track: track,
            github_file_url: ,
            github_repo_url: 'https://github.com/MassterJoe/zuri_internship',
            status_code: '200'
        }
}


    
    
})

app.listen(port, () => {
    console.log('Welcome!');
});