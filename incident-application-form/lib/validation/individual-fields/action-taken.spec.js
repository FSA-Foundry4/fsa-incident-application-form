const { validateActionTaken } = require("./action-taken");

const translations = require(`${__dirname}/../../../translations/form-fields.json`);

describe(`lib/validation/individual-fields/action-taken`, () => {
  const testCases = () => [
    [
      "missing field",
      undefined,
      {
        actionTaken: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "wrong data type",
      false,
      {
        actionTaken: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "provided field is empty",
      "",
      {
        actionTaken: {
          isValid: true,
          messages: [],
          value: "",
        },
      },
    ],
    [
      "ensure values are escaped",
      "<script>tag here</script>",
      {
        actionTaken: {
          isValid: true,
          messages: [],
          value: "&lt;script&gt;tag here&lt;&#x2F;script&gt;",
        },
      },
    ],
    [
      "happy path",
      "valid",
      {
        actionTaken: {
          isValid: true,
          messages: [],
          value: "valid",
        },
      },
    ],
  ];

  ["en", "cy"].forEach((languageCode) => {
    test.each(testCases(languageCode))(
      `%s - ${languageCode}`,
      (description, given, expected) => {
        const i18n = {
          languageCode,
          ...translations,
        };

        expect(validateActionTaken(given, i18n)).toEqual(expected);
      }
    );
  });
});
