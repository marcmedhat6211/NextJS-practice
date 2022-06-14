import { MongoClient } from "mongodb";

// /api/new-meetup
/**
 * API ROUTES
 * You can define backend apis in this file
 * The file name is the name used in the route
 * The file has to be stored in an api directory
 * The code here will only run on the server, NEVER on the client
 * If a request is sent to this url, it will trigger the function which we'll have to define in this file
 */

/**
 * Method name is up to you
 * The method receives 2 objects, request and response objects
 * The request object will be used to access the incoming data and the response will be used to send back a response
 */
const handle = async (req, res) => {
  // only executed if it's POST requests
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    // this should never be exposed to the client side, it is very safe here
    const client = await MongoClient.connect(
      "mongodb+srv://marcmedhat6211:marcmedhatdev@cluster0.rbkde.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db(); // db will be created on the fly if no db is there

    const meetupsCollection = db.collection("meetups"); // a collection is like a table in mysql

    const result = await meetupsCollection.insertOne(data); // this can return the added document id or something like that

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
};

// you have to export the defined method
export default handle;
