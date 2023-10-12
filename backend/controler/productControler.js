const getAllProducts = (req, res)=>{
    let start = 0
    let limit = 20
    
    //get how many products in the database count()
    // if the start query >= limit
    // set limit to count()

    if(req.query){
        if(req.query.start) start  = Number(req.query.start)
        if(req.query.limit) limit  = Number(req.query.limit)
        console.log('start::', start)
        console.log('limit::', limit)
    }

    const db = req.app.get('DB')


    db.query('select * from products where id between ? and ?', [start, start + limit ], function(err ,result){
        if(err) 
        {
            console.log(err.message)
            throw err
        }

        res.json(result)
    })  


    // user between for the limit
}



module.exports = {
    getAllProducts
}