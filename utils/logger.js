const fs = require("fs");

function logSuccess(person) {
  fs.appendFileSync(
    "./logs/sent.log",
    `${new Date().toLocaleString()} | ${person.company} | ${person.email} | SUCCESS\n`
  );
}

function logFailure(person, reason) {
  fs.appendFileSync(
    "./logs/failed.log",
    `${new Date().toLocaleString()} | ${person.company} | ${person.email} | FAILED | ${reason}\n`
  );
}

module.exports = {
  logSuccess,
  logFailure,
};

