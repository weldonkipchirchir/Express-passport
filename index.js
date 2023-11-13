const app = require('./startup/server');

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
