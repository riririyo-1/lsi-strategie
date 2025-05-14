// dotenvを使用して.envファイルを明示的に読み込む
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  serverRuntimeConfig: {
    // サーバーサイドでのみ利用可能な設定
  },
  publicRuntimeConfig: {
    // クライアントとサーバーサイドで利用可能な設定
    port: process.env.PORT || '3000',
  },
};

module.exports = nextConfig;
