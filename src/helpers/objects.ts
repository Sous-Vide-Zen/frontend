export const fillObjValues = (src: object, dest: object) => {
  for (const i in src) {
    // @ts-ignore
    dest[i] = src[i]
  }
}