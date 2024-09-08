import { APP } from '@/shared/App'
import { verifyToken } from '@/helper/verifyToken'

export type UserIsLoggedInResponseType = {
  message: string
}

export async function userIsLoggedInPostHttp() {
  const { headers } = verifyToken()
  return new Promise<UserIsLoggedInResponseType>(async (resolve, reject) => {
    const res = await fetch(`${APP.apiURL}/user/check/`, {
      method: 'GET',
      headers: headers
    })
    const data = await res.json()

    if (!res.ok) {
      reject(data)
    }
    resolve(data)
  })
}
