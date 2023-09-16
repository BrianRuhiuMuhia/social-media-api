const {db}=require("../database/db.js")
function getUsers(req,res)
{
    try{
    db.query("select * from users",(err,result)=>{
        if(err)
        {
            console.log(err)
            res.send(404).json({"mssg":"error"})
        }
        else{
            return res.send(200).json(result.rows)
        }
    })
    }
    catch(err)
    {
return console.log(err)
    }
}
function registerUser(req,res)
{
    const {name,email,password}=req.body
    const existingUser=undefined
    try{
        db.query("select * from users where email=$1",[email],
        (err,result)=>{
            existingUser=result[0].rows
        })
        if(existingUser)
        return res.status(200).json({"mssg":"user already exists"})
    }
    catch(err)
    {
        return console.log(err)
    }
    if(!existingUser)
    {
        try{
db.query("insert into users(name,email,password) values($1,$2,$3)",[name,email,password])
return res.status(201).json({"mssg":"user created"})
        }
        catch(err)
        {
            return console.log(err)
        }
    }
    
}
function loginUser(req,res)
{
    const {email,password}=req.body
    const existingUser=undefined
    try{
        db.query("select * from users where email=$1",[email],
        (err,result)=>{
            existingUser=result[0].rows
        })
        if(existingUser)
        {
            if(password==existingUser.password)
            {
                return res.json({"mssg":"successful login"})
            }
        }
            }
    catch(err)
    {
        return console.log(err)
    }
    if(!existingUser)
    {
        return res.status(404).json({"mssg":"user not found"})
    }

}
function getAllBlogs(req,res)
{
try{
db.query("select * from blogs",function(err,result)
{
return res.status(200).json(result.rows)
})
}
catch(err)
{
    return console.log(err)
}
}
function deletePost(req,res)
{
    const {id}=req.params.id
    try{
db.query("delete from blogs where id = $1",[id])
    }
    catch(err)
    {
        return console.log(err)
    }
}
function addPost(req,res)
{
const {post}=req.body
try{
db.query("insert into blogs(post) values($1)",[post])
}
catch(err)
{
    return console.log(err)
}
}
function updatePost(req,res)
{
    const {id,post}=req.body
    try{
        db.query("update table blogs set post=$1 where id=$1",[post,id])
    }
    catch(err)
    {
        return console.log(err)
    }
}
module.exports={getUsers,registerUser,loginUser,getAllBlogs,deletePost,addPost,updatePost}