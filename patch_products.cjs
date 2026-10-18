const fs = require('fs');

const replacement = `className="group relative flex flex-col h-full bg-white cursor-pointer"
                  >
                    <div className="aspect-square bg-[#f8f8f8] flex items-center justify-center p-6 mb-4 relative overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                        className={\`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-all z-10 \${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}\`}
                      >
                        <Heart size={18} strokeWidth={1.5} fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="flex flex-col mt-auto px-2 pb-4">
                      <span className="text-[14px] text-gray-500 font-light tracking-wide mb-1 uppercase line-clamp-2 leading-snug h-10">{product.title}</span>
                      <span className="text-lg font-medium text-black">{formatPrice(product.numericPrice)}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="w-full py-3 bg-white border border-black hover:bg-black hover:text-white text-black text-[13px] tracking-widest uppercase font-medium transition-all text-center"
                    >
                      Add to Project
                    </button>
                  </div>`;

for (let file of ['src/components/ProductsCatalogPage.tsx', 'src/App.tsx']) {
  let content = fs.readFileSync(file, 'utf8');
  let regex = /className="border border-gray-100 hover:shadow-sm rounded-sm p-6 relative group hover:border-gray-300 transition-all cursor-pointer bg-white flex flex-col h-full"(?:[\s\S]*?)id=\{`product-card-\${product\.id}`\}(?:[\s\S]*?)>([\s\S]*?)Add to Project\n\s*<\/button>\n\s*<\/div>/g;
  
  if (file === 'src/App.tsx') {
    regex = /className="border border-gray-100 hover:shadow-sm rounded-sm p-6 relative group hover:border-gray-300 transition-all cursor-pointer bg-white flex flex-col h-full"([\s\S]*?)>([\s\S]*?)Add to Project\n\s*<\/button>\n\s*<\/div>/g;
  }
  
  let updated = content.replace(regex, replacement);
  fs.writeFileSync(file, updated);
}
console.log("Patched");
