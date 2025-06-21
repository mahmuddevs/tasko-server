export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email.trim().toLowerCase())
}