var nodemailer = require('nodemailer');

async function sendEmail(req, res) {
    let link = "http://localhost:3000/resetpassword";
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'upravljanjeskladistem@gmail.com',
            pass: '-upravljanjeskladistem-'
        },
        secure: true,
    });
    var mailOptions = {
        from: "upravljanjeskladistem@gmail.com",
        
        to: "valentina.gotal7@gmail.com",
        subject: req.body.subject,
        attachments: [{
          filename: 'file.pdf',
          path: 'C:/Users/Korisnik/Desktop/somefile.pdf',
          contentType: 'application/pdf'
        }],
        html: '<!DOCTYPE html>' +
            '<html><head><title>' + req.body.title + '</title>' +
            '</head><body><div>' +
            '<h2>Zatraženi su podatci za resetiranje lozinke.</h2>' +
            '<p>Trajanje linka je ograničeno na 12 sati od vremena primitka.</p>' +
            '<p>Kliknite na sljedeći <a href="' + link + '">link</a> za postavljanje nove lozinke.</p>' +
            '</div></body></html>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            /*
            var mailModel = new newMailModel({
                from: mailOptions.from,
                to: mailOptions.to,
                subject: mailOptions.subject,
                text: mailOptions.text,
                html: mailOptions.html,
            });
            mailModel.save();
            */
            res.status(200).send('Mail Sent Successfully');
        }
    });
}

module.exports = sendEmail;
