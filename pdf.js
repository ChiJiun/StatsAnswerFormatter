// PDF 映射表
const pdfMapping = {
  "Typing Practice": "questions/Typing_Practice.pdf",
  "SOCS_S-M ratio": "questions/SOCS_S-M_ratio.pdf",
  "SOCS_S-M ratio-2": "questions/SOCS_S-M_ratio.pdf",
  SOCS_Midterm: "questions/SOCS_S-M_ratio.pdf",
  "Four-Step_Simulation of random guessing":
    "questions/Four-Step_Simulation.pdf",
};

// PDF 載入和渲染函數（支援多頁滑動）
async function loadPDF(pdfPath) {
  const statusDiv = document.getElementById("pdf-status");
  const pdfViewer = document.querySelector(".pdf-viewer");

  statusDiv.innerHTML = "載入中...<br>Loading...";

  try {
    // 載入 PDF 文檔
    const pdf = await pdfjsLib.getDocument(pdfPath).promise;
    const numPages = pdf.numPages;

    // 清空之前的內容
    const existingCanvases = pdfViewer.querySelectorAll("canvas");
    existingCanvases.forEach((canvas) => canvas.remove());

    // 設定縮放比例
    const scale = 1.5;

    // 渲染每一頁
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      // 建立新的 canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.style.display = "block"; // 確保垂直堆疊
      canvas.style.marginBottom = "10px"; // 頁面間距

      // 渲染頁面到 canvas
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // 添加到 pdf-viewer
      pdfViewer.appendChild(canvas);
    }

    statusDiv.innerHTML = `載入完成，共 ${numPages} 頁<br>Loaded, ${numPages} pages`;
  } catch (error) {
    console.error("PDF 載入失敗:", error);
    statusDiv.innerHTML =
      "載入失敗: PDF 文件不存在或無法載入<br>Load failed: PDF not found or unable to load";
  }
}

// 根據選單載入 PDF
function loadSelectedPDF(selectedExam) {
  const pdfPath = pdfMapping[selectedExam];
  const pdfViewer = document.querySelector(".pdf-viewer");

  if (pdfPath) {
    loadPDF(pdfPath);
  } else {
    // 清空之前的 PDF 內容
    const existingCanvases = pdfViewer.querySelectorAll("canvas");
    existingCanvases.forEach((canvas) => canvas.remove());

    document.getElementById("pdf-status").innerHTML =
      "請選擇題目以載入 PDF<br>Please select a question to load PDF";
  }
}

// 匯出函數供其他檔案使用
export { loadSelectedPDF };
