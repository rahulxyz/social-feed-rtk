import { PostsList } from './postsList'
import { AddPostForm } from './AddPostForm'

export function PostsMainPage() {
  return (
    <div>
      <AddPostForm />
      <PostsList />
    </div>
  )
}
