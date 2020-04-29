const router = require('express').Router();
const errorController = require('../BL/Controllers/error.controller');
const imageController = require('../BL/Controllers/images.controller');

//get user images
router.get('/user',(req, res)=>{
    try{
        res.status(200).json(imageController.getUserProfileImages());
    }catch(err){
        errorController.sendError(res, err);
    }
});

//get conversations images
router.get('/conversation',(req, res)=>{
    try{
        res.status(200).json(imageController.getConversationsImages());
    }catch(err){
        errorController.sendError(res, err);
    }
});

//get conversations images
router.get('/',(req, res)=>{
    try{
        res.status(200).json(imageController.getAllImages());
    }catch(err){
        errorController.sendError(res, err);
    }
});


module.exports = router;