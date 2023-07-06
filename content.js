const highlighter = document.createElement("yellow-highlighter");
document.body.appendChild(highlighter);

const setMarkerPosition = (markerPosition) =>
  highlighter.setAttribute(
    "markerPosition",
    JSON.stringify(markerPosition)
  );

const getSelectedText = () => window.getSelection().toString();

document.addEventListener("click", () => {
  if (getSelectedText().length > 0) {
    setMarkerPosition(getMarkerPosition());
  }
});

document.addEventListener("selectionchange", () => {
  if (getSelectedText().length === 0) {
    setMarkerPosition({ display: "none" });
  }
});

function getMarkerPosition() {
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();
    console.log(rangeBounds);
  return {
    left: rangeBounds.left + rangeBounds.width,
    top: rangeBounds.top - 15,
    display: "flex",
  };
}