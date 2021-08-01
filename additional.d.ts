import { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface Tanka {
  title: string
  source: string
}

interface IndexProps {
  tankasData: Tanka[]
}

interface News {
  id: string
  date: string
  title: string
  url: string
}

interface NewsProps {
  allNewsData: News[]
}

interface ContactProps {
  mdxSource: MDXRemoteSerializeResult
}

interface ProfileProps {
  mdxSource: MDXRemoteSerializeResult
}

interface Blog {
  id: string
  date: string
  title: string
}

interface BlogProps {
  allPostsData: Blog[]
}

interface Post {
  title: string
  date: string
  private: boolean
  mdxSource: MDXRemoteSerializeResult
}

interface PostProps {
  postData: Post
}
