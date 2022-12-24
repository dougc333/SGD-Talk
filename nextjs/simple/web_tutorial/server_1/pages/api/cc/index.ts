// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const d = await fetch("http://localhost:3000/api/bb")
  const data = await d
  console.log(data)
  res.status(200).json(data)
}
