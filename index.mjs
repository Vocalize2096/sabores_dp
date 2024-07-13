const { pdfjsLib } = globalThis;
const pdfUrl = "https://vocalize2096.github.io/sabores_dp/menu.pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.mjs";

const getScaleFactor = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 480) {
    return 0.6;
  } else if (windowWidth <= 768) {
    return 0.8;
  } else {
    return 1.5;
  }
};

const appendPage = (canvas) => {
  const pageContainer = document.createElement("div");
  const pdfViewer = document.getElementById("pdfViewer");

  pageContainer.classList.add("pdf-page");
  pageContainer.appendChild(canvas);
  pdfViewer.appendChild(pageContainer);
};

const renderPage = (page) => {
  const scale = getScaleFactor();
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  page.render({ canvasContext, viewport }).promise.then(appendPage(canvas));
};

const readPages = (pdf) => {
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    pdf.getPage(pageNumber).then(renderPage);
  }
};

const handleError = (error) => {
  console.error(error);
};
pdfjsLib.getDocument(pdfUrl).promise.then(readPages, handleError);
