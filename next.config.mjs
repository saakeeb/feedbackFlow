/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const nextConfig = {
  // Strict mode for reliable React hydration and component lifecycle
  reactStrictMode: true,

  // Enterprise Security: Remove X-Powered-By header to prevent fingerprinting
  poweredByHeader: false,

  // Production HTTP payload compression (Gzip / Brotli)
  compress: true,

  // Disable shipping source maps to production browsers (smaller payload, security protection)
  productionBrowserSourceMaps: false,

  // Compiler-level dead code, test attribute, and console elimination
  compiler: {
    removeConsole: isProd
      ? {
          exclude: ['error', 'warn'],
        }
      : false,
    reactRemoveProperties: isProd
      ? {
          properties: ['^data-testid$', '^data-test$'],
        }
      : false,
  },

  // Package import optimization: aggressive tree-shaking for large icon & utility libraries
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },

  // Turbopack configuration for fast builds and native tree shaking
  turbopack: {},

  // Remote image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Enterprise HTTP Security Headers (IBM production standard)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Permanent URL migrations & SEO preservation
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/app',
        permanent: true,
      },
      {
        source: '/dashboard/topics',
        destination: '/app/feedback',
        permanent: true,
      },
      {
        source: '/dashboard/topics/new',
        destination: '/app/feedback',
        permanent: true,
      },
      {
        source: '/dashboard/topics/:id',
        destination: '/app/feedback/:id',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/feedback',
        destination: '/app/feedback',
        permanent: true,
      },
      {
        source: '/meetings',
        destination: '/app/meetings',
        permanent: true,
      },
    ];
  },

  // Production-grade Webpack tree-shaking and dead code elimination
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
      };
    }
    return config;
  },
};

export default nextConfig;
