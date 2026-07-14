const fs = require("fs");
const readCSV = require("./csvReader");
const readExcel = require("./excelReader");

async function readContacts() {
  const excelPath = "./data/companies.xlsx";
  const csvPath = "./data/emails.csv";

  if (fs.existsSync(excelPath)) {
    console.log("📗 Excel file detected.");
    return readExcel(excelPath);
  }

  console.log("📄 CSV file detected.");
  return await readCSV(csvPath);
}

module.exports = readContacts;
