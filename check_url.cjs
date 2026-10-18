const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(url, res.statusCode);
      resolve(res.statusCode);
    }).on('error', (e) => {
      console.log(url, e.message);
      resolve(null);
    });
  });
}

checkUrl('https://loremflickr.com/800/800/bathroom,hardware');
