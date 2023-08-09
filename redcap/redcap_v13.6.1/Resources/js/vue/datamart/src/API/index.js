
import revisions from '@/API/modules/revisions'

export default (context, API) => {

  const api = new API({
    modules: {
        revisions,
    },
  })


  api.getExportURL = (options={}) => {
    const route = 'DataMartController:exportRevision'
    options.route = route
    // get the pid from the URL
    const searchParams = new URLSearchParams(location.search)
    options.pid = searchParams.get('pid')
    const queryParams = new URLSearchParams()
    for(let[key, value] of Object.entries(options)) {
      // append arrays the right way
      if(Array.isArray(value)) value.forEach(element => queryParams.append(`${key}[]`, element))
      else queryParams.append(key, value)
    }
    const query = queryParams.toString()
    const url = `${api.baseURL}?${query}`
    return url
  }

  /**
   * visitor. not needed here
   * @param {object} params
   * @returns modified paramsobject
   */
   // api.visitDefaultQueryParams = (params) => params

  return api
}
