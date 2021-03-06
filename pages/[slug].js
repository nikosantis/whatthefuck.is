import Post from '@/components/post'
import getPosts from '@/lib/get-posts'
import { langList } from '@/lib/langList'
import renderMarkdown from '@/lib/render-markdown'

const PostPage = props => {
  return <Post {...props} />
}

export const getStaticProps = ({ params: { slug } }) => {
  const posts = getPosts()
  const postIndex = posts.findIndex(p => p.slug === slug)
  const post = posts[postIndex]
  const { body, ...rest } = post

  return {
    props: {
      previous: posts[postIndex - 1] || null,
      next: posts[postIndex + 1] || null,
      ...rest,
      html: renderMarkdown(body),
      langList
    }
  }
}

export const getStaticPaths = () => {
  return {
    paths: getPosts().map(p => `/${p.slug}`),
    fallback: false
  }
}

export default PostPage
