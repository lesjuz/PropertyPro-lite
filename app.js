import express from 'express';
import bodyParser from 'body-parser';
import Property from './server/routers/property';
import User from './server/routers/user';

const app = express();
const port = process.env.PORT || 3000;

// This will allow all requests from all origins to access your API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.use('/api/v1/properties', Property);
app.use('/api/v1/auth', User);

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/app/index.html'));
// // });

export default app;
