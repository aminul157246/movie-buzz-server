import { ObjectId } from "mongodb";

const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 3002

//middleware
app.use(cors())
app.use(express.json())



//  `mongodb+srv://moviesDB:_2eZSG8UR.xbbXN@cluster0.7u1kshv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 const uri = 'mongodb+srv://movies-buzz:rWact32Q3zPKMDDX@cluster0.mjupx3z.mongodb.net/?retryWrites=true&w=majority'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();




    const movieCollection = client.db('moviesDataBase').collection('movies')
    const cartCollection = client.db('moviesDataBase').collection('carts')

    app.get('/movie' , async(req:any , res: any) => {
        const result = await movieCollection.find().toArray()
        // console.log(result);
        res.send(result)
    })

    app.post('/movie/:id' , async(req : any , res : any) => {
        const id = req.params.id 
        console.log(id);
        const query = {_id : new ObjectId(id)}
        const result = await cartCollection.insertOne(query)
        res.send(result)
    })


 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req:any, res:any) => {
  res.send('CRUD  is running ......!')
})

app.listen(port, () => {
  console.log(`App is  listening on port ${port}`)
})



