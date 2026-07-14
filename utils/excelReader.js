const XLSX = require("xlsx");

function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);

  return data.filter(
    (row) =>
      row.email &&
      String(row.email).trim() !== ""
  );
}

module.exports = readExcel;
