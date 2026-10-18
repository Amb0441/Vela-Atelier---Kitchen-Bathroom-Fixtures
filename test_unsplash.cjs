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

async function run() {
  await checkUrl('https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=800&q=80');
  await checkUrl('https://images.unsplash.com/photo-1523413651479-59cb1f1f6d9e?auto=format&fit=crop&w=800&q=80');
}
run();
