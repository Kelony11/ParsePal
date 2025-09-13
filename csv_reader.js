const fs = require("fs"); // Import the built-in File System module to read/write files
const readline = require("readline"); // Import Readline module to get user input from the terminal

function read_csv_print_plain_text(file_path) {

  // Error check 1.  If file does not exist, stop with an error
  if (!fs.existsSync(file_path)) {
    throw new Error(`File not found: ${file_path}`);
  }

  // Read the content of the file as UTF-8 text and remove extra whitespace
  const file_content = fs.readFileSync(file_path, "utf8").trim();

  // Error check 2.  If the file is empty, throw error.
  if (file_content === "") {
    throw new Error("Error Message: File is empty");
  }

  // Split the content into rows and then into cells, replacing tabs with spaces

  const rows = file_content.split(/\r?\n/).filter(line => line.trim() !== ""); // Creating rows before \n
  const table = rows.map(row => row.replace(/\t/g, " ").split(",")); // Listing each row with a comma

  // Error check 3. Throw error if any table (list) is completely empty
  if (!Array.isArray(table) || table.length === 0) {
    throw new Error("Invalid CSV: table is empty or improperly formatted.");
  }

  // Step 1: Normalize all rows to same number of columns
  const max_cols = Math.max(...table.map(row => row.length));
  table.forEach(row => {
    while (row.length < max_cols) {
      row.push(""); // fill missing cells
    }
  });

  // Step 2: Find the widest content in each column
  const col_widths = [];
  table.forEach(row => {
    row.forEach((cell, i) => {
      const len = (cell || "").trim().length;
      col_widths[i] = Math.max(col_widths[i] || 0, len);
    });
  });

  // Step 3: Format and print each row with proper spacing
  table.forEach(row => {
    const line = row.map((cell, i) => {
      const value = (cell || "").trim().replace(/\s+/g, " ");
      const pad = " ".repeat(col_widths[i] - value.length);
      return value + pad;
    }).join(" | ");
    console.log(line); // Print each row
  });
}


// THIS PART RUNS IF AND ONLY IF THE USER READS THE CSV FILE DIRECTLY FROM THE COMMAND LINE

if (require.main === module) {

 // Get the file path from command-line arguments
 // (eg. node csv_reader.js sample.csv)
  const file_path_user_input = process.argv[2];

  // If file path is provided...
  if (file_path_user_input) {
    try {
      read_csv_print_plain_text(file_path_user_input); // Call the main function passing the provided path
    } catch (err) {
      console.error(err.message); // Return Error 1
    }
  } else {
    // Prompt the user for input if no file path is provided
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // If the second argument isn't provided, ask User to provide it
    rl.question("Enter the path to the CSV file: ", (userInput) => {
      try {
        read_csv_print_plain_text(userInput.trim());
      } catch (err) {
        console.error(err.message); // Throw Error 1
      } finally {
        rl.close(); // Close the prompt
      }
    });
  }

}

// Export the function so test files or other files can import it
module.exports = { read_csv_print_plain_text };
