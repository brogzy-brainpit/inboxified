const nodemailer = require("nodemailer");

const User = require("../model/userAuth");
const Conversation = require("../model/conversation");


/*
|--------------------------------------------------------------------------
| GET ALL CONVERSATIONS
|--------------------------------------------------------------------------
*/

const getConversations = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }

    const {
      status,
      search,
      page = 1,
      limit = 30
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const filter = {
      userId
    };

    if (status && ["unread", "read", "replied", "closed"].includes(status)) {
      filter.status = status;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      filter.$or = [
        { contactName: searchRegex },
        { contactEmail: searchRegex },
        { subject: searchRegex }
      ];
    }

    const [conversations, total] = await Promise.all([
      Conversation.find(filter)
        .sort({ lastMessageAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),

      Conversation.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      conversations,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error("❌ getConversations:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations"
    });
  }
};


/*
|--------------------------------------------------------------------------
| GET SINGLE CONVERSATION
|--------------------------------------------------------------------------
*/

const getConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }

    const conversation = await Conversation.findOne({
      _id: id,
      userId
    }).lean();

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    res.status(200).json({
      success: true,
      conversation
    });

  } catch (error) {
    console.error("❌ getConversation:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch conversation"
    });
  }
};


/*
|--------------------------------------------------------------------------
| MARK AS READ
|--------------------------------------------------------------------------
*/

const markConversationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }

    const conversation = await Conversation.findOneAndUpdate(
      {
        _id: id,
        userId
      },
      {
        $set: {
          status: "read"
        }
      },
      {
        new: true
      }
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    res.status(200).json({
      success: true,
      conversation
    });

  } catch (error) {
    console.error("❌ markConversationRead:", error);

    res.status(500).json({
      success: false,
      message: "Failed to mark conversation as read"
    });
  }
};


/*
|--------------------------------------------------------------------------
| MARK AS UNREAD
|--------------------------------------------------------------------------
*/

const markConversationUnread = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }

    const conversation = await Conversation.findOneAndUpdate(
      {
        _id: id,
        userId
      },
      {
        $set: {
          status: "unread"
        }
      },
      {
        new: true
      }
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    res.status(200).json({
      success: true,
      conversation
    });

  } catch (error) {
    console.error("❌ markConversationUnread:", error);

    res.status(500).json({
      success: false,
      message: "Failed to mark conversation as unread"
    });
  }
};


/*
|--------------------------------------------------------------------------
| REPLY TO CONVERSATION
|--------------------------------------------------------------------------
*/

const replyToConversation = async (req, res) => {
  try {
    const {
      userId,
      text,
      html
    } = req.body;

    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }

    if (!text && !html) {
      return res.status(400).json({
        message: "Reply content is required"
      });
    }


    /*
    |--------------------------------------------------------------------------
    | FIND CONVERSATION
    |--------------------------------------------------------------------------
    */

    const conversation = await Conversation.findOne({
      _id: id,
      userId
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }


    /*
    |--------------------------------------------------------------------------
    | FIND USER
    |--------------------------------------------------------------------------
    */

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }


    /*
    |--------------------------------------------------------------------------
    | FIND ORIGINAL MAILBOX
    |--------------------------------------------------------------------------
    */

    const mailbox = user.warmupInboxes.find(
      (inbox) =>
        inbox._id.toString() ===
        conversation.mailboxId?.toString()
    );

    if (!mailbox) {
      return res.status(400).json({
        success: false,
        message: "Original sending mailbox is no longer available"
      });
    }


    /*
    |--------------------------------------------------------------------------
    | MAKE SURE MAILBOX IS ACTIVE
    |--------------------------------------------------------------------------
    */

    if (mailbox.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This mailbox is not active"
      });
    }


    /*
    |--------------------------------------------------------------------------
    | FIND LAST MESSAGE
    |--------------------------------------------------------------------------
    */

    const messages = conversation.messages || [];

    const lastMessage =
      messages.length > 0
        ? messages[messages.length - 1]
        : null;


    /*
    |--------------------------------------------------------------------------
    | COLLECT REFERENCES
    |--------------------------------------------------------------------------
    */

    const references = messages
      .map((message) => message.messageId)
      .filter(Boolean);


    /*
    |--------------------------------------------------------------------------
    | CREATE SMTP TRANSPORT
    |--------------------------------------------------------------------------
    */

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: mailbox.inbox,
        pass: mailbox.appPassword
      }
    });


    /*
    |--------------------------------------------------------------------------
    | MAIL CONFIG
    |--------------------------------------------------------------------------
    */

    const mailConfig = {
      from: `${mailbox.firstName || "Mailing_Agent"} <${mailbox.inbox}>`,
      to: conversation.contactEmail,

      subject: conversation.subject
        ? conversation.subject.startsWith("Re:")
          ? conversation.subject
          : `Re: ${conversation.subject}`
        : "Re:",

      text: text || "",

      replyTo: mailbox.inbox,

      headers: {
        "X-Priority": "3",
        "X-Mailer": "Nodemailer"
      }
    };


    /*
    |--------------------------------------------------------------------------
    | HTML
    |--------------------------------------------------------------------------
    */

    if (html && html.trim()) {
      mailConfig.html = html;
    }


    /*
    |--------------------------------------------------------------------------
    | GMAIL THREADING
    |--------------------------------------------------------------------------
    */

    if (lastMessage?.messageId) {
      mailConfig.inReplyTo = lastMessage.messageId;
    }

    if (references.length > 0) {
      mailConfig.references = references.join(" ");
    }


    /*
    |--------------------------------------------------------------------------
    | SEND
    |--------------------------------------------------------------------------
    */

    const info = await transport.sendMail(mailConfig);


    /*
    |--------------------------------------------------------------------------
    | SAVE OUTBOUND MESSAGE
    |--------------------------------------------------------------------------
    */

    const outboundMessage = {
      messageId: info.messageId,

      direction: "outbound",

      from: mailbox.inbox,

      to: conversation.contactEmail,

      subject: mailConfig.subject,

      text: text || "",

      html: html || "",

      date: new Date(),

      inReplyTo:
        lastMessage?.messageId || null,

      references:
        references.length > 0
          ? references.join(" ")
          : null
    };


    conversation.messages.push(
      outboundMessage
    );

    conversation.outboundCount =
      (conversation.outboundCount || 0) + 1;

    conversation.lastMessageAt =
      outboundMessage.date;

    conversation.awaitingReply = true;

    conversation.status = "read";

    await conversation.save();


    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    res.status(200).json({
      success: true,

      message: "Reply sent successfully",

      conversation,

      sent: {
        messageId: info.messageId,
        mailbox: mailbox.inbox
      }
    });

  } catch (error) {

    console.error(
      "❌ replyToConversation:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to send reply",
      error: error.message
    });
  }
};


module.exports = {
  getConversations,
  getConversation,
  markConversationRead,
  markConversationUnread,
  replyToConversation
};