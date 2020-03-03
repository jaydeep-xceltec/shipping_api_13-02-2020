const express = require('express')
const bodyParser = require('body-parser')
const store = require('./api/controller/store')
const route =require('./api/router/app');
const app = express()
const http = require('http');
const socketIO = require('socket.io');
app.use(express.static('imagefolder'));
app.use(express.static('upload'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }))

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Get the Access Token
// TODO: Validate the JWT token

app.use((req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userData) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "User is not authenticated",
                    });
                }
                req.user = {
                    id: userData.id,
                    email: userData.email,
                    token: token,
                    exp: userData.exp
                }
                return next();
            });
        }
        return res.unauthorized();
    }
    next();
});


app.use('/api',route);

const server = http.Server(app);
server.listen(3001, () => {
    console.log('Server is running on port ' + 3001);
});

const io = socketIO(server);

io.on('connection', (socket) => {
    socket.emit('hello', {
        greeting: 'hello chirag'
    });
    
    //notification
    socket.on('new-event', function (result) {
        console.log("New event");
        io.emit('message', {  data: result});
    });
    socket.on('new-notification', function (result) {
        console.log("New notification");
        io.emit('notification', {  data: result});
    });

});


// app.listen(3001, () => {
//  console.log("Server running:  " +'3001')})