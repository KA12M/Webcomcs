import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

const BtnExportPDF = ({ fileName, pdf, children }: any) => {
  return (
    <PDFDownloadLink document={pdf} fileName={fileName}>
      {children}
    </PDFDownloadLink>
  );
};

export default BtnExportPDF;
