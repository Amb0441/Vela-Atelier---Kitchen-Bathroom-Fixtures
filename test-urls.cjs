const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534165609653-3f6291a1005b?auto=format&fit=crop&w=800&q=80'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`Status for ${url.substring(35, 55)}: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Error for ${url}: ${e.message}`);
  });
});
