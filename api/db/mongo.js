import { MongoClient, ServerApiVersion } from "mongodb";

const initClient = async () => {
  const uri = process.env.MONGODB_CONNECTION;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    console.log("Database connected");
  } catch (error) {
    await client.close();
    console.log("Failed connecting to MongoDB");
  }

  return client;
};

export { initClient };