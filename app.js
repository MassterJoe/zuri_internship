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

  // Get the current UTC time
  const currentUtcTime = new Date();

  // Adjust the time within a +/-2 minute window
  const minOffset = -2; // -2 minutes
  const maxOffset = 2; // +2 minutes
  const adjustedTime = new Date(currentUtcTime.getTime() + Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset * 60000);

  // Format the adjusted time in the required format
  const formattedTime = moment.utc(adjustedTime).format('YYYY-MM-DDTHH:mm:ss[Z]');

  const data = {
    slack_name: slack_name,
    current_day: moment().format('dddd'),
    utc_time: formattedTime,
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
