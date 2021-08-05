import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateStocktakingPDF = (data, startDate, endDate) => {
  let tableRows = [];
  let head = [];
  let y = 40;

  const doc = new jsPDF('p', 'mm');
  let pageHeight = doc.internal.pageSize.height;
  let startDateArray = startDate.split("-").reverse();
  let endDateArray = endDate.split("-").reverse();

  doc.setFontSize(18);
  doc.text("Izvještaj za inventuru", 75, 18);
  doc.text("Period od " + startDateArray.join(".") + "." + " do " + endDateArray.join(".") + ".", 55, 28);
  doc.setFontSize(16);

  data.forEach((warehouse, i) => {
    head = [
      [
        { content: 'Naziv skladista: ' + warehouse.warehouse_name, colSpan: 2, styles: { halign: 'center', fillColor: [22, 160, 133] } },
        { content: 'Lokacija: ' + warehouse.location_name, colSpan: 2, styles: { halign: 'center', fillColor: [22, 160, 133] } },
        { content: 'Grad: ' + warehouse.city_name, colSpan: 2, styles: { halign: 'center', fillColor: [22, 160, 133] } }
      ],
      ["Proizvod", "Kategorija", "Potkategorija", "Ambalaza", "Izbrojena Kolicina", 'Prava Kolicina'],
    ];
    tableRows = [];
    warehouse.data.forEach(item => {
      const itemData = [
        item.product_name,
        item.category_name,
        item.subcategory_name,
        item.packaging_name,
        item.counted_quantity,
        item.real_quantity,
      ];
      tableRows.push(itemData);
    });
    if (i != 0 && doc.lastAutoTable.finalY && y >= pageHeight) {
      doc.addPage();
      y = 0
    }
    else if (i != 0) {
      y = doc.lastAutoTable.finalY + 10
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
      headStyles: { halign: 'center', valign: 'middle' },
      didParseCell: enhanceWordBreak,
    });
  });
  let dateStr = startDateArray.join("_") + "_do_" + endDateArray.join("_");

  doc.save(`izvještaj_inventura_${dateStr}.pdf`);
};

function enhanceWordBreak({ doc, cell, column }) {
  if (cell === undefined) {
    return;
  }

  const hasCustomWidth = (typeof cell.styles.cellWidth === 'number');

  if (hasCustomWidth || cell.raw == null || cell.colSpan > 1) {
    return
  }

  let text;

  if (cell.raw instanceof Node) {
    text = cell.raw.innerText;
  } else {
    if (typeof cell.raw == 'object') {
      return;
    } else {
      text = '' + cell.raw;
    }
  }

  const words = text.split(/\s+/);

  const maxWordUnitWidth = words.map(s => Math.floor(doc.getStringUnitWidth(s) * 100) / 100).reduce((a, b) => Math.max(a, b), 0);
  const maxWordWidth = maxWordUnitWidth * (cell.styles.fontSize / doc.internal.scaleFactor)

  const minWidth = cell.padding('horizontal') + maxWordWidth;

  if (minWidth > cell.minWidth) {
    cell.minWidth = minWidth;
  }

  if (cell.minWidth > cell.wrappedWidth) {
    cell.wrappedWidth = cell.minWidth;
  }

  if (cell.minWidth > column.minWidth) {
    column.minWidth = cell.minWidth;
  }

  if (column.minWidth > column.wrappedWidth) {
    column.wrappedWidth = column.minWidth;
  }
}

export default generateStocktakingPDF;