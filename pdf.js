// PDF 映射表
const pdfMapping = {
  "Typing Practice": "questions/Typing_Practice.pdf",
  "SOCS_S-M ratio": "questions/SOCS_S-M_ratio.pdf",
  "SOCS_S-M ratio-2": "questions/SOCS_S-M_ratio.pdf",
  SOCS_Midterm: "questions/SOCS_S-M_ratio.pdf",
  "Four-Step_Simulation of random guessing":
    "questions/Four-Step_Simulation.pdf",
  "Four-Step_Proportion_App or in-store": "questions/Four-Step_Proportion.pdf",
  "Four-Step_Population Mean": "questions/Four-Step_Population_Mean.pdf",
  "Four-Step_Z-Interval": "questions/Four-Step_Z-Interval.pdf",  
};

// 根據選單載入 PDF（使用 iframe）
function loadSelectedPDF(selectedExam) {
  const pdfPath = pdfMapping[selectedExam];
  const iframe = document.getElementById("pdf-iframe");
  const statusDiv = document.getElementById("pdf-status");

  if (pdfPath) {
    iframe.src = pdfPath;
    iframe.style.display = "block";
    statusDiv.innerHTML = "載入中...<br>Loading..."; // 使用 innerHTML 和 <br> 讓中英文分兩行
    // 當 iframe 載入完成時更新狀態
    iframe.onload = () => {
      statusDiv.innerHTML = "載入完成<br>Loaded"; // 同上
    };
  } else {
    iframe.style.display = "none";
    statusDiv.innerHTML =
      "請選擇題目以載入 PDF<br>Please select a question to load PDF"; // 同上
  }
}

// 匯出函數供其他檔案使用
export { loadSelectedPDF };
