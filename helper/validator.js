module.exports = {
  verifyjoiSchema: async (data, schema) => {
    const ValidSchema = await schema.validate(data);
    if (ValidSchema && ValidSchema.error) {
      throw ValidSchema.error;
    } else {
      return ValidSchema.value;
    }
  },
};
