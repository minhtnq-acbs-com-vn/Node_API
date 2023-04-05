import { asyncHandler } from "../utils/asyncHandler.js";
import { getMessaging } from "firebase-admin/messaging";

const pushNoti = asyncHandler(async (req, res, next) => {
  const message = {
    notification: {
      title: "AEDSS alert",
      body: req.body.info,
    },
    topic: req.body.topic,
  };
  let response = await getMessaging().send(message);
  res.status(200).json({ success: true, resopnse: response });
});

export { pushNoti };
