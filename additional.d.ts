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

interface NewsByYear {
  [year: string]: News[]
}

interface NewsProps {
  allNewsData: NewsByYear
  years: string[]
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

interface BlogByYear {
  [year: string]: Blog[]
}

interface BlogProps {
  allPostsData: BlogByYear
  years: string[]
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
