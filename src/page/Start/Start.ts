import { Stepper } from "../../component/Stepper/Stepper";
import { Component } from "../../local_modules/component/component";
import { html, stripHTML } from "../../util/dom-manipulation";
import { InputTopic } from "./steps/InputTopic/InputTopic";
import { InputWork } from "./steps/InputWork/InputWork";

import classes from "./style.module.scss";

export class Start extends Component {
  render() {
    const stepper = new Stepper([InputWork, InputTopic], (state) => {
      const text = stripHTML(state.text).trim();
      const topic = stripHTML(state.topic).trim();
      console.log(text);
      alert(text);
      alert(topic);
    });

    return html`<div class="${classes.startPage}">${stepper.node}</div>`;
  }
}
