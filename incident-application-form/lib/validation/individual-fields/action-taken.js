const validator = require("validator");

module.exports = {
  validateActionTaken: (actionTaken, i18n) => {
    return {
      actionTaken: {
        isValid: true,
        messages: [],
        value: (actionTaken && validator.escape(actionTaken.toString())) || "",
      },
    };
  },
};
