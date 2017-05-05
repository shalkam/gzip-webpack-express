const path = require('path');
const express = require('express');
const app = express();

// app.get('*.js', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });
// app.get('*.css', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.get('*', function(req, res) {
  res.send(
    `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="/assets/styles.css" />
        </head>

        <body>
          <div id="app"></div>
          <script src="/assets/bundle.js" ></script>
        </body>
      </html>
    `
  );
});
app.listen(9000, () => {
  console.log(`server listening at port 9000`);
});
