
require("dotenv").config();

const delay = require("./utils/delay");
const sendMail = require("./utils/mailSender");
const fs = require("fs");
const csv = require("csv-parser");
const validator = require("validator");
const XLSX = require("xlsx");

function getTime() {
  return new Date().toLocaleString();
}



const htmlTemplate = fs.readFileSync(
  "./templates/emailTemplate.html",
  "utf8"
);

const emails = [];
const processedEmails = new Set();


fs.createReadStream("./data/emails.csv")
  .pipe(csv())
  .on("data", (row) => emails.push(row))
  .on("end", async () => {
    console.log(`Found ${emails.length} email(s)\n`);

    for (let i = 0; i < emails.length; i++) {
      const person = emails[i];


    
 // Invalid email check


       if (!validator.isEmail(person.email)) {
       console.log(`❌ Invalid Email: ${person.email}`);

  fs.appendFileSync(
    "./logs/failed.log",
    `${getTime()} | ${person.company} | ${person.email} | INVALID EMAIL\n`
  );

  continue;
}

// Duplicate email check
if (processedEmails.has(person.email)) {
  console.log(`⚠ Duplicate Email Skipped: ${person.email}`);
  continue;
}

processedEmails.add(person.email);

      const personalizedHtml = htmlTemplate
        .replace(/{{name}}/g, person.name)
        .replace(/{{company}}/g, person.company);

      console.log(`Sending ${i + 1}/${emails.length} to ${person.email}`);

      try {
        await sendMail({
          from: process.env.EMAIL,
          to: person.email,
          subject: `Application for MERN Stack Developer - ${person.company}`,
          html: personalizedHtml,
          attachments: [
            {
              filename: "Mohammad_Zibrrail_Mansuri_ATS_Resume.pdf",
              path: "./attachments/Mohammad_Zibrrail_Mansuri_ATS_Resume.pdf",
            },
          ],
        });


        console.log("✅ Sent Successfully\n");
       

         console.log("⏳ Waiting 5 seconds...\n");
         await delay(5000);
       
         fs.appendFileSync(
         "./logs/sent.log",
         `${getTime()} | ${person.company} | ${person.email} | SUCCESS\n`
        );

      } catch (err) {
        console.log("❌ Failed:", err.message);
      
               fs.appendFileSync(
               "./logs/failed.log",
              `${getTime()} | ${person.company} | ${person.email} | FAILED | ${err.message}\n`
             );

       }
    }

    console.log("🎉 All emails processed.");
  });
