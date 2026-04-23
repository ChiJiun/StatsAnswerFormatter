// PDF 映射表
const pdfMapping = {
  "Typing Practice": "questions/Typing_Practice.pdf",
  "SOCS_S-M ratio": "questions/SOCS_S-M_ratio.pdf",
  "SOCS_S-M ratio-2": "questions/SOCS_S-M_ratio.pdf",
  "SOCS_Midterm": "questions/SOCS_S-M_ratio.pdf",
  "Four-Step_Simulation_random guessing": "questions/Four-Step_Simulation.pdf",
  "Four-Step_Proportion_App or in-store": "questions/Four-Step_Proportion.pdf",
  "Four-Step_Population Mean": "questions/Four-Step_Population Mean.pdf",
  "Four-Step_Final": "questions/Four-step_Final.pdf", 
  "Four-Step_Proportion Test": "questions/Four-Step_Proportion Test.pdf",
  "FRQ_Confidence Interval for Proportion_CB": "questions/FRQ_Confidence Interval for Proportion_CB.pdf#toolbar=0",
  "FRQ_Ch6_CI for P": "questions/FRQ_Ch6_CI for P.pdf",
  "Four-Step_T Test": "questions/Four-Step_T Test.pdf",
  "Four-Step_Difference in population proportion": "questions/Four-Step_Difference in population proportion.pdf",
  "National Central University": "questions/National Central University.pdf",
  "Four-Step_Midterm_2 Sample F-Test for Equal Population Variances": "questions/Four-Step_Midterm_2 Sample F-Test for Equal Population Variances.pdf"
};

// 把需要隱藏下載鍵並加上遮罩的「題目名稱」寫在這裡
const maskedExams = [
  "FRQ_Confidence Interval for Proportion_CB"
  // 如果未來要新增，就在這裡用逗號隔開加上去
];

//===設定遮罩避免學生下載檔案===

// 根據選單載入 PDF（加入隱形遮罩判斷）
function loadSelectedPDF(selectedExam) {
  const pdfPath = pdfMapping[selectedExam];
  const wrapper = document.getElementById("pdf-wrapper");
  const iframe = document.getElementById("pdf-iframe");
  const statusDiv = document.getElementById("pdf-status");
  const mask = document.getElementById("pdf-mask"); // 取得遮罩元素

  if (pdfPath) {
    wrapper.style.display = "block";
    iframe.style.display = "block"; // 💡 修復：確保 iframe 顯示出來
    iframe.src = pdfPath;
    statusDiv.innerHTML = "載入中...<br>Loading..."; // 使用 innerHTML 和 <br> 讓中英文分兩行
    
    // 檢查選中的題目是否有在 maskedExams 清單裡面
    if (maskedExams.includes(selectedExam)) {
      mask.style.display = "block";  // 開啟遮罩
    } else {
      mask.style.display = "none";   // 關閉遮罩
    }

    // 當 iframe 載入完成時更新狀態
    iframe.onload = () => {
      statusDiv.innerHTML = "載入完成<br>Loaded"; // 同上
    };
  } else {
    wrapper.style.display = "none";
    iframe.style.display = "none"; // 沒有題目時也把 iframe 隱藏
    iframe.src = "";
    mask.style.display = "none";
    statusDiv.innerHTML = "請選擇題目以載入 PDF<br>Please select a question to load PDF"; // 同上
  }
}

// 匯出函數供其他檔案使用
export { loadSelectedPDF };