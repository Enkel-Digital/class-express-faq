const cors = require("cors")();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
let FieldValue = require("firebase-admin").firestore.FieldValue;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://class-express-faq-test.firebaseio.com",
});

// get all FAQ data from collection
exports.GetAllFAQ = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // define which collection to reference
  const collectionReference = admin.firestore().collection("faq");
  // get collection referenced
  const getCollection = collectionReference
    .get()
    .then((snapshot) => {
      let temporaryArray = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      // return response of json array type
      res.json(temporaryArray);
    })
    .catch(function(error) {
      res.json("Got error", error);
    });
});

// create an FAQ Document
exports.CreateFAQDocument = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method !== "OPTIONS" && req.method !== "POST")
    return res.status(404).send("Method not supported");

  var writeResult = await admin.firestore().collection("faq").add({
    question: `${req.body.question}`,
    answer: `${req.body.answer}`,
    category: `${req.body.category}`,
    timestamp: FieldValue.serverTimestamp()
  });
  res.json(writeResult.id);
});

// update existing faq document
exports.UpdateFAQDocument = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT");
  res.set("Access-Control-Allow-Headers", "Content-Type");  
  if (req.method !== "OPTIONS" && req.method !== "PUT")
    return res.status(404).send("Method not supported");

  var documentReference = admin.firestore().collection("faq").doc(`${req.body.id}`).update({
    question: `${req.body.question}`,
    answer: `${req.body.answer}`,
    category: `${req.body.category}`,
    timestamp: FieldValue.serverTimestamp()
  });
    res.json({result: req.body.id});
});

// delete existing faq document
exports.DeleteFAQDocument = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "DELETE");
  res.set("Access-Control-Allow-Headers", "*");
  if (req.method !== "OPTIONS" && req.method !== "DELETE")
    return res.status(404).send("Method not supported");  

  deleteOperation = admin.firestore().collection("faq").doc(`${req.body.id}`).delete();

  // console.log(req.body.id);
  res.json({ result: req.body.id});
});

// get all support tickets
exports.GetAllTickets = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // define which collection to reference
  const collectionReference = admin.firestore().collection("support");
  // get collection referenced
  const getCollection = collectionReference
    .get()
    .then((snapshot) => {
      let temporaryArray = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      // return response of json array type
      res.json(temporaryArray);
    })
    .catch(function(error) {
      res.json("Got error", error);
    });
});

exports.GetIndividualTicket = functions.https.onRequest(async (req, res) => { 
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  var docRef = admin.firestore().collection("support").doc(`${req.query.id}`);

  docRef.get().then(function(doc) {
      if (doc.exists) {
          res.json(doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
})

// create a support ticket (by customer)
exports.RaiseTicket = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method !== "OPTIONS" && req.method !== "POST")
    return res.status(404).send("Method not supported");

  var writeResult = await admin.firestore().collection("support").add({
    email: `${req.body.email}`,
    name: `${req.body.name}`,
    category: `${req.body.category}`,
    resolved: "false",
    timestamp: FieldValue.serverTimestamp()
  });
  res.json(writeResult.id);
});

// @todo: base method to reach customer
exports.ReachCustomer = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // Grab the text parameters & form variable and turn it into an array
  const newDocument = {
    email: `${ req.body.email}` ,
    name: `${ req.body.name}`,
    //...
  };
  // implement some feature here to reach customer through GUI
  res.json({ result: "Success!" });
});

// update document to reflect resolved status
exports.CloseTicket = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT");
  res.set("Access-Control-Allow-Headers", "Content-Type");  
  if (req.method !== "OPTIONS" && req.method !== "PUT")
    return res.status(404).send("Method not supported");

  var documentReference = admin.firestore().collection("faq").doc(`${req.body.id}`).update({
    resolved: "true",
    timestamp: FieldValue.serverTimestamp()
  });
  
  res.json({result: req.body.id});
});

