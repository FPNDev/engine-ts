import { Component } from "../../local_modules/component/component";
import { appendChildren, html } from "../../util/dom-manipulation";
import { Step, StepConstuctor } from "./Step";

import classes from "./style.module.scss";

type AfterFn<T> = (state: T) => void;

export class Stepper<T extends Record<string, any>> extends Component {
  private steps: StepConstuctor<T>[];
  private currentStep = 0;
  private currentState: T = Object.create(null);
  private stepComponent?: Step<T>;
  private buttonsContainer!: HTMLDivElement;
  private afterFn?: AfterFn<T>;

  constructor(steps: StepConstuctor<T>[], afterFn?: AfterFn<T>) {
    super();
    this.steps = steps;
    this.afterFn = afterFn;

    this.nextStepAction = this.nextStepAction.bind(this);
  }


  render(): Node {
    return html`
      <div class=${classes.stepper}>
        ${this.renderStep()} ${this.renderButtons()}
      </div>
    `;
  }

  nextStepAction(direction: number) {
    const target = this.currentStep + direction;
    if (target < 0 || (target > this.steps.length - 1 && !this.afterFn)) {
      return;
    }

    return () => {
      Object.assign(this.currentState, this.stepComponent!.getState());

      if (target < this.steps.length) {
        this.currentStep = target;
        this.renderStep();
        this.renderButtons();
      } else {
        this.afterFn!(this.currentState);
      }
    };
  }

  private renderButtons() {
    const buttonsContainer = (this.buttonsContainer ||= html`
      <div class="${classes.buttons}"></div>
    ` as HTMLDivElement);

    buttonsContainer.innerHTML = "";
    appendChildren(buttonsContainer, [
      this.renderButton("Назад", classes.prev, -1),
      this.renderButton("Далі", classes.next, 1),
    ]);

    return buttonsContainer;
  }

  private renderButton(text: string, className: string, direction: number) {
    const action = this.nextStepAction(direction);
    if (!action) {
      return null;
    }

    const btn = html`
      <button class="${classes.button} ${className}">${text}</button>
    ` as HTMLButtonElement;

    btn.onclick = action;

    return btn;
  }

  private renderStep() {
    const nextComponent = new this.steps[this.currentStep](this.currentState, this);

    if (this.stepComponent) {
      this.disconnect([this.stepComponent]);
      this.stepComponent.node.parentNode!.replaceChild(
        nextComponent.node,
        this.stepComponent.node
      );

      this.stepComponent.destroy();
    }

    this.stepComponent = nextComponent;
    this.connect([nextComponent]);

    return nextComponent.node;
  }
}
