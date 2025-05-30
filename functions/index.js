const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

exports.matchReservations = functions.firestore
  .document('reservations/{resId}')
  .onCreate(async (snap, context) => {
    const newRes = snap.data();
    const { type, routeId, date, time, price, userEmail } = newRes;
    if (!userEmail) return null;
    const opposite = type === 'sell' ? 'iso' : 'sell';
    const db = admin.firestore();

    const matches = await db.collection('reservations')
      .where('type', '==', opposite)
      .where('routeId', '==', routeId)
      .where('date', '==', date)
      .where('time', '==', time)
      .orderBy('createdAt')
      .limit(1)
      .get();

    if (matches.empty) return null;

    const matchDoc = matches.docs[0];
    const match = matchDoc.data();
    if (!match.userEmail) return null;

    const msg = {
      to: [userEmail, match.userEmail],
      from: functions.config().sendgrid.from,
      subject: 'BC Ferries Reservation Match! 🚢',
      text: `You and another user have matching ${type === 'sell' ? 'buyer' : 'seller'}/${opposite} reservations:\n\nRoute: ${routeId}\nDate: ${date} at ${time}\nPrice: $${price}\n\nPlease reach out to each other to complete the exchange.`
    };
    await sgMail.send(msg);

    await snap.ref.update({ matched: true });
    await matchDoc.ref.update({ matched: true });
    return null;
  });

