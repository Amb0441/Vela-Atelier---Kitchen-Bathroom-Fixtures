const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('const [isLoggedIn, setIsLoggedIn]')) {
  content = content.replace('const [isLoginHovered, setIsLoginHovered] = useState(false);', 
    'const [isLoginHovered, setIsLoginHovered] = useState(false);\n  const [isLoggedIn, setIsLoggedIn] = useState(false);\n  const mockUser = { name: "Jane Doe", email: "jane@example.com", tradeStatus: "Approved", orders: 3 };');
}

let loginDropdownContent = `
              <div className="flex flex-col py-2">
                {!isLoggedIn ? (
                  <>
                    <button onClick={() => setIsLoggedIn(true)} className="w-full text-left px-6 py-2.5 text-[16px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Sign In</button>
                    <button onClick={() => setIsLoggedIn(true)} className="w-full text-left px-6 py-2.5 text-[16px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Create Account</button>
                    <button className="w-full text-left px-6 py-2.5 text-[16px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Order History</button>
                  </>
                ) : (
                  <>
                    <div className="px-6 py-3 border-b border-gray-100 mb-2">
                      <p className="text-[14px] font-medium text-black">{mockUser.name}</p>
                      <p className="text-[12px] text-gray-500 mb-1">{mockUser.email}</p>
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider rounded-sm">{mockUser.tradeStatus}</span>
                    </div>
                    <button className="w-full text-left px-6 py-2 text-[14px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">My Account</button>
                    <button className="w-full text-left px-6 py-2 text-[14px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Orders ({mockUser.orders})</button>
                    <button className="w-full text-left px-6 py-2 text-[14px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Wishlist</button>
                    <button onClick={() => setIsLoggedIn(false)} className="w-full text-left px-6 py-2 mt-2 border-t border-gray-100 text-[14px] tracking-widest text-red-500 hover:bg-gray-50 transition-colors uppercase font-light">Sign Out</button>
                  </>
                )}
              </div>
`;

content = content.replace(/<div className="flex flex-col py-2">\s*<button className="w-full text-left px-6 py-2.5 text-\[16px\] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Sign In<\/button>\s*<button className="w-full text-left px-6 py-2.5 text-\[16px\] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Create Account<\/button>\s*<button className="w-full text-left px-6 py-2.5 text-\[16px\] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Order History<\/button>\s*<\/div>/, loginDropdownContent);

content = content.replace(/className="relative z-40"/, 'className="relative z-[100]"');
content = content.replace(/className="w-full bg-white text-\[17px\] text-gray-500 flex flex-col md:flex-row justify-between items-center md:items-stretch border-b border-gray-200 tracking-wide font-light relative z-20"/, 'className="w-full bg-white text-[17px] text-gray-500 flex flex-col md:flex-row justify-between items-center md:items-stretch border-b border-gray-200 tracking-wide font-light relative z-[100]"');

fs.writeFileSync('src/App.tsx', content);
console.log('Patched Login Data and Z-Index');
