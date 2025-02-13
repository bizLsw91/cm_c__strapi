export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https://api.github.com","https://proxy-event.ckeditor.com"],
          'script-src': ["'self'", "https://cdn.ckeditor.com"],
          "img-src": [
            "'self'",
            "data:",
            "*",
          ],
          'frame-src': ["'self'", "*"],
          'style-src': ["'self'", "'unsafe-inline'"],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "storage.googleapis.com",
            "http://culturemarketing.co.kr",
            "dl.airtable.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://www.culturemarketing.co.kr','http://localhost:8598','http://127.0.0.1:8598', 'https://cmc-renewal.vercel.app', 'https://storage.googleapis.com'],
      credentials: true  // ✅ 쿠키 전송 허용
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
