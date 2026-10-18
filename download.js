import https from 'https';
import fs from 'fs';
import path from 'path';

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filename).then(resolve).catch(reject);
      }
      
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {}); // Delete the file async
      console.error(`Error downloading ${url}:`, err.message);
      reject(err);
    });
  });
};

const images = [
  { url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop', name: 'hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop', name: 'antique.jpg' },
  { url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop', name: 'nesso.jpg' },
  { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop', name: 'tiles.jpg' },
  { url: 'https://images.unsplash.com/photo-1628012209120-7f28876fe0a4?q=80&w=600&auto=format&fit=crop', name: 'entry_pull.jpg' },
  { url: 'https://images.unsplash.com/photo-1604709177227-3f51eb7b68e5?q=80&w=800&auto=format&fit=crop', name: 'feature.jpg' }
];

const main = async () => {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const img of images) {
    const filePath = path.join(publicDir, img.name);
    await downloadImage(img.url, filePath);
  }
};

main();
