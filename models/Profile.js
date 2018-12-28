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
  userWishList: [
    {
      title: { type: String, required: true },
      importance: { type: Number, default: 5 },
      item: { checked: {type: Boolean, default: false}, friendId: {type: String} },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
