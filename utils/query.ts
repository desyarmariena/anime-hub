export const createQueryString = (
  currentParams: string,
  name: string,
  value: string,
) => {
  const params = new URLSearchParams(currentParams)
  params.set(name, value)

  return params.toString()
}
