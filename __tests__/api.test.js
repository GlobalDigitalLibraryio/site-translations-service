const enTranslations = require("../gdl/en.messages.json");

function request(url) {
  return new Promise((resolve, reject) => {
    const isEnglish = url === "en";
    process.nextTick(() =>
      isEnglish
        ? resolve(enTranslations)
        : reject({
            error: {
              message: "Could not find translations for " + url,
              status: 404
            }
          })
    );
  });
}

describe("test loading a json with translations", () => {
  it("should fetch english translation file", async () => {
    const en = await request("en");
    expect(en);
  });

  it("should contain a json with key, value pairs", () => {
    expect(enTranslations).toHaveProperty("Blog");
  });
});

describe("test loading a json which not exists", () => {
  it("should return error when trying to get ml", async () => {
    const shouldReturnError = await request("ml")
      .then()
      .catch(e => {
        expect(e).toEqual({
          error: {
            message: "Could not find translations for ml",
            status: 404
          }
        });
      });
  });
});
