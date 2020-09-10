const database = require('sqlite-async');

function execute(db) {
    return db.exec(`
    CREATE TABLE IF NOT EXISTS vendor_datas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_complet TEXT,
        whatsapp TEXT,
        city TEXT
    );
    CREATE TABLE IF NOT EXISTS game_data (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name_game TEXT,
       state INTEGER,
       generous INTEGER,
       photo TEXT,
       cost INTEGER,
       platform INTEGER,
       vendor_data_id INTEGER
    );
    `)
}

module.exports = database.open(__dirname + '/database.sqlite').then(execute)


