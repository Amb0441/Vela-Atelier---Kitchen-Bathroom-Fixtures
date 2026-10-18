const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
const originalUrls = {
  heroImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  antiqueImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  nessoImg: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=800&q=80',
  tilesImg: 'https://images.unsplash.com/photo-1523413651479-59cb1f1f6d9e?auto=format&fit=crop&w=800&q=80',
  entryPullImg: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80',
  featureImg: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
  consultVirtualImg: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  consultShowroomImg: 'https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&w=800&q=80',
  helpCentreImg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
  ziggyPullImg: 'https://images.unsplash.com/photo-1584622781867-275d4546c240?auto=format&fit=crop&w=800&q=80',
  kitchenMenuImg: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80',
  sink1Img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  sink2Img: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=800&q=80',
  sink3Img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  bathroomMenuImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
  waste1Img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  waste2Img: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=800&q=80',
  waste3Img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  laundryMenuImg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
  outdoorMenuImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
  cabinetryImg: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80'
};

for (const [key, url] of Object.entries(originalUrls)) {
  const regex = new RegExp(`const ${key} = 'https:\\/\\/picsum\\.photos\\/seed\\/${key}\\/800\\/800';`, 'g');
  appContent = appContent.replace(regex, `const ${key} = '${url}';`);
}

fs.writeFileSync('src/App.tsx', appContent, 'utf8');

let studioContent = fs.readFileSync('src/components/PlanningStudio.tsx', 'utf8');
studioContent = studioContent.replace(/const waste1Img = 'https:\/\/picsum\.photos\/seed\/waste1Img\/800\/800';/g, "const waste1Img = 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80';");
studioContent = studioContent.replace(/const waste2Img = 'https:\/\/picsum\.photos\/seed\/waste2Img\/800\/800';/g, "const waste2Img = 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80';");
studioContent = studioContent.replace(/const waste3Img = 'https:\/\/picsum\.photos\/seed\/waste3Img\/800\/800';/g, "const waste3Img = 'https://images.unsplash.com/photo-1542013936693-8848e574047a?auto=format&fit=crop&w=800&q=80';");
fs.writeFileSync('src/components/PlanningStudio.tsx', studioContent, 'utf8');
