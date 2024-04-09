const express = require('express')
const app = express()
const port = 4001
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/login",(req,res)=>{
  res.render("login")
})
app.post("/login",(req,res)=>{
console.log("req body inlogin is  ",req.body)
const encoded = Buffer.from(req.body.name, 'utf8').toString('base64')
return res.send({"login status":"lgoin success","cookie":encoded})
// return res.json({ Message: 'Settings changed' });

})
app.post("/secret",(req,res)=>{
  console.log("req is ",req.body)
  const plain = Buffer.from(req.body.cookie, 'base64').toString('utf8')  
  let result=''
  if(plain=='admin'){
    let not='c2VjcmV0X2tleV9vZl9iNjRfZGVjb2RlX2NvbmdyYXRzCg=='
    let oxdead=Buffer.from(not, 'base64').toString('utf8')
    result='hi'+plain+'congrats! here is the key '+oxdead
    return res.json({"secret":result})
  }
else{
  result='hi '+plain+'<br/>u need to login as admin to get the key for this challenge'
  return res.json({"secret":result})
}
})

app.get("/profile",(req,res)=>{
  return res.render("profile")
})
app.get("/test3",(req,res)=>{
  console.log("hit to test3")
  return res.json({ Message: 'Settings changed' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})