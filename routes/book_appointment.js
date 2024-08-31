const entry = require('./../models/appointment')

const express = require('express');
const app = express();
app.use(express.json())

exports.post_appointment = (req,res,next)=>{
    console.log(req.body.id,req.body.email,'id recieved')
    if(req.body.name){
        const id = req.body.id;
    console.log(id, "this is the id")
    if(req.body.id !== ""){
        entry.findByPk(id).then(result=>{
            if (result){
                result.name = req.body.name,
            result.email = req.body.email,
            result.phone = req.body.phone
            return result.save()
            }
            else{
                console.log('user not found')
            }
        }).then(result=>{
            console.log('user updated', result)
        }).catch(err => console.log("some error",err))
    }
    else{
        entry.create({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone
        }).then(result => {console.log('done')}).catch(err=>console.log(err));
    }     
    }else {console.log('invalid entry')}
    
    
}

exports.get_appointment = (req,res,next)=>{
    entry.findAll().then(entries => {
        res.json(entries);
    }).catch(err=>console.log('there is an error',err));
}

exports.delete_appointment= (req,res,next)=>{
    const id = req.params.id;
    entry.findByPk(id).then(appointment=>{
        if (appointment){
            appointment.destroy().then(()=>{
                console.log('entry deleted successfully')
            }).catch(()=>{console.log('entry not deleted')})
        }
    }).catch(err=> console.log(err))
}

exports.edit_appointment = (req,res,next)=>{
    const id = req.params.id;
    entry.findByPk(id).then(appointment=>{
        if (appointment){
            res.json(appointment);
            /*appointment.destroy().then(()=>{
                console.log('entry deleted successfully for editing purpose')
            }).catch(()=>{console.log('entry not deleted in editing mode')})*/
        }
    }).catch(err=> console.log(err))
}
