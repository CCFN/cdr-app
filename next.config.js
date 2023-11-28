/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    env: {
      baseURL: 'https://api.stateserver.org/cdr/api/',
      NEXTAUTH_SECRET: '71OJ4KWqjyqR9yGYp5EXKmmr0VKEIZaMNn6ReaMLdcqg=',
      NEXTAUTH_URL: 'https://stateserver.org'
    },
  }
