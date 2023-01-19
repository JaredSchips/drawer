const imageSize = { width: 500, height: 500 };
var imageBounds = {
  x: 0,
  y: 0,
  width: imageSize.width,
  height: imageSize.height,
};

var lc = LC.init(document.getElementById("lc"), {
  imageURLPrefix: "/assets/lc-images",
  imageSize: imageSize,
  toolbarPosition: "bottom",
  defaultStrokeWidth: 2,
  strokeWidths: [1, 2, 3, 5, 30],
});

$("[data-action=save]").click(async (e) => {
  e.preventDefault();
  const response = await fetch("/api/images/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      snapshot: lc.getSnapshot(),
      isPublic: true,
      userId: 1,
    }),
  });
});