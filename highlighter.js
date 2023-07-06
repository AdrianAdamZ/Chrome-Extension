const textArray = [];

const template = `
  <template id="highlightTemplate">
    <span class="highlight" style="background-color: yellow; display: inline; color: black"></span>
  </template>

  <button id="highlightID">
    <img class="text-marker" src="https://icons.iconarchive.com/icons/hopstarter/soft-scraps/128/Highlighter-Yellow-icon.png"></img>
  </button>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #highlightID {
    display: ${display};
    align-items: center;
    justify-content: center;
    background-color: none;
    background: none;
    border: none;
    cursor: pointer;
    position: fixed;
    left: ${left}px;
    top: ${top}px;
    z-index: 1;
  }
  .text-marker {
    background: none;
    transform: rotate(50deg);
    height: 49px;
    width: 49px;
    
  }
`;

class Highlighter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
  }

  get styleElement() {
    console.log('this.shadowRoot.querySelector("style"): ', this.shadowRoot.querySelector("style"));

    return this.shadowRoot.querySelector("style");
  }

  get highlightTemplate() {
    console.log('this.shadowRoot.getElementById("highlightTemplate"): ', this.shadowRoot.getElementById("highlightTemplate"));
    
    return this.shadowRoot.getElementById("highlightTemplate");
  }

  static get observedAttributes() {
    return ["markerPosition"];
  }

  render() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);
    this.shadowRoot.innerHTML += template;
    this.shadowRoot
      .getElementById("highlightID")
      .addEventListener("click", () => this.highlightSelection());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = styled(this.markerPosition);
    }
  }

  highlightSelection() {
    const userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      const selectedText = userSelection.getRangeAt(i).toString();
      this.highlightRange(userSelection.getRangeAt(i));
      if (selectedText.trim().length > 0) {
        textArray.push(selectedText);
      }
    }
    window.getSelection().empty();
  }

  highlightRange(range) {
    const clone = this.highlightTemplate.cloneNode(true).content.firstElementChild;
    clone.appendChild(range.extractContents());
    range.insertNode(clone);
  }
}

window.customElements.define("yellow-highlighter", Highlighter);
