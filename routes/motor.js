const express = require('express')
const wrapAsync = require('../utils/wrapAsync')
const ErrorHandler = require('../utils/ErrorHandler')
const isValidObjectId = require('../middlewares/isValidObjectId')
const isAuth = require('../middlewares/isAuth')
const isAuthor  = require('../middlewares/isAuthor')
// model
const Motor = require('../models/motor')
// schema 
const router = express.Router();
const {motorSchema} = require('../schemas/motor')



const validateMotor = (req,res,next)=>{
    const {error} = motorSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        console.log(error)
        return next(new ErrorHandler(error.details[0].message,400))
    }else{
        next()
    }
}


router.get('/', wrapAsync(async(req,res)=>{
  const msg = req.flash('succes_msg','motor fetched successfully')
    const motors = await Motor.find()
    res.render('pages/index', {motors})
}))

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  
// search dan filtering 
router.get('/search', wrapAsync(async (req, res) => {
      let motors;
  
      // Handling search
      if (req.query.search) {
        const searchRegex = new RegExp(escapeRegex(req.query.search), 'gi');
        motors = await Motor.find({ title: searchRegex });
      } else {
        // Handling filter
        if (req.query.sortBy === 'terbaru') {
          motors = await Motor.find().sort({ dateTime: -1 });
        } else if (req.query.sortBy === 'terlama') {
          motors = await Motor.find().sort({ dateTime: 1 });
        } else {
          motors = await Motor.find();
        }
      }
  
      res.render('pages/index', { motors });
    })
  );


// create/form 
router.get('/post', isAuth, (req,res)=>{
    res.render('pages/post')
})

// submit post
router.post('/', isAuth,validateMotor, wrapAsync(async(req,res,next)=>{
    const motor = new Motor(req.body.motor)
    motor.author = req.user._id
    await motor.save()
    req.flash('success_msg','Selamat, anda berhasil menambahkan data')
    res.redirect('/pages')
    
}))

// details
router.get('/:id', isValidObjectId('/pages'),wrapAsync(async (req,res)=>{
    const {id} = req.params
    const motor = await Motor.findById(id)
    .populate({
      path : 'comments',
      populate:{
        path:'author'
      }
    })
    .populate('author')
console.log(motor)
    console.log(motor)
    res.render('pages/detail',{motor})

}))

// menuju ke halaman edit 
router.get('/:id/editForm',isAuth,isAuthor.isAuthorMotor,isValidObjectId('/pages'),wrapAsync(async(req,res)=>{
    
  const {id} = req.params
  const motor = await Motor.findById(id);
    res.render('pages/editForm', {motor})
}))
// mengirim dari halaman edit
router.put('/:id',isAuth, isAuthor.isAuthorMotor, isValidObjectId('/pages'), validateMotor,wrapAsync(async(req,res)=>{
    const {id} = req.params
    await Motor.findByIdAndUpdate(id,{...req.body.motor})
    req.flash('success_msg','Anda berhasil meng-update data')
    res.redirect('/pages')

}))

// delete motor 
router.delete('/:id',isAuth,isAuthor.isAuthorMotor,isValidObjectId('/pages'), wrapAsync(async(req,res)=>{
    await Motor.findByIdAndDelete(req.params.id)
    const msg = req.flash('success_msg','Data berhasil dihapus')
    res.redirect('/pages')
}))

module.exports= router;