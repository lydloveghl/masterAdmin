export const checkMobile = (mobile: string) => {
  return /^1[3456789]\d{9}$/.test(mobile)
}
