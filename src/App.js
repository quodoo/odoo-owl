import { Component, xml } from "@odoo/owl";
import { HelloWorld } from "./components/HelloWorld";
import "./style.scss";

export class App extends Component {
  static template = "App";
  static components = { HelloWorld };
}

App.template = xml`
<div class="app-container">
  <HelloWorld incrementBy="2"/>
</div>
`;
