import { StartJourneyState } from "..";
import { Step } from "../../../../component/Stepper/Step";
import { Stepper } from "../../../../component/Stepper/Stepper";
import { TextArea } from "../../../../component/TextArea/TextArea";
import { Component } from "../../../../local_modules/component/component";
import { html } from "../../../../util/dom-manipulation";

import stepperClasses from "../step.style.module.scss";

export class InputTopic extends Component implements Step<StartJourneyState> {
  private readonly stepper: Stepper<StartJourneyState>;
  private topic: string;

  constructor(
    startFromState: Partial<StartJourneyState>,
    stepper: Stepper<StartJourneyState>
  ) {
    super();
    this.topic = startFromState.topic ?? "";
    this.stepper = stepper;
  }

  getState(): Partial<StartJourneyState> {
    return {
      topic: this.topic,
    };
  }

  render(): Node {
    const textField = new TextArea().node;
    textField.oninput = () => {
      this.topic = textField.innerHTML;
    };
    textField.onsubmit = () => {
      this.stepper.nextStepAction(1)?.();
    };

    return html`
    <div>
      <div class="${stepperClasses.stepHeader}">
        <h2>Поясніть у кількох словах тему роботи / тему питань, що ви бажали б використати<h2>
      </div>
      ${textField}
    </div>
    `;
  }
}
