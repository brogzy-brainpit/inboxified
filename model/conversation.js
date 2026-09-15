const mongoose = require("mongoose");

const conversationMessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      default: null
    },

    direction: {
      type: String,
      enum: ["inbound", "outbound"],
      required: true
    },

    from: {
      type: String,
      required: true
    },

    to: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      default: ""
    },

    text: {
      type: String,
      default: ""
    },

    html: {
      type: String,
      default: ""
    },

    date: {
      type: Date,
      default: Date.now
    },

    inReplyTo: {
      type: String,
      default: null
    },

    references: {
      type: String,
      default: null
    }
  },
  {
    _id: true
  }
);

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true
    },

    // Your existing campaign identifier
    trackerId: {
      type: String,
      default: null,
      index: true
    },

    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true
    },

    mailboxId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true
    },

    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    contactName: {
      type: String,
      default: ""
    },

    subject: {
      type: String,
      default: ""
    },

    threadId: {
      type: String,
      default: null,
      index: true
    },

    status: {
      type: String,
      enum: ["unread", "read", "replied", "closed"],
      default: "unread",
      index: true
    },

    awaitingReply: {
      type: Boolean,
      default: false
    },

    messages: {
      type: [conversationMessageSchema],
      default: []
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true
    },

    replyCount: {
      type: Number,
      default: 0
    },

    outboundCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

conversationSchema.index({
  userId: 1,
  contactEmail: 1
});

conversationSchema.index({
  userId: 1,
  mailboxId: 1,
  threadId: 1
});

conversationSchema.index(
  {
    userId: 1,
    "messages.messageId": 1
  },
  {
    sparse: true
  }
);

module.exports = mongoose.model(
  "Conversations",
  conversationSchema
);