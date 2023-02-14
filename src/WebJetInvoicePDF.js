import jsPDF from "jspdf";
import image from "./assests/WJ_AU.png";
import moment from "moment";
import config from "./config.json";

export const WebJetInvoicePDF = (invoiceDatas, fileName) => {
  var doc = new jsPDF("p", "pt");
  console.log(doc.getFontList());
  doc.setFont("courier", "bold");
  doc.setFontSize(18.5);
  doc.text(10, 20, "Tax Invoice");
  doc.setFont("courier", "bold");
  doc.setFontSize(9.5);
  GenerateHeader(doc);
  const flightDetails = [];

  let j = 1;
  let index = 0;

  let total = 0.0;
  let totalGST = 0.0;
  let serviceFee = config.ServiceFee;
  let serviceGSTFee = config.ServiceGSTFee;

  invoiceDatas.forEach((e, i) => {
    e.Segments.forEach((segment) => {
      flightDetails.push(
        "Flight-" +
          j +
          " " +
          moment(segment.StartDateTime).format("DD/MM/yyyy HH:mm") +
          "  " +
          segment.Carrier.Code +
          " " +
          segment.FlightNumber +
          " " +
          "("+segment.BookingClass+")" +
          " "+
          segment.Origin.CityCode +
          ">" +
          segment.Destination.CityCode
      );
      j = j + 1;
    });
    GeneratePassengerFee(
      doc,
      e,
      e.Passenger.FullName,
      flightDetails,
      i,
      serviceFee
    );
    index = i;
    flightDetails.splice(0, flightDetails.length);
    j = 1; //
    total =
      parseFloat(total) +
      parseFloat(
        e.AddtionalCollection!=="NOADC"?e.AddtionalCollection.replace(/^0+/, "").replace(/[^\d.-]/g, ""):0.00
      ) +
      parseFloat(e.ChangeFeeAmount.replace("@", "."));
    totalGST = parseFloat(totalGST) + parseFloat(e.GSTAmount);
  });
  total = parseFloat(total) + parseFloat(serviceFee===""?0.00:serviceFee);
  GenerateTotalWithFooter(doc, index, total, totalGST, serviceGSTFee);

  doc.save(fileName);
};

const GenerateHeader = (doc) => {
  var img = new Image();
  img.src = image;
  doc.addImage(img, "png", 350, 8);
  doc.setTextColor("red");
  doc.text(10, 40, "Webjet Reference:");
  doc.text(110, 40, "1223444444");
  doc.setTextColor("black");
  doc.text(10, 60, "Request Date:");
  doc.text(110, 60, moment().format("MM/DD/yyyy"));
  doc.text(8, 80, " Invoiced By:");
  doc.text(110, 80, " Webjet Marketing Pty Ltd");
  doc.setFont("courier", "bold");
  doc.setFontSize(11.5);
  doc.text(460, 80, "ABN: 84 063 430 848");
  doc.setFont("courier", "normal");
  doc.setFontSize(9.5);
  doc.setFillColor(255, 0, 0);
  doc.rect(10, 90, 600, 20, "F");
  doc.setTextColor("white");

  doc.text(8, 100, " Payment Details");
  doc.setFillColor(192, 192, 192);
  doc.rect(10, 110, 600, 20, "F");
  doc.setTextColor("white");
  doc.text(10, 120, "Price Breakdown");
};

