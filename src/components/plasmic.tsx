import React, { createContext, ReactNode, useContext } from "react"
import { repeatedElement } from "@plasmicapp/host"
import { graphql, Link, StaticQuery } from "gatsby"

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
  className?: string
  gap?: number
  offset?: number
  count?: number
  children: ReactNode
}

export function PostList({
  className,
  count,
  offset,
  children,
  gap,
}: PostListProps) {
  const posts = usePostCollection()
  const renderPosts = (posts: Post[]) =>
    posts
      .slice(offset, count ? (offset || 0) + count : undefined)
      .map((post, i) => (
        <PostContext.Provider value={post} key={post.id}>
          <div style={{ ...(i !== 0 && { marginTop: gap }) }}>
            {repeatedElement(i === 0, children)}
          </div>
        </PostContext.Provider>
      ))
  return (
    <div className={className}>
      {posts ? (
        renderPosts(posts)
      ) : (
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
      )}
    </div>
  )
}

export function PostLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const post = usePost()
  if (!post) {
    return null
  }
  return (
    <Link className={className} to={post.fields.slug}>
      {children}
    </Link>
  )
}

export function PostTitle({ className }: { className?: string }) {
  const post = usePost()
  if (!post) {
    return null
  }
  return <div className={className}>{post.frontmatter.title}</div>
}

export function PostDate({ className }: { className?: string }) {
  const post = usePost()
  if (!post) {
    return null
  }
  return <div className={className}>{post.frontmatter.date}</div>
}

export function PostExcerpt({ className }) {
  const post = usePost()
  if (!post) {
    return null
  }
  return <div className={className}>{post.excerpt}</div>
}
