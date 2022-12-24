import type { NextApiRequest, NextApiResponse} from 'next'


type Data={
  name:string
}

export default function b(
   req:NextApiRequest,  
   res:NextApiResponse<Data>
   ){
   res.status(200).json({"b":10})
} 

