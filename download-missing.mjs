import fs from 'fs';
import https from 'https';
import path from 'path';

const images = {
  'hero.jpg': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'antique.jpg': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
  'nesso.jpg': 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
  'tiles.jpg': 'https://images.unsplash.com/photo-1523413651479-797eb2e3a945?auto=format&fit=crop&w=800&q=80',
  'entry_pull.jpg': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
  'feature.jpg': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
};

const download = (filename, url) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(process.cwd(), 'public', filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

const run = async () => {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(filename, url);
    } catch (e) {
      console.error(e);
    }
  }
};

run();
