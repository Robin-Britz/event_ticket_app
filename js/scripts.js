// Function to remove specific emojis
function removeSelectedEmojis(str) {
  return str.replace(/[📍📅⏰🎟️]/g, '');
}

function generatePDF(event) {
  const button = event.target;
  const eventDiv = button.closest('.FeaturedEvent');

  const quantityInput = eventDiv.querySelector('.BuyQty');
  const quantity = parseInt(quantityInput.value);
  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let yPos = 20;

  // Add the title
  doc.setFontSize(14);
  doc.text('TICKET HUB', 105, yPos, { align: 'center' });
  yPos += 8;

  // Add subtitle
  doc.setFontSize(10);
  doc.text('OFFICIAL EVENT TICKET', 105, yPos, { align: 'center' });
  yPos += 15;

  // Get event title
  const eventTitle = eventDiv.querySelector('h3').textContent;
  doc.setFontSize(16);
  doc.text(eventTitle, 105, yPos, { align: 'center' });
  yPos += 10;

  // Quantity
  yPos += 5;
  const quantityText = removeSelectedEmojis('Quantity: ' + quantity);
  doc.text(quantityText, 91, yPos);
  yPos += 10;

  // Generate Ticket ID
  const ticketId = 'TKT-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  // QR code data with Ticket ID only
  const qrData = 'Ticket ID: ' + ticketId;

  QRCode.toDataURL(qrData, { width: 150 }).then(function(qrUrl) {
    const qrSize = 40;
    const qrX = (210 - qrSize) / 2;
    doc.addImage(qrUrl, 'PNG', qrX, yPos, qrSize, qrSize);
    yPos += qrSize + 10;

    // Ticket ID below QR
    const ticketIdText = removeSelectedEmojis('Ticket ID: ' + ticketId);
    doc.text(ticketIdText, 75, yPos);

    // Save PDF
    const filename = 'Ticket_' + removeSelectedEmojis(eventTitle).substring(0, 10).replace(/[^a-zA-Z0-9]/g, '_') + '.pdf';
    doc.save(filename);
  }).catch(function(err) {
    alert('Error creating QR code');
    console.log(err);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.BuyButton').forEach(function(btn) {
    btn.addEventListener('click', generatePDF);
  });
});