import { APP } from '@/shared/App'
import { verifyToken } from '@/helper/verifyToken'

export type DeleteResponseType = {
  message: string
}

export async function DeletePostsHttp(id: number) {
  const { headers } = verifyToken()
  return new Promise<DeleteResponseType>(async (resolve, reject) => {
    const res = await fetch(`${APP.apiURL}/posts/${id}`, {
      method: 'Delete',
      headers: headers
    })
    const data = await res.json()

    if (!res.ok) {
      reject(data)
    }
    resolve(data)
  })
}
