import { Component, xml } from "@odoo/owl";

export class TestHeader extends Component {
  static template = "TestHeader";
  static props = {
    title: { type: String },
    timeRemaining: { type: Number },
    onSubmit: { type: Function },
  };

  formatTime(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
}

TestHeader.template = xml`
<header class="bg-primary text-white py-3 shadow-sm">
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col-3">
        <h4 class="mb-0">
          <i class="bi bi-journal-text me-2"></i>
          <t t-esc="props.title"/>
        </h4>
      </div>
      <div class="col-6 text-center">
        <div class="d-flex justify-content-center align-items-center">
          <i class="bi bi-clock me-2 fs-4"></i>
          <h4 class="mb-0">Time Remaining: <t t-esc="formatTime(props.timeRemaining)"/></h4>
        </div>
      </div>
      <div class="col-3 text-end">
        <button class="btn btn-light" t-on-click="props.onSubmit">
          <i class="bi bi-check-circle me-2"></i>
          Submit Test
        </button>
      </div>
    </div>
  </div>
</header>`;