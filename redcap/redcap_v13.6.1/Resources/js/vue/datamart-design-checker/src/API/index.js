import settings from '@/API/modules/settings'
import design from '@/API/modules/design'


export default (context, API) => {
  const api = new API({
      modules: {
        settings,
        design,
      }
  })
  return api
}
