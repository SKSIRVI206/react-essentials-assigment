const http = require('http');
const { uptime } = require('process');
const url = require('url');

function readBody(req){
  return new Promise((resolve, reject)=>{
    let body = '';
    req.on('data', (chunk)=>{body+= chunk});
    req.on('end',()=>resolve(body));
    req.on('error',reject);
  });
}

const server = http.createServer(async(req, res)=>{
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;
  const splitPath = path.split('/');
//   if(req.method === "GET" && splitPath[1]==='products'){
//     const products =[
//       { id:1, name:'laptop'},
//       {id:2, name:'mobile'}
//     ]
//     if(splitPath[2]){
//       let flag = false;
//       for (let index = 0; index < products.length; index++) {
//         flag = true
//         if(splitPath[2] == products[index].id){
//           res.writeHead(200, {
//             'content-type':'application/json'
//           })
//           res.end(JSON.stringify({
//             message:`${splitPath[2]} id fetched successfully`,
//             product: `${products[index].name} is your product`
//           }))
//           return;
//         }
//       }
//       if(flag){
//         res.writeHead(404, {
//           'content-type':'application/json'
//         })
//         res.end(JSON.stringify({
//           message:'Product not found in your products list'
//         }))
//       }
//     } else{
//       res.writeHead(200, {
//         'content-type':'application/json'
//       })
//       res.end(JSON.stringify(products))
//       return
//     }
//  }

 if(req.method === 'GET' && path === '/products'){
  res.writeHead(200, {
    'content-type':'application/json'
  })
  res.end(JSON.stringify({
    category:query.category,
    brand:query.brand
  }))
 }
  
})


server.listen(8080, ()=>{
  console.log('server is running at port 8080');
})

