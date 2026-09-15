const express = require("express");

const {
  getConversations,
  getConversation,
  markConversationRead,
  markConversationUnread,
  replyToConversation
} = require("../controllers/conversationControllers");

const router = express.Router();


/*
|--------------------------------------------------------------------------
| GET CONVERSATIONS
|--------------------------------------------------------------------------
|
| GET /conversations?userId=...
|
*/

router.get(
  "/",
  getConversations
);


/*
|--------------------------------------------------------------------------
| GET SINGLE CONVERSATION
|--------------------------------------------------------------------------
|
| GET /conversations/:id?userId=...
|
*/

router.get(
  "/:id",
  getConversation
);


/*
|--------------------------------------------------------------------------
| MARK READ
|--------------------------------------------------------------------------
|
| PATCH /conversations/:id/read
|
*/

router.patch(
  "/:id/read",
  markConversationRead
);


/*
|--------------------------------------------------------------------------
| MARK UNREAD
|--------------------------------------------------------------------------
|
| PATCH /conversations/:id/unread
|
*/

router.patch(
  "/:id/unread",
  markConversationUnread
);


/*
|--------------------------------------------------------------------------
| REPLY
|--------------------------------------------------------------------------
|
| POST /conversations/:id/reply
|
*/

router.post(
  "/:id/reply",
  replyToConversation
);


module.exports = router;