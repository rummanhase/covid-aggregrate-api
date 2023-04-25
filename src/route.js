const router = require('express').Router() 
const { connection } = require('./connector')  
router.get('/' , async(req , res)=>{
    console.log('api called');
    const data = await connection.find({}) 
    res.send(data)
})

module.exports = router
