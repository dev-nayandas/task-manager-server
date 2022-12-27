const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');


require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfvoz.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });








async function run(){
        try{
          
            const taskCollection = client.db('taskManager').collection('tasks')


            app.post('/tasks', async (req, res) => {
                const task = req.body;
                const result = await taskCollection.insertOne(task);
                res.send(result);
            });

            app.get('/tasks', async (req, res)=>{
                const query = {}
                const cursor=  taskCollection.find(query);
                const tasks = await cursor.toArray();
                res.send(tasks)
            });

            app.get('/tasks1', async (req, res)=>{
                let query = {}
                if (req.query.email){
                  query = {email : req.query.email}
                }
                const cursor =  taskCollection.find(query);
                const task = await cursor.toArray();
                res.send(task)
            });



            app.get('/sellers',async (req, res) => {
                const accountType = req.query.accountType;
                console.log(accountType)
                const query = {accountType:buyer};
                const sellers = await userCollection.find(query).toArray();
                
                res.send(sellers);
            })

            app.get('/categoriesName', async (req, res)=>{
                const query = {}
                const cursor=  nameCollection.find(query);
                const names = await cursor.toArray();
                res.send(names)
            });

            app.get('/advertisedItems', async (req, res)=>{
                const query = {}
                const cursor=  advertisedCollection.find(query);
                const items = await cursor.toArray();
                res.send(items)
            });
            app.get('/users', async (req, res)=>{
                const query = {}
                const cursor=  userCollection.find(query);
                const users = await cursor.toArray();
                res.send(users)
            });

            app.delete('/users/:id', async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) }
                const result = await userCollection.deleteOne(query);
                res.send(result);
            });

            app.get('/users/admin/:email',async (req, res)=>{
                const email = req.params.email;
                const query = {email};
                const user = await userCollection.findOne(query);
                res.send({isAdmin:user?.accountType === 'Admin'});

            });

            app.get('/users/buyer/:email',async (req, res)=>{
                const email = req.params.email;
                const query = {email};
                const user = await userCollection.findOne(query);
                res.send({isBuyer:user?.accountType === 'Buyer'});

            });
            
            app.get('/users/seller/:email',async (req, res)=>{
                const email = req.params.email;
                const query = {email};
                const user = await userCollection.findOne(query);
                res.send({isSeller:user?.accountType === 'Seller'});

            });
      
            // });
            app.get('/apple', async (req, res)=>{
                const query = {}
                const cursor=  appleCollection.find(query);
                const apple = await cursor.toArray();
                res.send(apple)
            });
            app.get('/samsung', async (req, res)=>{
                const query = {}
                const cursor=  samsungCollection.find(query);
                const samsung = await cursor.toArray();
                res.send(samsung)
            });
            app.get('/asus', async (req, res)=>{
                const query = {}
                const cursor=  asusCollection.find(query);
                const asus = await cursor.toArray();
                res.send(asus)
            });
           



     

            app.get('/orders', async (req, res)=>{
                let query = {}
                if (req.query.email){
                  query = {email : req.query.email}
                }
                const cursor =  bookingCollection.find(query);
                const orders = await cursor.toArray();
                res.send(orders)
            });
            app.get('/products', async (req, res)=>{
                let query = {}
                if (req.query.email){
                  query = {email : req.query.email}
                }
                const cursor =  productCollection.find(query);
                const products= await cursor.toArray();
                res.send(products)
            });

            
            app.post('/advertisedItems', async (req, res) => {
                const add = req.body;
                const result = await advertisedCollection.insertOne(add);
                res.send(result);
            });
            app.post('/booking', async (req, res) => {
                const booking = req.body;
                const result = await bookingCollection.insertOne(booking);
                res.send(result);
            });
            app.post('/products', async (req, res) => {
                const products = req.body;
                const result = await productCollection.insertOne(products);
                res.send(result);
            });
            app.post('/users', async (req, res) => {
                const user = req.body;
                const result = await userCollection.insertOne(user);
                res.send(result);
            });
    
        }
        finally{

        }
}
run().catch(err => console.log(err));







app.get('/', (req, res) => {
    res.send('server is running')
})




app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})