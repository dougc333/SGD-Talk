'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')
const opn = require('open')
const destroyer = require('destroyer')

const {google} = require('googleapis')
const people = google.people('v1')

const keyPath = path.join(__dirname,'oauth.keys.json')
let keys = {redirect_uris:['']}
if (fs.existsSync(keyPath)){
  keys = require(keyPath).web
}

const oauth2Client = new google.auth.OAuth2(
  keys.client.id,
  keys.client_secret,
  keys.redirect_uris[0]
)

google.options({auth:oauth2Client})

async function authenticate(scopes){
  return new Promise((resolve,reject)=>{
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type:'offline',
      scope:scopes.join(' '),
     })
    const server=http.createServer(async(req,res)=>{
      try{
	if(req.url.indexOf('') > -1){
          const qs = new url.URL(req.url,'http://localhost:3000').searchParams
          res.end("res end auth successful")
          server.destroy()
          const {tokens} = await oauth2Client.getToken(qs.get('code'))
          oauth2Client.credentials = tokens
          resolve(oauth2Client)
        }
      }catch(e){
        reject(e)
      }
    }).listen(3000,()=>{
      opn(authorizeUrl,{wait:false}).then(cp=>cp.unref())
    })
    destroyer(server)
  })
}


async function runSample(){
  const res = await people.people.get({
    resourceName:'people/me',
    personFields:'emailAddresses',
  })
  console.log(res.data)

}

const scopes=[
  'https://www.googleapis.com/auth/contacts/readonly',
 'https://www.googleapis.com/auth/user/emails.read',
  'profile',
]

authenticate(scopes).then(client=>runSample(client)).catch(console.error)




