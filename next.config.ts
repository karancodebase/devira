import { createCivicAuthPlugin } from "@civic/auth/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID"
});

export default withCivicAuth(nextConfig)

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: ['http://localhost:3000'],
    },
  },
}