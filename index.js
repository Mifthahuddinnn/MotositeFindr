const express = require('express');
const ejsMate = require('ejs-mate');
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const ErrorHandler = require('./utils/ErrorHandler');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your-secret-key', // Add your own secret key
    resave: false,
    saveUninitialized: true, // Set to true or false based on your use case
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 100 * 60 * 60 * 24 * 27
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


// Routes...
app.get ('/', (req,res)=>{
    res.send('API Server MotositeFindr')
})
app.use('/', require('./routes/auth'));
app.use('/motors', require('./routes/motor'));
app.use('/motors/:motor_id/', require('./routes/comment'));

// 404 and error handling middleware...
app.all('*', (req, res, next) => {
    next(new ErrorHandler('Page not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong';
    res.status(statusCode).render('error', { err });
});

// Start the server...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening On Port ${PORT}`);
});
