const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

function createHash(data) {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

exports.secureLog = functions.firestore
  .document("logs/{logId}")
  .onCreate(async (snap) => {
    const inputData = snap.data();
    const collectionRef = db.collection("secureChain");
    const snapshot = await collectionRef.orderBy("timestamp", "desc").limit(1).get();

    let prevHash = "GENESIS";
    if (!snapshot.empty) {
      const lastDoc = snapshot.docs[0].data();
      prevHash = lastDoc.hash;
    }

    const newBlock = {
      data: inputData,
      timestamp: new Date().toISOString(),
      prevHash,
    };

    newBlock.hash = createHash(newBlock);
    await collectionRef.add(newBlock);

    console.log("✅ Secure log hashed and stored.");
  });

exports.verifyBlockchain = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection("secureChain").orderBy("timestamp").get();
  let previousHash = "GENESIS";

  for (const doc of snapshot.docs) {
    const current = doc.data();
    const calculatedHash = createHash({
      data: current.data,
      timestamp: current.timestamp,
      prevHash: current.prevHash,
    });

    if (current.hash !== calculatedHash || current.prevHash !== previousHash) {
      console.warn(`⚠️ Tampering detected at document: ${doc.id}`);
      return res.status(400).send(`Tampering detected at ${doc.id}`);
    }

    previousHash = current.hash;
  }

  res.status(200).send("✅ Blockchain integrity verified.");
});
