module.exports = async function (db, {vendor_datas, game_data}) {
    //inserindo dados
    const insertedsalesman = await db.run(`
        INSERT INTO vendor_datas (
            name_complet,
            whatsapp,
            city
        )VALUES(
            "${vendor_datas.name_complet}",
           " ${vendor_datas.whatsapp}",
            "${vendor_datas.city}"

        );
    `)
    const vendor_data_id = insertedsalesman.lastID

    const inserted_game_data = await db.run(`
    INSERT INTO game_data (
        name_game,
        state,
        generous,
        photo,
        cost,
        platform,
        vendor_data_id
    )VALUES(
        "${game_data.name_game}",
        "${game_data.state}",
        "${game_data.generous}",
        "${game_data.photo}",
        "${game_data.cost}",
        "${game_data.platform}",
        "${vendor_data_id}"

    );
`)


}