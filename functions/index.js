const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "webdynamicx@gmail.com",
    pass: "fvpa iumc syvz cueq",
  },
});

exports.sendConfirmationEmails = functions.firestore
    .document("Users/{userId}/OferteInregistrate/{offerId}")
    .onUpdate(async (change, context) => {
      const newV = change.after.data();
      const oldV = change.before.data();

      if (newV.status === "Confirmata" && oldV.status !== "Confirmata") {
        const doctorRef = admin.firestore().doc(`Users/${newV.idUtilizator}`);
        const partenerRef = admin.firestore().doc(`Users/${newV.collectionId}`);

        const [doctor, partener] = await Promise.all([
          doctorRef.get(),
          partenerRef.get(),
        ]);

        const emails = [doctor.data().email, partener.data().email];

        const mailOptions = {
          from: "webdynamicx@gmail.com",
          to: emails.join(", "),
          subject: "Confirmare Oferta",
          text: "Oferta dumneavoastră a fost confirmată.",
        };

        await transporter.sendMail(mailOptions);
        console.log("Email-uri de confirmare trimise cu succes!");
      }
      return null;
    });
