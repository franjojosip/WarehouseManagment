const Joi = require("joi");
const NotificationSetting = require("../../notification_settings/schema");
const Stock = require("../../stock/schema");
const Warehouse = require("../../warehouse/schema");
const Location = require("../../location/schema");
const Product = require("../../product/schema");
const PasswordRequest = require("../../users/passwordRequestSchema");
const cron = require('node-cron');
const moment = require("moment");
var nodemailer = require('nodemailer');
const { default: jsPDF } = require("jspdf");
require('jspdf-autotable');
var fs = require('fs');

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
    let data = await getPdfData();
    generatePdf("DNEVNI IZVJEŠTAJ", "dnevni_izvjestaj_13_08_2021", data);

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

function generatePdf(title, docTitle, data) {
  let tableRows = [];
  let head = [];
  let y = 85;

  const doc = new jsPDF('p', 'mm');
  let pageHeight = doc.internal.pageSize.height;

  //Logo slika
  var path_url = './images/warehouse_logo_pdf2.png', format = 'PNG';
  var imgData = fs.readFileSync(path_url).toString('base64');
  doc.addImage(imgData, format, 15, 15, 41, 35);

  //PDF naslov
  doc.setFontSize(22);
  doc.text(title, 125, 22);

  //Naziv stranice
  doc.setFontSize(15);
  doc.text("Upravljanje skladištima", 140, 32);
  doc.setFontSize(13);
  doc.line(130, 36, 200, 36);

  //Url
  doc.text("www.upravljanjeskladistima.hr", 136, 42);

  //Period izvještaja
  doc.text("Izvještaj za period TEST", 115.1, 60);

  //Prijelom linija
  doc.setLineWidth(1.1);
  doc.setDrawColor(181, 181, 181);
  doc.line(0, 65, 220, 65);

  //Postavi font za tablicu
  doc.setFontSize(16);
  doc.setDrawColor(0, 0, 0);
  try {
    data.forEach((warehouse, i) => {
      head = [
        [
          { content: 'Naziv skladista: ' + warehouse.warehouse_name, colSpan: 2, styles: { halign: 'center', fillColor: [20, 151, 124] } },
          { content: 'Lokacija: ' + warehouse.location_name, colSpan: 2, styles: { halign: 'center', fillColor: [20, 151, 124] } },
          { content: 'Grad: ' + warehouse.city_name, colSpan: 1, styles: { halign: 'center', fillColor: [20, 151, 124] } }
        ],
        [
          { content: 'Proizvod', colSpan: 1, styles: { halign: 'center' } },
          { content: 'Kategorija', colSpan: 1, styles: { halign: 'center' } },
          { content: 'Potkategorija', colSpan: 1, styles: { halign: 'center' } },
          { content: 'Ambalaza', colSpan: 1, styles: { halign: 'center' } },
          { content: 'Kolicina', colSpan: 1, styles: { halign: 'center' } }
        ],
      ];
      tableRows = [];
      warehouse.data.forEach(item => {
        const itemData = [
          item.product_name,
          item.category_name,
          item.subcategory_name,
          item.packaging_name,
          item.quantity,
        ];
        tableRows.push(itemData);
      });
      if (i != 0 && doc.lastAutoTable.finalY && y >= pageHeight) {
        doc.addPage();
        y = 0
      }
      else if (i != 0) {
        y = doc.lastAutoTable.finalY + 15
      }
      let number = 2;
      doc.autoTable({
        startY: y,
        head: head,
        body: tableRows,
        theme: 'grid',
        tableWidth: 'auto',
        styles: {
          cellPadding: { top: number, right: number, bottom: number, left: number },
        },
        bodyStyles: { halign: 'center', valign: 'middle' },
        headStyles: { halign: 'center', valign: 'middle' }
      });
    });
  } catch (e) {
    console.log(e);
  }

  let date = moment().format("DD_MM_YYYY_HH_mm").toString();

  doc.save(`${date}_${docTitle}.pdf`);
};


