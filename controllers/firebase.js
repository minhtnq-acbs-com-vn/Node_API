import { asyncHandler } from "../utils/asyncHandler.js";
import { initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const pushNoti = asyncHandler(async (req, res, next) => {
  initializeApp({
    credential: cert(JSON.parse(process.env.firebaseKey)),
    databaseURL:
      "https://iot-data-22125-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
  const registrationToken =
    "eE67QA0LSk2bGEb86pGuxv:APA91bEGGDXBS_ieUhwmYvT5iGrH5MYFGarSxccS6xlQuQQIX8VcmJbfbUuR0sw_ZVaEZtlyKcn8ghoPp1uAGyfxTn4Mxv8TS87BDWDCbZHQlJ92otZYb9gw95oV7anReSg_QT3TYX-k";

  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  let response = await getMessaging().send(message);
  console.log("response: ", response);

  res.status(200).json({ success: true });
});

export { pushNoti };
