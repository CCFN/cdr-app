/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    env: {
      baseURL: 'http://41.242.50.194:2090/cdr/api/',
      NEXTAUTH_SECRET: '71OJ4KWqjyqR9yGYp5EXKmmr0VKEIZaMNn6ReaMLdcqg=',
      NEXTAUTH_URL: 'http://localhost:3000'
    },
  }