async function getPdfData() {
  let stocks = await Stock.find({})
    .populate("warehouse_id", { name: 1, location_id: 1 })
    .populate("product_id", { name: 1 })

  let locations = await Location.find({}).populate("city_id", { name: 1 });
  let products = await Product.find({}).populate("category_id", { name: 1 }).populate("subcategory_id", { name: 1 }).populate("packaging_id", { name: 1 });

  let reportStocks = [];
  stocks.forEach((stock) => {
    let location = locations.find(location => location.id == stock.warehouse_id.location_id);
    let product = products.find(product => product.id == stock.product_id.id);

    let filteredReciepts = reportStocks.filter(reportReciept =>
      reportReciept.warehouse_id == stock.warehouse_id.id
      && reportReciept.product_id == stock.product_id.id
    );
    if (filteredReciepts.length == 0) {
      reportStocks.push({
        warehouse_id: stock.warehouse_id.id,
        warehouse_name: replaceUtf8(stock.warehouse_id.name),
        city_id: location.city_id.id,
        city_name: replaceUtf8(location.city_id.name),
        location_id: location.id,
        location_name: location.street,
        product_id: product.id,
        product_name: replaceUtf8(product.name),
        category_id: product.category_id.id,
        category_name: replaceUtf8(product.category_id.name),
        subcategory_id: product.subcategory_id != null ? product.subcategory_id.id : "",
        subcategory_name: product.subcategory_id != null ? replaceUtf8(product.subcategory_id.name) : "",
        packaging_id: product.packaging_id.id,
        packaging_name: replaceUtf8(product.packaging_id.name),
        quantity: stock.quantity,
        minimum_quantity: stock.minimum_quantity
      })
    }
    else {
      let index = reportStocks.indexOf(filteredReciepts[0]);
      reportStocks[index].quantity = reportStocks[index].quantity + stock.quantity;
    }
  });
  if (reportStocks.length > 0) {
    reportStocks = reportStocks.sort(compareCategories).sort(deepCompareProducts)
  }
  let grouppedReportReciepts = [];

  reportStocks.forEach(stock => {
    let filteredReciepts = grouppedReportReciepts.filter(grouppedReciept => grouppedReciept.warehouse_id == stock.warehouse_id);
    if (grouppedReportReciepts.length == 0 || filteredReciepts.length == 0) {
      grouppedReportReciepts.push({
        warehouse_id: stock.warehouse_id,
        warehouse_name: stock.warehouse_name,
        city_name: stock.city_name,
        location_name: stock.location_name,
        data: [stock]
      })
    }
    else {
      let index = grouppedReportReciepts.indexOf(filteredReciepts[0]);
      grouppedReportReciepts[index].data.push(stock);
    }
  });
  return grouppedReportReciepts.sort(compareCities).sort(deepCompareLocations);
}

function replaceUtf8(word) {
  return word
    .replace(/č|ć/g, "c").replace(/Č|Ć/g, "C")
    .replace("š", "s").replace("Š", "S")
    .replace("đ", "d").replace("Đ", "D")
    .replace("ž", "z").replace("Ž", "Z");
}
function compareCategories(a, b) {
  if (a.category_name[0] < b.category_name[0]) {
    return -1;
  }
  if (a.category_name[0] > b.category_name[0]) {
    return 1;
  }
  return 0;
}

function deepCompareProducts(a, b) {
  if (a.category_name[0] == b.category_name[0] && a.product_name[0] < b.product_name[0]) {
    return -1;
  }
  if (a.category_name[0] == b.category_name[0] && a.product_name[0] > b.product_name[0]) {
    return 1;
  }
  return 0;
}

function compareCities(a, b) {
  if (a.city_name[0] < b.city_name[0]) {
    return -1;
  }
  if (a.city_name[0] > b.city_name[0]) {
    return 1;
  }
  return 0;
}

function deepCompareLocations(a, b) {
  if (a.city_name[0] == b.city_name[0] && a.location_name[0] < b.location_name[0]) {
    return -1;
  }
  if (a.city_name[0] == b.city_name[0] && a.location_name[0] > b.location_name[0]) {
    return 1;
  }
  return 0;
}


module.exports = refresh;
