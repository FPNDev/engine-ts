import { StartJourneyState } from "..";
import { Step } from "../../../../component/Stepper/Step";
import { Stepper } from "../../../../component/Stepper/Stepper";
import { TextArea } from "../../../../component/TextArea/TextArea";
import { Component } from "../../../../local_modules/component/component";
import { html } from "../../../../util/dom-manipulation";

import stepperClasses from "../step.style.module.scss";

export class InputWork extends Component implements Step<StartJourneyState> {
  private readonly stepper: Stepper<StartJourneyState>;
  text!: string;

  constructor(
    startFromState: Partial<StartJourneyState>,
    stepper: Stepper<StartJourneyState>
  ) {
    super();
    this.text = startFromState.text ?? "";
    this.stepper = stepper;
  }

  getState(): Partial<StartJourneyState> {
    return {
      text: this.text,
    };
  }

  render(): Node {
    const textField = new TextArea().node;
    textField.oninput = () => {
      this.text = textField.innerHTML;
    };
    textField.addEventListener('submit', () => {
      this.stepper.nextStepAction(1)?.();
    });

    return html`
    <div>
      <div class="${stepperClasses.stepHeader}">
        <h1>Вітаю!</h1>
        <h2>Для початку роботи задайте текст<h2>
      </div>
      ${textField}
    </div>
    `;
  }
}
