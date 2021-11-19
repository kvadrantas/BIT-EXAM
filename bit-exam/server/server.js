import isValid from "./js/isValid.js";
import genID from "./js/genID.js";


// ----------------- EXPRESS SERVER -----------------
import express, { json } from "express";
const app = express()
const port = 3003
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

import cors from "cors";
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


// ----------------- MY SQL CONNECT -----------------
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "Bolt",
    password: "Laikinas1",
    database: "Bolt",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// -------------------------------------------------




// GET ALL RECORDS FROM TABLE
app.get('/bolt/', (req, res) => {
    const sql = `
        select * from bolt
    `
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
})


// INSERT NEW RECORD IN TABLE
app.post('/bolt', (req, res) => {
    const sql = `
        insert into bolt
        (registration_code, day_ride, total_ride_kilometers, last_use_time, is_busy)
        values (?, ?, ?, ?, false)
    `
    if(
        isValid('num', 'required', req.body.day_ride) &&
        isValid('txt', 'optional', req.body.last_use_time.slice(0, 10)) &&
        isValid('boolean', 'optional', req.body.is_busy) 
    ) {
        con.query(sql, [
            genID(), 
            req.body.day_ride, 
            parseFloat(req.body.day_ride), 
            req.body.last_use_time.slice(0, 10)||'0001-01-01', 
            req.body.is_busy, 
        ], (err, results) => {
            try {
                if (err) throw err;
                res.send(results)
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err)
            }
        });
    } else console.log('BAD DATA');
})


// EDIT RECORD 
app.put('/bolt/:id', (req, res) => {
    const sql = `
        UPdate bolt
        SET registration_code = ?, day_ride = ?, total_ride_kilometers = ?, last_use_time = ?, is_busy = ?
        WHERE id = ?
    `;
    if(
        isValid('txt', 'required', req.body.registration_code) &&
        isValid('num', 'required', req.body.day_ride) &&
        isValid('num', 'required', req.body.total_ride_kilometers) &&
        isValid('txt', 'optional', req.body.last_use_time.slice(0, 10)) &&
        isValid('boolean', 'optional', req.body.is_busy) &&
        isValid('num', 'required', req.params.id)
    ) {
        con.query(sql, [
            req.body.registration_code,
            req.body.day_ride,
            parseFloat(req.body.total_ride_kilometers) + parseFloat(req.body.day_ride),
            req.body.last_use_time.slice(0, 10),
            req.body.is_busy,
            req.params.id
        ], (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                res.send(results);
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err);
            }
        }) 
    } else console.log('BAD DATA');
})


// DELETE RECORD 
app.delete('/bolt/:id', (req, res) => {
    const sql = `
        DELETE FROM bolt
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        try {
            if (err) {
                throw err;
            }
            res.send(result);
        } catch(err) {
            console.log('THIS IS HANDLED ERROR: ', err);
        }
    })
})
// -------------------------------------------------


// FILTER - GET DATA BY TYPE
app.get('/bolt-filter/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM bolt
        WHERE is_busy = ?
    `;
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})


// SEARCH DATA
app.get('/bolt-search', (req, res) => {
    const searchText = (`%${req.query.s}%`).toLowerCase();
    const sql = `
        SELECT *
        FROM bolt
        where LOWER(registration_code) like ? OR LOWER(day_ride) like ? OR LOWER(total_ride_kilometers) like ? OR LOWER(last_use_time) like ? OR LOWER(is_busy) like ? 
    `;
    con.query(sql, [searchText, searchText, searchText, searchText, searchText, searchText], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// STATISTICS
app.get('/statistics', (req, res) => {
    
    let totalScooter;
    let totalKilometrage;
    
    let sql = `
        select COUNT(id) as totalScooter
        from bolt;
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
         
            totalScooter = results[0].totalScooter;
    });

    sql = `
        select sum(total_ride_kilometers) as totalKilometrage
        from bolt;
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        totalKilometrage = results[0].totalKilometrage;

        res.send({
            totalScooter,
            totalKilometrage
    });
});
})
