const utilValidatePhone = (phone: number | string): boolean => {
  const rule = /^[1][3-9][\d]{9}$/
  return rule.test(phone.toString())
}

export { utilValidatePhone }
