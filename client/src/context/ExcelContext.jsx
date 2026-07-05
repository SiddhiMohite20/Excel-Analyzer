import { createContext, useState } from "react";

export const ExcelContext = createContext();

function ExcelProvider({ children }) {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");

  const analytics = {
    totalRows: excelData.length,
    totalColumns: excelData.length
      ? Object.keys(excelData[0]).length
      : 0,
    totalSheets: excelData.length ? 1 : 0,
  };

  return (
    <ExcelContext.Provider
      value={{
        excelData,
        setExcelData,
        fileName,
        setFileName,
        analytics,
      }}
    >
      {children}
    </ExcelContext.Provider>
  );
}

export default ExcelProvider;