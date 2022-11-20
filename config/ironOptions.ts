export default {
  cookieName: 'siwe',
  password: process.env?.IRON_OPTIONS_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}