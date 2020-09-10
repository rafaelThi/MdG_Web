const { 
    platforms,
    states,
    generouss,
    getstate,
    getplatform,
    getgenerous
 } = require("./utils/format")

const express = require ('express')
const server = express()

const Database = require('./database/db')

const nunjucks = require('nunjucks')

nunjucks.configure('src/views',{
    express: server,
    noCache:true,
})

server
.use(express.urlencoded({ extended:true}))

.use(express.static("public"))

.get('/',( req, res) =>{
    return res.render("index.html")
}) 
.get('/sell',( req, res) =>{
         
    return res.render("sell.html", {platforms, states, generouss})
}) 
.get('/buy', async function ( req, res){
    
    const filters = req.query

    if (!filters.platform || !filters. state || !filters.generous) {

        return res.render("buy.html", { filters, platforms, states, generouss})
        

      }
      console.log('123')
    const query = `
    SELECT vendor_datas.*, game_data.*
    FROM vendor_datas
    JOIN game_data ON (game_data.vendor_data_id = vendor_datas.id)
    WHERE EXISTS(
        SELECT game_data.platform,
        game_data.state,
        game_data.generous FROM game_data
        WHERE game_data.vendor_data_id = vendor_datas.id
        AND game_data.platform = "${filters.platform}"
        AND game_data.state = "${filters.state}"
        AND game_data.generous ="${filters.generous}"
    )
    ;
    `
    //erro na consulta

    try{
        const db = await Database
        const games= await db.all(query)

        games.map((game)=>{
        game.state = getstate(game.state),
        game.platform = getplatform(game.platform),
        game.generous = getgenerous(game.generous)
        })

        return res.render("buy.html", { games, filters, platforms, states, generouss})

    } catch (erro){
        console.log(error)
    }
}) 


.post("/save", save)
.listen(5501)


async function save(req, res) {
    const creategame= require("./database/creategame")

    const vendor_datas={
        name_complet: req.body.name_complet,
        whatsapp: req.body.whatsapp,
        city: req.body.city,
    }

    const game_data={
        name_game: req.body.name_game,
        state:req.body.state,
        generous:req.body.generous,
        photo:req.body.photo,
        cost: req.body.cost,
        platform:req.body.platform
    }
try{
    const db = await Database
    await creategame(db, {vendor_datas, game_data })


    let query = "?platform=" + req.body.platform
    query += "&state=" + req.body.state
    query += "&generous=" + req.body.generous

    return res.redirect("/buy" + query)


}catch(error){
    console.log(error)
}
        
    }

