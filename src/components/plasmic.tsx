import { repeatedElement } from "@plasmicapp/host"
import { graphql, StaticQuery } from "gatsby"
import { createContext, ReactNode, useContext } from "react"

type Post = any

export const PostContext = createContext<Post | undefined>(undefined)
export const PostCollectionContext = createContext<Post[] | undefined>(
  undefined
)

function usePost() {
  return useContext(PostContext)
}

function usePostCollection() {
  return useContext(PostCollectionContext)
}

interface PostListProps {
  gap?: number
  offset?: number
  count?: number
  children: ReactNode
}

export function PostList({ count, offset, children, gap }: PostListProps) {
  const posts = usePostCollection()?.slice(
    offset,
    count ? (offset || 0) + count : undefined
  )

  const renderPosts = (posts: Post[]) =>
    posts.map((post, i) => (
      <PostContext.Provider value={post} key={post.id}>
        <div>{repeatedElement(i === 0, children)}</div>
      </PostContext.Provider>
    ))
  return (
    <div>
      <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              nodes {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  title
                  description
                }
              }
            }
          }
        `}
        render={data => renderPosts(data.allMarkdownRemark.nodes)}
      />
    </div>
  )
}

export function PostTitle({ className }: { className?: string }) {
  const post = usePost()
  if (!post) {
    return null
  }
  return <div className={className}>{post.title}</div>
}

export function PostDate({ className }: { className?: string }) {
  const post = usePost()
  if (!post) {
    return null
  }
  return <div className={className}>{post.date}</div>
}

export function PostExcerpt({ className }) {
  const post = usePost()
  if (!post) {
    return null
  }
  return <div className={className}>{post.excerpt}</div>
}
