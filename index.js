////////////////////////////////////////////////////////////////////////////////
////////////////////////// REQUIRE MODULES & USE THEM //////////////////////////
////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();

const compression = require('compression');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const chalk = require('chalk')

// REQUIRE FILE THAT CONTAINS HASH PASSWORD FUNCTION
const bc = require("./config/pass");

// REQUIRE FILE THAT CONTAINS DATABASE QUERIES
const db = require("./config/db.js");



if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}




app.use(express.static('./public'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(cookieSession({
    secret: 'that thing that never leaves the Balkans',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));



////////////////////////////////////////////////////////////////////////////////
//////////////////////// END REQUIRE MODULES & USE THEM ////////////////////////
////////////////////////////////////////////////////////////////////////////////



app.post('/get-cards', (req, res) => {

    const { idOfBoard } = req.body
    const userId = req.session.user.id;

    db.getCards(userId, idOfBoard).then(results => {

        res.json({
            cards: results
        })

    })
})





app.post("/create-card", (req, res) => {
    const { userId, idOfCurrentBoard, card } = req.body
    db.createCard(userId, idOfCurrentBoard, card).then(results => {
        res.json({
            newCard: results[0]
        })
    })
})
























////////////////////////////////////////////////////////////////////////////////
///////////////////////// GET / CREATE / DELETE BOARDS  ////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/allBoardNamesFromDatabase/', (req, res) => {

    var id = req.session.user.id;

    db.getUserBoardNames(id).then(boards => {
        res.json({ boards, success: true });
    });

});


app.post('/createBoard/', (req, res) => {

    const id = req.session.user.id;
    const newBoard = req.body.newBoard

    // (1) also need to push name of board to DB -- capture this from user input
    // (2) after push to DB -- send back to client & update state with the new board
    db.createBoard(newBoard, id).then(boards => {
        res.json({ boards, success: true });
    });

});


app.post('/delete-board', (req, res) => {
    const idOfBoardToDelete = req.body.idOfBoardToDelete
    console.log("server: ", idOfBoardToDelete);
    db.deleteBoard(idOfBoardToDelete).then(() => {
        res.json({ success: true })
    })
})

////////////////////////////////////////////////////////////////////////////////
/////////////////////// END GET / CREATE / DELTE BOARDS  ///////////////////////
////////////////////////////////////////////////////////////////////////////////
















////////////////////////////////////////////////////////////////////////////////
//////////////////////////// REGISTER AND LOGIN USERS //////////////////////////
////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////// REGISTER USER //////////////////////////////
app.post("/register", (req, res) => {

    var first = req.body.first;
    var last = req.body.last;
    var email = req.body.email;
    var password = req.body.password;

    // HASH THE PASSWORD
    bc.hashPassword(password).then((hashedPassword) => {
        // SEND HASHED PASSWORD TO DATABASE
        db.registerUser(first, last, email, hashedPassword).then(results => {

            req.session.user = {
                id: results.id,
                first: first
            };

            res.json({ results, success: true });

        }).catch(err => {
          console.log("error 1");
            res.json({ success: false });
        });
    }).catch(err => {
      console.log("error 1");
        res.json({ success: false });
    });

});

///////////////////////////////// END REGISTER USER ////////////////////////////





//////////////////////////////////// LOGIN USER ////////////////////////////////
app.post("/login", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    // GET USER PASSWORD FROM DATABASE BASED ON THE EMAIL THEY ENTERED
    db.checkUserCredentialsToLogin(email).then(results => {

        var id = results.id;
        var first = results.first;
        var hashedPasswordFromDatabase = results.password;

        // CHECK USER INPUTTED PASSWORD WITH THE HASHED PASSWORD WE HAVE IN DATABASE
        bc.checkPassword(password, hashedPasswordFromDatabase).then(doesMatch => {

            if (doesMatch) {

                req.session.user = {
                    id: id,
                    first: first
                };

                res.json({ success: true });

            }

        }).catch((err) => {
            res.json({ success: false });
        });
    }).catch((err) => {
        res.json({ success: false });
    });


});

////////////////////////////////// END LOGIN USER //////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////// END REGISTER AND LOGIN USERS ////////////////////////
////////////////////////////////////////////////////////////////////////////////













/////////////////////////////////// LOGOUT ROUTE ///////////////////////////////
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});



///////////// GET LOGGED-IN USER INFO AND SEND TO APP COMPONENT ////////////////
app.get("/user", (req, res) => {

    const id = req.session.user.id;

    db.getUserInfo(id).then(user => {

        db.getUserBoardNames(id).then(boards => {
            res.json({ user, boards });
        })

    })

});







////// REDIRECT USERS IF THEY TRY TO NAVIGATE TO PAGE THAT DOESN'T EXIST ///////
app.get('*', (req, res) => {

    if (!req.session.user && req.url != '/welcome/') {
        res.redirect("/welcome/");
        return;
    }

    if (req.session.user && req.url == '/welcome/') {
        res.redirect("/");
        return;
    }

    res.sendFile(__dirname + '/index.html');
});

///////////////////////////////// END REDIRECT /////////////////////////////////












app.listen(8080, () => {
    console.log("Listen to me 8080");
});
