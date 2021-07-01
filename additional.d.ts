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

interface BlogData {
  id: string
  date: string
  title: string
}

interface BlogProps {
  allPostsData: BlogData[]
}

interface Blog {
  title: string
  date: string
  mdxSource: MDXRemoteSerializeResult
}

interface BlogsProps {
  postData: Blog
}
