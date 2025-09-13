const reader = require('../csv_reader'); // Reading function from the export
const fs = require('fs'); // Import fs module for reading,writing and deleting csv files

describe("Test case 2 - Jagged Table", () => {
  const file = "Jagged_table_sample.csv"; // Variable for Jagged sample

  beforeAll(() => {

    console.log("\n Test case 2 - Jagged Table")
    // Jagged content: rows have different number of columns
    fs.writeFileSync(file, "name,age\nKelvin,24\nAmaka\nDevine,20,New\tJersey\n,18,New\tYork");
  });

  it("should read and print a jagged table without crashing", () => { // Test Expectations
    // Reading the context of the Created Jagged Table, expected not to throw an error
    expect(() => reader.read_csv_print_plain_text(file)).not.toThrow();  
  });

  afterAll(() => {
    fs.unlinkSync(file); // Clears the temp created csv after passing the test
  });
});
