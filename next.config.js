// next.config.js

// module.exports = {
//     env: {
//       NEXT_PUBLIC_API_URL: 'http://localhost:3000',
//     },
//   };
  

// next.config.js
module.exports = {
  reactStrictMode: true,
  // Disable app directory (App Router) if it's accidentally enabled
  experimental: {
    appDir: false,
  },
};
