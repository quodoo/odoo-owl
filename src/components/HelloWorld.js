import { Component, useState, xml } from "@odoo/owl";

export class HelloWorld extends Component {
  static template = "HelloWorld"

  // Define the props
  static props = {
    incrementBy: { type: Number, optional: true, default: 1 }
  };

  setup() {
    this.state = useState({ count: 0 });
  }

  increment() {
    this.state.count += this.props.incrementBy;
  }
}

// OWL template syntax
HelloWorld.template = xml`
    <div class="hello-world">
    <h1>Hello OWL &amp; Vite!</h1>
    <button t-on-click="increment">
        Count is: <t t-esc="state.count"/>
        (Increment by: <t t-esc="props.incrementBy"/>)
    </button>
    </div>
    `;
