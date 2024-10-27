import { Component } from "../../local_modules/component/component";
import { Stepper } from "./Stepper";

export interface StepConstuctor<T extends Record<string, any>> {
    new(startFromState: Partial<T>, stepper: Stepper<T>): Step<T>
}
export interface Step<T extends Record<string, any>> extends Component {
    getState(): Partial<T>;
}