
import jsPDF from 'jspdf';
import image from './assests/WJ_AU.png';

export const WebJetInvoicePDF = (invoiceData,fileName) => {   
    var doc = new jsPDF('p', 'pt');
    doc.setFont('verdana', 'bold');
    doc.setFontSize(18.5);
    //doc.text(10, 20, 'Tax Invoice');
    // x,y
    doc.text( 10, 20,'Tax Invoice');  
    

    doc.setFont('verdana', 'bold');
    doc.setFontSize(9.5);
    GenerateHeader(doc);        
    let index=0;
     invoiceData[0].ticketDetails.forEach((paxdata) => {
       
         GeneratePassengerFee(doc, paxdata,index);         
         index++;
         
     });
   
      GenerateTotalWithFooter(doc,1);

   
     doc.save(fileName);

    }
    

const GenerateHeader = (doc) => {
    var img = new Image()
    img.src = image;
    doc.addImage(img, 'png',350, 8)
    doc.setTextColor('red');
    doc.text(10, 40, 'Webjet Reference:');
    doc.text(110, 40, '1223444444');
    doc.setTextColor('black');
    doc.text(10, 60, 'Request Date:');
    doc.text(110, 60, '03/11/2022');
    doc.text(8, 80, ' Invoiced By:');
    doc.text(110, 80, ' Webjet Marketing Pty Ltd');
    doc.setFont('verdana', 'bold');
    doc.setFontSize(11.5);
    doc.text(460, 80, 'ABN: 84 063 430 848');
    doc.setFont('verdana', 'normal');
    doc.setFontSize(9.5);
    doc.setFillColor(255, 0, 0);
    doc.rect(10, 90, 600, 20, 'F');
    doc.setTextColor('white');

    doc.text(8, 100, ' Payment Details');
    doc.setFillColor(192, 192, 192);
    doc.rect(10, 110, 600, 20, 'F');
    doc.setTextColor('white');
    doc.text(10, 120, 'Price Breakdown');
}


const GeneratePassengerFee=(doc, paxdata, index)=> {
    doc.setTextColor('black');
    doc.setFont('Arial', 'bold');
    doc.text('Passenger:' + paxdata.paxname ,10, 140 + (100 * index));
    doc.setFont('Arial', 'normal');
    doc.text(10, 160+ (100 * index), paxdata.flight);
    doc.setFont('Arial', 'bold');
    doc.text(10, 180+ (100 * index), 'Additional AirFare and Tax (Difference in Fare and Taxes)');
    doc.text(450, 180+ (100 * index), '$206.01^');
    doc.text(8, 200+ (100 * index) ,' Airline Change Fee (Airline imposed fee)');
    doc.text(450, 200+ (100 * index), '$80.01^');
    doc.setLineWidth(1);
    doc.line(10, 210+ (100 * index), 600, 210+ (100 * index));
   // doc.setDrawColor('white');
}

const GenerateTotalWithFooter=(doc,index)=> {   
    doc.text(10, 240+ (100 * index), ' Total (Inclusive of any applicable Taxes and Charges)');
    doc.text(450, 240+ (100 * index), "$$286.01");
    doc.setFont('Arial', 'normal');
    doc.text(10, 250+ (100 * index), '*This item includes GST paid to Webjet');
    doc.setLineWidth(1);
    doc.line(10, 260+ (100 * index), 600, 260+ (100 * index));
    doc.setDrawColor(192, 192, 192);
    doc.text(10, 270+ (100 * index), 'Total amount excluding GST (If Applicable)');
    doc.text(450, 270+ (100 * index), '$286.01');
    doc.setFillColor(192, 192, 192);
    doc.rect(10, 280+ (100 * index), 600, 20, 'F');
    doc.setTextColor('white');
    doc.text(10, 290+ (100 * index), 'Total Payment');
    doc.setTextColor('black');
    doc.text(450, 310+ (100 * index), '$286.01');
    doc.setFont('Arial', 'bold');
    doc.text(8, 310+ (100 * index), ' All Prices are in Australian Dollars');
    doc.setLineWidth(1);
    doc.line(10, 320, 600, 320);
    doc.setDrawColor(192, 192, 192);
    doc.setFont('Arial', 'normal');
    doc.text(8, 340+ (100 * index), '  ^GST Paid to Airline on above total');
    doc.text(450, 350, '$26.00');
    doc.setFont('Arial', 'bold');
    doc.text(10, 350+ (100 * index), 'Note: If the GST applies on your ticket, then its paid directly to the Airline.');
    doc.setFont('Arial', 'bold');
    doc.setFontSize(11);
    doc.text(150, 400+ (100 * index), ' Thank you for your booking. We hope you enjoy your travels.');
    doc.setFont('Arial', 'normal');
    doc.text(230, 430+ (100 * index), ' Customer Service Centre');
}
export default WebJetInvoicePDF;




