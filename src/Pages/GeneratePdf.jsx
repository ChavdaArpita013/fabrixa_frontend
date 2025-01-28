import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const GeneratePdf = () => {
    const pdfName = Cookies.get('techPackName');
    const dropZone = document.querySelector('.relative'); // Select drop zone
    html2canvas(dropZone).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 200); // Adjust size as needed
        pdf.save(`${pdfName}.pdf`);
    });
};

export { GeneratePdf }