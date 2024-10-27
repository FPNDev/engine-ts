import { Component } from "../../local_modules/component/component";
import { html, text } from "../../util/dom-manipulation";

export class TextArea extends Component<HTMLDivElement> {
  private initialValue = "";
  constructor(value = "") {
    super();
    this.initialValue = value;
  }

  render(): HTMLDivElement {
    const textField = html`<div class="textfield">
      <div contenteditable>${this.initialValue}</div>
    </div>` as HTMLDivElement;
    
    textField.addEventListener("keydown", (ev) => {
      if (ev.code === "Enter" && ev.shiftKey) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        textField.dispatchEvent(new CustomEvent("submit"));
      }
    });

    return textField;
  }
}
