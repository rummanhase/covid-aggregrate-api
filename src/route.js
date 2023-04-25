const router = require('express').Router() 
const { connection } = require('./connector')  
router.get('/' , async(req , res)=>{
    console.log('/ called');
    const data = await connection.find({}) 
    res.send(data)
})

router.get('/totalRecovered' , async(req , res)=>{
    console.log('totalRecovered api called');
    const data = await connection.find({}) 
    let totalRecovered =0
    data.map(a=>{totalRecovered += a.recovered})
    res.send( {data: {_id: "total", recovered:totalRecovered}})
})

module.exports = router
