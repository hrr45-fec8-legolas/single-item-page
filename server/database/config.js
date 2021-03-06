/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/singleItemPage?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
mongoose.connect(uri, { useNewUrlParser: true });
const { Schema } = mongoose;


const itemSchema = new Schema({
  itemId: Number,
  altImages: [String],
});

const Item = mongoose.model('Items', itemSchema);

const createItem = function (obj, cb = () => {}) {
  const item = new Item(obj);

  item.save((err) => {
    if (err) { cb(err, null); } else { cb(null, 'congrats'); }
  });
};
const deleteAll = function () {
  Item.deleteMany({}, (err) => {
    if (err) { console.log(err); }
  });
};
const getItem = (id, cb) => {
  Item.findOne({ itemId: id }, (err, item) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, item);
  });
};

module.exports = {
  createItem,
  deleteAll,
  getItem,
};
