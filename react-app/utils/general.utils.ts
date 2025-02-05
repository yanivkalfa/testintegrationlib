export const convertToBase64 = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str)
  const base64String = btoa(String.fromCharCode(...utf8Bytes))
  return base64String
}

export const formatWoundedId = (id: string): string => {
  return `${id.slice(0, 2)}-${id.slice(2, 5)}-${id.slice(5, 8)}-${id.slice(8, 11)}`
}