// pages/api/auth/logout.js

export default async function handler(req, res) {
    // Clear the session or token
    // If you're using cookies:
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0'); // Clear the cookie
  
    // If you're using local storage, handle it on the client-side
  
    return res.status(200).json({ message: 'Logged out successfully' });
  }
  