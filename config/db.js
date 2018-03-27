// REQUIRE AND SET UP SPICEDPG
const spicedPg = require("spiced-pg");
var db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const secrets = require("./secrets.json");
    const user = secrets.username;
    const pass = secrets.password;
    db = spicedPg(`postgres:${user}:${pass}psql@localhost:5432/trello`);
}







////////////////////////////////////////////////////////////////////////////////
//////////////////////////// RETRIEVE FROM DATABASE ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// GET USER EMAIL AND PASSWORD FOR LOGIN
module.exports.checkUserCredentialsToLogin = (email) => {

    return db.query(

        `SELECT first, password, id FROM users WHERE email = $1`,
        [email]

    ).then(results => {
        return results.rows[0];
    }).catch(err => {
        console.log(err);
    });

};

// GET USER INFO TO PUT IN STORE
module.exports.getUserInfo = id => {

    return db.query(

        `SELECT first, last, email, id
        FROM users
        WHERE id = $1`,
        [ id ]

    ).then(results => {
        return results.rows[0];
    }).catch(err => {
        console.log(err);
    });

};


// GET NAMES OF ALL BOARDS ASSOCIATED WITHL LOGGED IN USER
module.exports.getUserBoardNames = (id) => {

    return db.query(

        `SELECT board, id, user_id FROM boards WHERE user_id = $1`,
        [id]

    ).then((results) => {
        return results.rows;
    }).catch(err => {
        console.log(err);
    });

};

////////////////////////////////////////////////////////////////////////////////
////////////////////////// END RETRIEVE FROM DATABASE //////////////////////////
////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ADD TO DATABASE ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// REGISTER USER -- PUSH USER CREDENTIALS TO DB
module.exports.registerUser = (first, last, email, password) => {

    return db.query(

        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]

    ).then((results) => {
        return results.rows[0];
    }).catch(err => {
        console.log(err);
    });

};

// GET NAMES OF ALL BOARDS ASSOCIATED WITHL LOGGED IN USER
module.exports.createBoard = (board, id) => {

    return db.query(

        `INSERT INTO boards (board, user_id) VALUES ($1, $2) RETURNING *`,
        [board, id]

    ).then((results) => {
        return results.rows;
    }).catch(err => {
        console.log(err);
    });

};


////////////////////////////////////////////////////////////////////////////////
////////////////////////////// END ADD TO DATABASE /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
