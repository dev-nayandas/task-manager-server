const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pfvoz.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const taskCollection = client.db("taskManager").collection("tasks");
    const completedCollection = client
      .db("taskManager")
      .collection("completed");

    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });
    app.post("/completed", async (req, res) => {
      const task = req.body;
      const result = await completedCollection.insertOne(task);
      res.send(result);
    });

    app.get("/tasks", async (req, res) => {
      const query = {};
      const cursor = taskCollection.find(query);
      const tasks = await cursor.toArray();
      res.send(tasks);
    });

    app.get("/tasks1", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const cursor = taskCollection.find(query);
      const task = await cursor.toArray();
      res.send(task);
    });
    app.get("/completed", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const cursor = completedCollection.find(query);
      const completed = await cursor.toArray();
      res.send(completed);
    });

    app.delete("/tasks1/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/completed/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await completedCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/tasks1/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await taskCollection.findOne(query);
      res.send(result);
    });

    app.put("/task1/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const task = req.body;
      const option = { upsert: true };
      const updateTask = {
        $set: {
          task: task.task,
        },
      };
      const result = await taskCollection.updateOne(filter, updateTask, option);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
