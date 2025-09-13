const reader = require('../csv_reader');
const fs = require('fs');

describe("Test case 4 - Special Characters", () => {
  const file = "special_chars.csv";

  beforeAll(() => {
    console.log("\n Test case 4 - Special Characters")
    fs.writeFileSync(file, "name,comment\nKelvin,\"Hello @world! #hashtag\"\nAnna,\"Symbols: $%^&*()_+=!\"\nBob,\"Quote: \\\"Hello\\\"\"");
  });

  it("should handle special characters and symbols without errors", () => {
    expect(() => reader.read_csv_print_plain_text(file)).not.toThrow();
  });

  afterAll(() => {
    fs.unlinkSync(file);
  });
});
