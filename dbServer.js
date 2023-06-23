const dotenv = require('dotenv');
dotenv.config();
const password = process.env.PASSWORD;
const { MongoClient } = require('mongodb');

const localUrl = 'mongodb://0.0.0.0:27017';
const atlasUrl = process.env.ATLASCONSTRING;
const database = 'eventsDB';
//CREATING CLIENT OBJ FROM MONGOCLIENT
const client = new MongoClient(localUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnect = async function () {
  try {
    //CONNECTING DATABASE
    const connect = await client.connect();
    console.log('database connected successfully', database);
    //CREATING THE DATABASE
    const db = connect.db(database);
    //CREATING A COLLECTION
    return db.collection('events');
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
