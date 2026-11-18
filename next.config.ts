import type { NextConfig } from 'next';
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  experimental: { useTypeScriptCli: false },
};
export default config;
