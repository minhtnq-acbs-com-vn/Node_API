import { asyncHandler } from "../utils/asyncHandler.js";
import { initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "@firebase/messaging";

const pushNoti = asyncHandler(async (req, res, next) => {
  const app = initializeApp({
    credential: cert(JSON.parse(process.env.firebaseKey)),
    databaseURL:
      "https://iot-data-22125-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
  const registrationToken =
    "ep_Bo_46T40sk3QvLzchvk:APA91bFU58JUFx1cmXJxOrtUFGgXZ2CEyKWmEACdOKYJYPXvXzXqysoHRm3AMtsZE819gHZXGmgP3_ikpRflqDddOLCMtyrSrK9MashCtIA71 GilkaiW3MpZVBWVEK8JQjDxkoG41OMI";

  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.

  let { response, error } = await getMessaging(app).send(message);
  console.log("error: ", error);
  console.log("response: ", response);

  res.status(200).json({ success: true });
});

export { pushNoti };
