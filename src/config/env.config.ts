export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
})
