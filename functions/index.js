const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

exports.matchReservations = functions.firestore
  .document('reservations/{resId}')
  .onCreate(async (snap) => {
    const data = snap.data();
    const { type, routeId, date, time, price, userEmail } = data;
    if (!userEmail) return null;

    const opposite = type === 'sell' ? 'iso' : 'sell';
    const db = admin.firestore();

    const matchQuery = db.collection('reservations')
      .where('type', '==', opposite)
      .where('routeId', '==', routeId)
      .where('date', '==', date)
      .where('time', '==', time)
      .where('matched', '==', false)
      .orderBy('createdAt')
      .limit(1);

    const matchSnap = await matchQuery.get();
    if (matchSnap.empty) return null;

    const matchDoc = matchSnap.docs[0];
    const matchData = matchDoc.data();
    if (!matchData.userEmail) return null;

    // send email
    const msg = {
      to: [userEmail, matchData.userEmail],
      from: functions.config().sendgrid.from,
      subject: 'BC Ferries Reservation Match! 🚢',
      text: `You have a match for route ${routeId} on ${date} at ${time} for $${price}. Please connect!`
    };
    await sgMail.send(msg);

    // mark both as matched
    await snap.ref.update({ matched: true });
    await matchDoc.ref.update({ matched: true });
    return null;
  });