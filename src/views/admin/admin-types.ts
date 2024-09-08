interface ICreatePostInput {
  title: string
  post_content: string
  image: string
}

interface IPostList {
  id: number
  title: string
  post_content: string
  created_at: string
  updated_at: string
}
