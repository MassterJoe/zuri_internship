const express = require('express');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  const slack_name = req.query.slack_name;
  const track = req.query.track;

  if (!slack_name || !track) {
    return res.status(400).json({ error: 'Both slack_name and track are required.' });
  }

  // Get the current local time
  const currentLocalTime = moment();

  // Subtract 1 hour to get the corresponding UTC time
  const utcTime = currentLocalTime.subtract(1, 'hours').utc();

  const data = {
    slack_name: slack_name,
    current_day: moment().format('dddd'),
    utc_time: utcTime.format('YYYY-MM-DDTHH:mm:ss[Z]'),
    track: track,
    github_file_url: 'https://github.com/MassterJoe/zuri_internship/blob/main/app.js',
    github_repo_url: 'https://github.com/MassterJoe/zuri_internship',
    status_code: 200,
  };

  res.status(200).json(data);
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
