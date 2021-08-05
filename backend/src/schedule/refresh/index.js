const Joi = require("joi");
const NotificationSetting = require("../../notification_settings/schema");
const PasswordRequest = require("../../users/passwordRequestSchema");
const cron = require('node-cron');
const moment = require("moment");
var nodemailer = require('nodemailer');

const serializer = Joi.object({
  password: Joi.string().required()
});

async function refresh(req, res) {
  try {
    const result = serializer.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: "Poslani su neispravni podatci!" });
    }
    if (result.value.password != process.env.SUPER_ADMIN_PASSWORD) {
      return res.status(403).json({ error: "Nemate prava pristupa!" });
    }

    const notificationSettings = await NotificationSetting.find({}).populate("notification_type_id", { name: 1 });

    let cronTasks = cron.getTasks();
    if (cronTasks.length > 0) {
      cronTasks.forEach(task => {
        task.stop();
      });
    }
    
    cron.schedule("0 */12 * * *", async () => {
      var forgotPasswordEmails = await PasswordRequest.find({ isUsed: false });
      let tasks = [];
      forgotPasswordEmails.forEach(request => {
        if (moment().diff(moment(request.createdAt, "YYYY/MM/DD HH:mm"), 'hours') > 12) {
          tasks.push(PasswordRequest.findByIdAndUpdate(request._id, {
            isUsed: true,
          }));
        }
      })
      await Promise.all(tasks);
    });

    notificationSettings.forEach(setting => {
      if (setting.notification_type_id.name == "Dnevna obavijest") {
        let time = moment(setting.time).format("HH:mm").toString();
        let timeArray = time.split(":");

        cron.schedule(`${timeArray[1]} ${timeArray[0]} * * *`, () => {
          let date = moment().format("YYYY/MM/DD HH:mm").toString();
          let email = setting.email;
          let title = `Dnevni izvještaj ${date}`
          sendEmail(title, email)
        });
      }
      else if (setting.notification_type_id.name == "Tjedna obavijest") {
        let time = moment(setting.time).format("HH:mm").toString();
        let timeArray = time.split(":");
        let day_of_week = setting.day_of_week;

        cron.schedule(`${timeArray[1]} ${timeArray[0]} * * ${day_of_week}`, () => {
          let date = moment().format("YYYY/MM/DD HH:mm").toString();
          let email = setting.email;
          let title = `Tjedni izvještaj ${date}`
          sendEmail(title, email)
        });
      }
      else if (setting.notification_type_id.name == "Mjesečna obavijest") {
        let time = moment(setting.time).format("HH:mm").toString();
        let timeArray = time.split(":");

        cron.schedule(`${timeArray[1]} ${timeArray[0]} * 1-12 *`, () => {
          let date = moment().format("YYYY/MM/DD HH:mm").toString();
          let email = setting.email;
          let title = `Mjesečni izvještaj ${date}`
          sendEmail(title, email)
        });
      }
    });

    return res.status(200).json({ status: "Uspješno osvježene automatske obavijesti!" });
  } catch (err) {
    return res.status(500).json({ error: "Dogodila se pogreška, molimo kontaktirajte administratora!" });
  }
}

function sendEmail(title, email) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.LOGGER_EMAIL,
      pass: process.env.LOGGER_PASSWORD
    },
    secure: true,
  });
  var mailOptions = {
    from: "upravljanjeskladistem@gmail.com",
    to: email,
    subject: title,
    html: '<!DOCTYPE html>' +
      '<html><head><title>Dnevna obavijest o stanju proizvoda na skladištima</title>' +
      '</head><body></body></html>'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = refresh;
