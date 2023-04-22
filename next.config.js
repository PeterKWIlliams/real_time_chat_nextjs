/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    UPSTASH_REDIS_REST_URL:`https://eu1-darling-glider-38399.upstash.io`,
    UPSTASH_REDIS_REST_TOKEN:`AZX_ASQgYzc5YTUwZGUtMGQzZi00MTAxLTk5YjgtNWRjYjIyNmI2ZGI1NWYwYTc0ZjU0YTQyNDc4YWFlYzVlZTA0MjkwN2U5OWQ=`
  },
}

module.exports = nextConfig
