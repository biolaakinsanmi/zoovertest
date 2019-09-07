import reviewsRoutes from './routes/reviews-routes';

const express = require('express');
const app = express();
const cors = require('cors');

var allowedOrigins = 'http://localhost:4200,http://127.0.0.1:4200';

//HEADERS FOR CORS
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);

    //ELSE CHECK IN ALLOWED ORIGINS ARRAY FOR APPLICABLE ORIGIN
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = `The CORS policy for this site does not ' +
                'allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: "POST, PUT, GET, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  exposedHeaders: ['Authorization','expiresMs','refreshToken', 'Set-Cookie']
}));


const allReviews = require('./reviews.json');
var avgTraveledWith = 0;

app.use('/', reviewsRoutes);

app.listen(process.env.PORT || 3000);