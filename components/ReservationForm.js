import { auth } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';

// include userEmail when posting
const user = auth.currentUser;
if (!user || !user.email) {
  alert('You must be logged in with a valid email to post');
  return;
}

const data = {
  // fill in remaining fields appropriately in your app
  userId: user.uid,
  userEmail: user.email,
  createdAt: serverTimestamp()
};
*/