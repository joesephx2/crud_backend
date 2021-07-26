const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const backendEnv = process.env.BACKEND_ENV || 'development';
const knex = require('knex')(require('../knexfile.js')[backendEnv]);
const cors = require('cors');
console.log('bakcendEvn: ', backendEnv);



function getRunScore(runtime) {
    let maxPoints = 60;
    let maxRun = 9 * 60 + 12;
    let tmp = runtime.split(':');
    let runMin = parseFloat(tmp[0]);
    let runSec = parseFloat(tmp[1]);
    let runNum = runMin * 60 + runSec;
    // console.log('runNum: ', runNum);
    if (runNum < maxRun) {
        return parseFloat(maxPoints.toFixed(1));
    } else {
        return (Math.round(((maxRun / runNum) * maxPoints) * 10) / 10)
    }
}


function getSitupsScore(situps) {
    let maxSitups = 58
    let maxScore = 20

    if (situps >= maxSitups) {
        return parseFloat(maxScore.toFixed(1));
    } else {
        return parseFloat(((situps / maxSitups) * maxScore).toFixed(1));
    }
}

function getPushupsScore(pushups) {
    let maxPushups = 67
    let maxScore = 20
    // console.log('getPushupsScore', pushups);
    if (pushups >= maxPushups) {
        return parseFloat(maxScore.toFixed(1));
    } else {
        return parseFloat(((pushups / maxPushups) * maxScore).toFixed(1));
    }
}



app.use(express.json());
app.use(cors())


app.get('/servercheck', (req, res) => {
    res.send('ExpressJS running')
});

app.get('/', function (req, res, next) {

    knex.select().table('tests')
        .then(data => {
            // console.log('knex - GET - data: ', data);
            data.map(data => {
                data.push_ups_score = getPushupsScore(data.push_ups);
                data.sit_ups_score = getSitupsScore(data.sit_ups);
                data.run_time_score = getRunScore(data.run_time);
                data.total_score = (data.push_ups_score + data.sit_ups_score + data.run_time_score).toFixed(1);
                return data;
            }
            );
            // console.log('GET - data after updating: ', data);
            return data;
        }
        )
        .then(response => res.status(200).json(response))
        .catch(err => res.status(404).send("There was an error in getting data from the database"))
});

app.post('/', (req, res) => {
    if (Object.keys(req.body).length === 12) {
        knex('tests').insert(req.body)
            .then(response => {
                console.log(response)
                res.status(200).send("added test")
            })
            .catch(err => {
                console.log(err)
                res.status(404).send("There was an error in adding a row to the database")
            })
    } else {
        res.status(400).send("all fields must be filled out")
    }
});

app.put('/', (req, res) => {
    if (req.body.test_id && Object.keys(req.body).length > 1) {
        knex('tests')
            .where('test_id', '=', req.body.test_id)
            .update(req.body)
            .then(response => {
                console.log(response)
                res.status(200).send("updated test")
            })
            .catch(err => {
                console.log(err)
                res.status(404).send("There was an error in updating database entry")
            })
    } else {
        res.status(400).send("must have a test_id or some type of info")
    }
});

app.delete('/', (req, res) => {
    if (req.body.test_id) {
        knex('tests')
            .where('test_id', '=', req.body.test_id)
            .del()
            .then(() => res.status(200).send("Item deleted"))
            .catch(err => res.status(404).send("There was error, maybe the test_id was invalid - delete a row from the database failed"))
    } else {
        res.status(400).send("must have a test_id")
    }
});



app.listen(port, () => {
    console.log(`Example app listening at the port#: ${port}`)
});

