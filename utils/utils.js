export const nameFinder = (targetObject, name) => {
  let titleToChange = name.replace(' ', '_').toLowerCase()
  let _i = 0
  while (Object.keys(targetObject).includes(titleToChange) !== false) {
    titleToChange = `${titleToChange}${_i}`
    _i += 1
  }
  return titleToChange
}
