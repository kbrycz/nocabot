// src/config.js

// In production, you might set NEXT_PUBLIC_FLASK_URL in .env
// so you can switch easily, e.g. NEXT_PUBLIC_FLASK_URL=https://api.yourdomain.com
// If none is set, default to localhost

// export const SERVER_BASE_URL =
//   process.env.NEXT_PUBLIC_FLASK_URL || "http://localhost:5000";

  export const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_FLASK_URL || "http://3.131.29.160:5000";