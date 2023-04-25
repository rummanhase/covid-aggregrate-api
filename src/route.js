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

router.get('/totalActive' , async(req , res)=>{
    console.log('totalActive api called');
    const data = await connection.find({}) 
    let totalActive =0
    data.map(a=>{totalActive = totalActive + a.infected - a.recovered})
    res.send( {data: {_id: "total", active:totalActive}})
})

router.get('/totalDeath' , async(req , res)=>{
    console.log('totalDeath api called');
    const data = await connection.find({}) 
    let totalDeath =0
    data.map(a=>{totalDeath += a.death})
    res.send( {data: {_id: "total", death:totalDeath}})
})

router.get('/hotspotStates' , async(req , res)=>{
    console.log('hotspotStates api called');
    const myData = await connection.find({}) 
    let data =[]
    let myRate;
    myData.map(a=>{
        myRate = ((a.infected - a.recovered)/a.infected).toFixed(5)
        if(myRate>0.1){
            data.push({"state": a.state, "rate": myRate})
        }
    })

    res.send( {data})
})

router.get('/healthyStates' , async(req , res)=>{
    console.log('healthyStates api called');
    const myData = await connection.find({}) 
    let data =[]
    let myRate;
    myData.map(a=>{
        mortality  = (a.death/a.infected).toFixed(5)
        if(mortality<0.005){
            data.push({"state": a.state, "mortality": mortality})
        }
    })

    res.send( {data})
})


module.exports = router
