import numbro from 'numbro'
import moment from 'moment'

export function dateFormat(date) {
  if (!date) return 'error date'
  return moment(date).format('YYYY/M/D H:m')
}

export function numberFormat(num) {
  const result = num ?? 0
  return numbro(result).format({
    thousandSeparated: true,
    trimMantissa: true,
    mantissa: 2
  })
}

export function buildFullPath(relativeURL) {
  return (
    process.env.VUE_APP_BASE_API.replace(/\/+$/, '') +
    '/' +
    relativeURL.replace(/^\/+/, '')
  )
}

export function getImage(image) {
  const name = image?.__toString ?? image
  if (/^http/.test(name)) return name

  return `${process.env.VUE_APP_BASE_API.replace(
    /\/+$/,
    ''
  )}/uploads/images/${name}`
}

/**
 * get the value in Object or Array
 * key include "." to separate
 * @param {Object | Array} arg
 * @param {String} key
 * @returns {String | null}
 */
export function getValue(arg, prop) {
  if (typeof arg !== 'object' || typeof prop !== 'string') return null

  const keys = prop.split('.')

  let result = arg

  for (const key of keys) {
    result = result?.[key]
    if (!result) break
  }

  return result ?? null
}
