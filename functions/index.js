const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: "mail.creditemedicale.ro",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "exclusivmd@creditemedicale.ro",
    pass: "vtn0079su8dh",
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
        const text = `Tranzactia înregistrată pentru oferta` +
        ` ${oldV.oferta.titluOferta} a fost confirmată de către echipa ` +
        `noastră. Pentru detalii suplimentare accesați www.exlusivmd.ro`;

        const mailOptions = {
          from: "exclusivmd@creditemedicale.ro",
          to: emails.join(", "),
          subject: `Confirmare Oferta ${oldV.oferta.titluOferta}`,
          text,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email-uri de confirmare trimise cu succes!");
      }
      return null;
    });
