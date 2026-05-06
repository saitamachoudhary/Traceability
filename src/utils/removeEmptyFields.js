export const removeEmptyFields = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );
};
