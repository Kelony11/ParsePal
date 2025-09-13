const reader = require('../csv_reader'); // Reading function from the export
const fs = require('fs');  // Import fs module for reading,writing and deleting csv files


describe("Test case 3 - Empty Cells and Trailing Commas", () => {
  const file = "complex.csv"; // variable for the complex csv

  beforeAll(() => {
    console.log("\n Test case 3 - Empty Cells and Trailing Commas")
    // Creating the Complex csv
    fs.writeFileSync(file, "name,\tage,gym\nHauson,,LA\tFitness\nJames,33,\nJohn,,\tCrunch\tFitness,");
  });

  it("should handle empty cells and trailing commas", () => {
    expect(() => reader.read_csv_print_plain_text(file)).not.toThrow();
  });

  afterAll(() => {
    fs.unlinkSync(file); // Clear the table after test completed
  });
});
