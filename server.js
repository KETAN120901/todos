require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));
const PORT=process.env.PORT || 3000;
// Catch-all route that serves the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });