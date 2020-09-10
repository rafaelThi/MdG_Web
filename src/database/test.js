const database = require('./db')
const creategame = require('./creategame')


database.then(async (db)=> {
    vendor_datas={
        name_complet: "Rafael P",
        whatsapp: 123679046,
        city:"Rio de Janeiro",
        
    }
    
    game_data={
        name_game: "The Lats of Us",
        state:"Usado",
        generous:"Avetura",
        photo:"https://upload.wikimedia.org/wikipedia/pt/b/be/The_Last_of_Us_capa.png",
        cost: 50.00,
        platform:"PlayStation 4"
    }

// await creategame(db, {vendor_datas, game_data})
const selectAll = await db.all(`SELECT * FROM vendor_datas
`)

const selectAll_id = await db.all(`
    SELECT vendor_datas.*, game_data.*
    FROM vendor_datas
    JOIN game_data ON (game_data.vendor_data_id = vendor_datas.id)
    WHERE game_data.vendor_data_id = 2;
`)

const selectAll_game_data = await db.all(`
    SELECT game_data.platform,
    game_data.state,
    game_data.generous FROM game_data
    WHERE game_data.platform = "PlayStation 4"
    AND game_data.state = "Usado"
    AND game_data.generous ="Avetura"
   
`)



// console.log(selectAll)
console.log(selectAll_game_data)
// console.log(selectAll_id)


})