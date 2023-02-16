import jsPDF from "jspdf";
import image from "./assests/WJ_AU.png";
import moment from "moment";
import config from "./config.json";

export const WebJetInvoicePDF = (invoiceDatas, fileName) => {
  var doc = new jsPDF("p", "pt");
  console.log(doc.getFontList());
  const fontType = 'Times';
  doc.setFont(fontType, "bold");
  doc.setFontSize(18.5);
  doc.text(10, 20, "Tax Invoice");
  doc.setFont(fontType, "bold");
  doc.setFontSize(9.5);
  const flightDetails = [];

  let j = 1;
  let index = 0;

  let total = 0.0;
  let totalGST = 0.0;
  let serviceFee = config.ServiceFee;
  let serviceGSTFee = config.ServiceGSTFee;
  const GenerateHeader = (doc) => {
    console.log(total);
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
    doc.setFont(fontType, "bold");
    doc.setFontSize(11.5);
    doc.text(460, 80, "ABN: 84 063 430 848");
    doc.setFont(fontType, "normal");
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
    doc.setFont(fontType, "bold");
    doc.text("Passenger:" + paxdata, 10, 140 + 100 * index);
    doc.setFont(fontType, "normal");
    flightDetails.forEach((flightDetail) => {
      doc.text(10, 160 + 100 * (index + j), flightDetail);
      j = j + 0.1;
    });

    doc.setFont(fontType, "bold");
    doc.text(
      10,
      180 + 100 * index,
      "Additional AirFare and Tax (Difference in Fare and Taxes)"
    );
    doc.text(
      450,
      180 + 100 * index,
      "$" + invoiceData.AddtionalCollection !== "NOADC"
        ? invoiceData.AddtionalCollection.replace(/^0+/, "").replace(
            /[^\d.-]/g,
            ""
          )
        : 0.0
    );
   
    doc.text(8, 200 + 100 * index, " Airline Change Fee (Airline imposed fee)")
    if(invoiceData.ChangeFeeIsSelected? doc.text(
      450,
      200 + 100 * index,
      "$" + invoiceData.ChangeFeeAmount.replace("@", ".") + "^"
  ):doc.text(
    450,
    200 + 100 * index,
    "$0.00"));
    if (
      serviceFee !== "" && invoiceData.ServiceFeeIsSelected
        ? doc.text(8, 220 + 100 * index, "Service Charge Fee")
        : " "
    );
    if (
      serviceFee !== "" && invoiceData.ServiceFeeIsSelected
        ? doc.text(450, 220 + 100 * index, "$" + serviceFee + "*")
        : null
    );
    doc.setLineWidth(1);
    if (
      serviceFee !== " " && invoiceData.ServiceFeeIsSelected
        ? doc.line(10, 230 + 100 * index, 600, 230 + 100 * index)
        : doc.line(10, 210 + 100 * index, 600, 210 + 100 * index)
    );
    // doc.setDrawColor('white');
  };
  
  const GenerateFooterWithGSTServiceFee = (
    doc,
    index,
    total,
    totalGST,
    footerIndex,
    serviceFeeVal,
    serviceGSTFee,travelType
  ) => {
    doc.text(
      10,
      280 + footerIndex + 100 * index,
      "Total amount excluding GST (If Applicable)"
    );
    doc.text(450, 280 + footerIndex + 100 * index, "$" + total);
    doc.setFillColor(192, 192, 192);
    doc.rect(10, 290 + footerIndex + 100 * index, 600, 20, "F");
    doc.setTextColor("black");
    total =
      parseFloat(total) +
      parseFloat(serviceGSTFee !== ""  && serviceFeeVal ?  serviceGSTFee:0.00);
    doc.text(10, 300 + footerIndex + 100 * index, "Total Payment");
    doc.setTextColor("black");
    doc.text(450, 300 + footerIndex + 100 * index, "$" + total);
    doc.setFont(fontType, "bold");
    doc.text(
      8,
      340 + footerIndex + 100 * index,
      " All Prices are in Australian Dollars"
    );
    //doc.setLineWidth(1);
    //doc.line(10, 350 + footerIndex, 600, 350 + footerIndex);
    //doc.setDrawColor(192, 192, 192);
    doc.setFont(fontType, "normal");
    doc.text(
      8,
      370 + footerIndex + 100 * index,
      "  ^GST Paid to Airline on above total"
    );
    if( (travelType === "Domestic") ?
    doc.text(450, 370 + footerIndex + 100 * index, "$" + parseFloat(totalGST)):
     doc.text(450, 370 + footerIndex + 100 * index, "$0.00" ));
    doc.setFont(fontType, "bold");
    doc.text(
      10,
      390 + footerIndex + 100 * index,
      "Note: If the GST applies on your ticket, then its paid directly to the Airline."
    );
    doc.setFont(fontType, "bold");
    doc.setFontSize(11);
    doc.text(
      150,
      410 + footerIndex + 100 * index,
      " Thank you for your booking. We hope you enjoy your travels."
    );
    doc.setFont(fontType, "normal");
    doc.text(230, 430 + footerIndex + 100 * index, " Customer Service Centre");
  }

  const GenerateTotalWithFooter = (
    doc,
    serviceFeeVal,
    index,
    total,
    totalGST,
    serviceGSTFee,travelType
  ) => {
    doc.text(
      10,
      240 + 100 * index,
      " Total (Inclusive of any applicable Taxes and Charges)"
    );
    doc.text(450, 240 + 100 * index, "$" + total);
    doc.setFont(fontType, "normal");
    doc.text(10, 250 + 100 * index, "*This item includes GST paid to Webjet");
    doc.setLineWidth(1);
    doc.line(10, 260 + 100 * index, 600, 260 + 100 * index);
    doc.setDrawColor(192, 192, 192);
    doc.setFont(fontType, "bold");
    if (
      serviceGSTFee !== "" && serviceFeeVal
        ? doc.text(10, 270 + 100 * index, " Goods and Services Tax (GST)")
        : ""
    );
    doc.setFont(fontType, "normal");
    if (
      serviceGSTFee !== "" && serviceFeeVal
        ? doc.text(10, 280 + 100 * index, " GST paid to Webjet on aboove total")
        : ""
    );
    if (
      serviceGSTFee !== ""  && serviceFeeVal
        ? doc.text(450, 280 + 100 * index, "$" + serviceGSTFee)
        : ""
    );
    doc.setLineWidth(1);
    doc.line(10, 290 + 100 * index, 600, 290 + 100 * index);
    doc.setDrawColor(192, 192, 192);

    let footerIndex = 20;
    if (serviceGSTFee !== "" && serviceFeeVal ? footerIndex : (footerIndex = 0));
    GenerateFooterWithGSTServiceFee(
      doc,
      index,
      total,
      totalGST,
      footerIndex,
    serviceFeeVal,
    serviceGSTFee,travelType
    );
  };

  GenerateHeader(doc);
  let  serviceFeeVal=false;
  let travelType="Domestic";
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
          "(" +
          segment.BookingClass +
          ")" +
          " " +
          segment.Origin.CityCode +
          ">" +
          segment.Destination.CityCode
      );
      j = j + 1;
    });
    if(serviceFee !== "" && e.ServiceFeeIsSelected)
    {
      serviceFeeVal=true;
    }
   travelType=e.TravelType;
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
        e.AddtionalCollection !== "NOADC"
          ? e.AddtionalCollection.replace(/^0+/, "").replace(/[^\d.-]/g, "")
          : 0.0
      ) +
      parseFloat(e.ChangeFeeIsSelected? e.ChangeFeeAmount.replace("@", "."):0);
      total = parseFloat(total) + parseFloat((!serviceFeeVal) ? 0.0 : serviceFee);
      console.log(total);
    totalGST = parseFloat(totalGST) + parseFloat(e.GSTAmount);
  }); 
  

  GenerateTotalWithFooter(doc,serviceFeeVal, index, total, totalGST, serviceGSTFee,travelType);

  doc.save(fileName);
};
export default WebJetInvoicePDF;