const GeneratePassengerFee = (
  doc,
  invoiceData,
  paxdata,
  flightDetails,
  index,
  serviceFee
) => {
  let j = 0;
  doc.setTextColor("black");
  doc.setFont("courier", "bold");
  doc.text("Passenger:" + paxdata, 10, 140 + 100 * index);
  doc.setFont("courier", "normal");
  flightDetails.forEach((flightDetail) => {
    doc.text(10, 160 + 100 * (index + j), flightDetail);
    j = j + 0.1;
  });

  doc.setFont("courier", "bold");
  doc.text(
    10,
    180 + 100 * index,
    "Additional AirFare and Tax (Difference in Fare and Taxes)"
  );
  doc.text(
    450,
    180 + 100 * index,
    "$" +
      invoiceData.AddtionalCollection!=="NOADC"?invoiceData.AddtionalCollection.replace(/^0+/, "").replace(/[^\d.-]/g, ""):0.00
  );
  doc.text(8, 200 + 100 * index, " Airline Change Fee (Airline imposed fee)");
  doc.text(
    450,
    200 + 100 * index,
    "$" + invoiceData.ChangeFeeAmount.replace("@", ".") + "^"
  );
  if (
    serviceFee !== ""
      ? doc.text(8, 220 + 100 * index, "Service Charge Fee")
      : " "
  );
  if (
    serviceFee !== ""
      ? doc.text(450, 220 + 100 * index, "$" + serviceFee + "*")
      : null
  );
  doc.setLineWidth(1);
  if (
    serviceFee !== " "
      ? doc.line(10, 230 + 100 * index, 600, 230 + 100 * index)
      : doc.line(10, 210 + 100 * index, 600, 210 + 100 * index)
  );
  // doc.setDrawColor('white');
};

const GenerateTotalWithFooter = (
  doc,
  index,
  total,
  totalGST,
  serviceGSTFee
) => {
  doc.text(
    10,
    240 + 100 * index,
    " Total (Inclusive of any applicable Taxes and Charges)"
  );
  doc.text(450, 240 + 100 * index, "$" + total);
  doc.setFont("courier", "normal");
  doc.text(10, 250 + 100 * index, "*This item includes GST paid to Webjet");
  doc.setLineWidth(1);
  doc.line(10, 260 + 100 * index, 600, 260 + 100 * index);
  doc.setDrawColor(192, 192, 192);
  doc.setFont("courier", "bold");
  if (
    serviceGSTFee !== ""
      ? doc.text(10, 270 + 100 * index, " Goods and Services Tax (GST)")
      : ""
  );
  doc.setFont("courier", "normal");
  if (
    serviceGSTFee !== ""
      ? doc.text(10, 280 + 100 * index, " GST paid to Webjet on aboove total")
      : ""
  );
  if (
    serviceGSTFee !== ""
      ? doc.text(450, 280 + 100 * index, "$" + serviceGSTFee)
      : ""
  );
  let footerIndex=20;
  if(serviceGSTFee !== ""?footerIndex:footerIndex=0);
  GenerateFooterWithGSTServiceFee(doc, index, total, totalGST,footerIndex,serviceGSTFee);
};

function GenerateFooterWithGSTServiceFee(doc, index, total, totalGST,footerIndex,serviceGSTFee) {
   
    doc.text(10, 280+footerIndex + 100 * index, "Total amount excluding GST (If Applicable)");
    doc.text(450, 280+footerIndex  + 100 * index, "$" + total);  
    doc.setFillColor(192, 192, 192);
    doc.rect(10, 290+footerIndex  + 100 * index, 600, 20, "F");
    doc.setTextColor("black");
    total=parseFloat(total)+parseFloat(serviceGSTFee===""?0.00:serviceGSTFee);
    doc.text(10, 300+footerIndex  + 100 * index, "Total Payment");
    doc.setTextColor("black");
    doc.text(450, 300+footerIndex  + 100 * index, "$" + total);
    doc.setFont("courier", "bold");
    doc.text(8, 340+footerIndex  + 100 * index, " All Prices are in Australian Dollars");
    doc.setLineWidth(1);
    doc.line(10, 350+footerIndex , 600, 350+footerIndex );
    doc.setDrawColor(192, 192, 192);
    doc.setFont("courier", "normal");
    doc.text(8, 370+footerIndex  + 100 * index, "  ^GST Paid to Airline on above total");
    doc.text(450, 370+footerIndex  + 100 * index, "$" + parseFloat(totalGST));
    doc.setFont("courier", "bold");
    doc.text(
        10,
        390+footerIndex  + 100 * index,
        "Note: If the GST applies on your ticket, then its paid directly to the Airline."
    );
    doc.setFont("courier", "bold");
    doc.setFontSize(11);
    doc.text(
        150,
        410+footerIndex  + 100 * index,
        " Thank you for your booking. We hope you enjoy your travels."
    );
    doc.setFont("courier", "normal");
    doc.text(230, 430+footerIndex  + 100 * index, " Customer Service Centre");
}

export default WebJetInvoicePDF;

