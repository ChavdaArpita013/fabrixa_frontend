import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePdf = async (pages) => {
    console.log("Pages from pdf:", pages);

    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1050, 890],
    });

    for (let i = 0; i < pages.length; i++) {
        const pageElement = document.querySelector(`[data-page-id='${pages[i].id}']`);
        if (pageElement) {
            const canvas = await html2canvas(pageElement, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            pdf.addImage(imgData, "PNG", 0, 0, 1150, 890);
            if (i < pages.length - 1) pdf.addPage();
        }
    }

    pdf.save("TechPack.pdf");
};

export { generatePdf };
