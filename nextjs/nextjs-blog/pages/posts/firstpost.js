import Head from 'next/head'
import Layout from '../../components/layout'

const posts = ["hi","bye","asdf"]

export default function firstpost(){
  return(
      <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h2>Posts</h2>
        <ul>
          {posts.map(x=><li>{x}</li>)}
          {...posts}
        </ul>
        </Layout>
  )
}