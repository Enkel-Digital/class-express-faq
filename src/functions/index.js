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

exports.CreateFAQDocument = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method !== "OPTIONS" && req.method !== "POST")
    return res.status(404).send("Method not supported");

  // get parameter values
  const newDocument = {
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
    timestamp: FieldValue.serverTimestamp(),
  };
  console.log(req);
  console.log(newDocument);
  // Push the new faq into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("faq")
    .add(newDocument);
  // Send back a message that we've succesfully written the message
  res.json({ result: writeResult.id });
});

exports.UpdateFAQDocument = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // get parameter values
  const newDocument = {
    question: req.query.question,
    answer: req.query.answer,
    category: req.query.category,
    timestamp: FieldValue.serverTimestamp(),
  };

  // get doc reference based on id
  const documentReference = admin
    .firestore()
    .collection("faq")
    .doc(req.query.id);

  // Set and overwrite a faq into Cloud Firestore using the Firebase Admin SDk.
  const updateResult = documentReference.get().then(function(doc) {
    if (doc.exists) {
      console.log(
        "Function of update document: document ",
        doc.data(),
        "exists!"
      );
      doc.update(updatedDocument).then(function() {
        res.json({ result: `FAQ with ID: ${updateResult.id} update.` });
      });
    } else console.log("Function of update document: document does not exist!");
  });
});

exports.DeleteFAQDocument = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // get doc reference based on id
  const documentReference = admin
    .firestore()
    .collection("faq")
    .doc(req.query.id);

  const deleteDocument = documentReference.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  });
  res.json({ result: `FAQ with ID: ${req.query.id} has been deleted.` });
});

exports.RaiseTicket = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // Grab the text parameters & form variable and turn it into an array
  const newDocument = {
    email: req.query.email,
    name: req.query.name,
    category: req.query.category,
    resolved: false,
    timestamp: FieldValue.serverTimestamp(),
  };
  // Push the new faq into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("support")
    .add(newDocument);
  // Send back a message that we've succesfully written the message
  res.json({ result: `Raised support ticket of ID: ${writeResult.id}.` });
});

exports.ReachCustomer = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // Grab the text parameters & form variable and turn it into an array
  const newDocument = {
    email: req.query.email,
    name: req.query.name,
    //...
  };
  // implement email feature here to reach customer through GUI
  res.json({ result: "Success!" });
});

exports.CloseTicket = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // Grab the text parameters & form variable and turn it into an array
  const ticketID = req.query.id;

  // get doc reference based on id
  const documentReference = admin
    .firestore()
    .collection("support")
    .doc(req.query.id);

  // Set and overwrite a faq into Cloud Firestore using the Firebase Admin SDk.
  const updateResult = documentReference.get().then(function(doc) {
    if (doc.exists) {
      console.log(
        "Function of update document: document ",
        doc.data(),
        "exists!"
      );
      doc
        .update({
          resolved: true,
        })
        .then(function() {
          res.json({
            result: `Support ticket with ID: ${updateResult.id} resolved.`,
          });
        });
    } else console.log("Function of update document: document does not exist!");
  });
});

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
