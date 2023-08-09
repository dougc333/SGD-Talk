import settings from '@/API/modules/settings'
import fhir from '@/API/modules/fhir'

export default (context, API) => {

  const api = new API({
    modules: {
        settings,
        fhir,
    },
  })

  return api
}