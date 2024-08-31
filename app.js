const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json())

const entry = require('./models/appointment')
const book_appointment = require('./routes/book_appointment')


app.post('/add_appointment',book_appointment.post_appointment )
app.get('/add_appointment', book_appointment.get_appointment)
app.post('/dlt_appointment/:id',book_appointment.delete_appointment)
app.get('/edit_appointment/:id',book_appointment.edit_appointment)




entry.sync().then(()=>{
    app.listen(4000,()=>{
        console.log('port is active')
    })
})





