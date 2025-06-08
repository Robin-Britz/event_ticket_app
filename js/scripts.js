function generatePDF() {
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the entire div and its text content (excluding input values)
    const eventDiv = document.getElementById("eventone");
    const eventText = eventDiv.textContent.trim();

    // Get the ticket quantity separately (from the input)
    const ticketQty = eventDiv.querySelector(".BuyQty").value;

    // PDF Styling
    doc.setFontSize(18);
    doc.text("Event Ticket Receipt", 105, 20, { align: 'center' }); // Centered title

    // Add event text (auto-wrap long lines)
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(eventText, 180); // Wrap to page width
    doc.text(splitText, 20, 40);

    // Add ticket quantity (below the event text)
    doc.text(`Tickets Purchased: ${ticketQty}`, 20, doc.autoTable.previous.finalY + 15);

    // Save PDF
    doc.save("Event_Ticket.pdf");
}