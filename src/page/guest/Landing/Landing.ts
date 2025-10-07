import { Component } from "../../../local_modules/component/component";
import { html } from "../../../local_modules/util/dom-manipulation";

import classes from './style.module.scss';

export class Landing extends Component {
  view(): Node {
    return html`
      <div class="${classes.landingTitle}">Welcome</div>
    `;
  }
}