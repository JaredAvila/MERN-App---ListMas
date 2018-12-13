const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  handle: {
    type: String,
    required: true,
    maxlength: 40
  },
  imgUrl: { type: String },
  bio: { type: String },
  friends: [
    {
      friend: {
        name: { type: String },
        friendId: { type: String },
        date: { type: Date, default: Date.now }
      }
    }
  ],
  userWishList: [
    {
      title: { type: String, required: true },
      importance: { type: Number, default: 5 },
      checked: { type: Boolean, default: false },
      date: { type: Date, default: Date.now }
    }
  ],
  checkedItems: {
    type: [
      {
        item: { type: String },
        friend: { type: String },
        date: { type: Date, default: Date.now }
      }
    ]
  },
  date: { type: Date, default: Date.now }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
