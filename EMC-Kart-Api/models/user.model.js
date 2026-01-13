module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      email: String,
      uid: String,
      isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...obj } = this.toObject();
    obj.id = _id;
    return obj;
  });

  return mongoose.model("user", schema);
};
