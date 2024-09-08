import { APP } from '@/shared/App'
import { verifyToken } from '@/helper/verifyToken'

export type PostResponseType = {
  message: string
}

// http://127.0.0.1:8000/api/posts?query=fuga&page=4
export async function getPostsHttp(page: number, query: string) {
  const { headers } = verifyToken()
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${APP.apiURL}/posts?page=${page}&query=${query}`, {
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
