# Chrome-Extension
Hack-a-thon Chrome Extension


create interface for our extension, there should be a popup - when we click our extension- have a button to change grab highlighted text


add button to complete selection and turn into highlight


when we highlight text, change it to the color that was selected

download text file of all highlighted text
HTMLElement.innerText?
********************************************************
How we started -

Spent many hours looking up range methods to figure out how to grab position of selected text

Tried event handlers



Used a template element which serves as a wrapper for selected text on a webpage, this allows us to render the selected text into highlighted text during runtime and to display a button to mark the selection

window.customElements.define("yellow-highlighter", Highlighter);
We created an element for the yellow highlighter, and linked it together using customElements to our class Highligter

Extending HTMLElement ensures the custom element inherits the entire DOM API and means any properties/methods that you add to the class become part of the element's DOM interface.

-Get marker position
We create a function that stores the range inside the window, and using native window methods like getSelection, getRange and getBounding, then we return the range
