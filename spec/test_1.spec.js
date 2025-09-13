const reader = require('../csv_reader');

describe("Test case 1 - File Not Found", () => {
  it("should throw an error when file does not exist", () => {
    expect(() => reader.read_csv_print_plain_text("nonexistent.csv")).toThrowError("File not found: nonexistent.csv");
  });
});
