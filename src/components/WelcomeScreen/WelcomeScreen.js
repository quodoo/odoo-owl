import { Component, xml } from "@odoo/owl";

export class WelcomeScreen extends Component {
  static template = "WelcomeScreen";
  static props = {
    onStart: { type: Function }
  };
}

WelcomeScreen.template = xml`
<div class="welcome-screen d-flex align-items-center justify-content-center min-vh-100 bg-light">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg">
          <div class="card-header bg-primary text-white">
            <h2 class="mb-0">IELTS Reading Test</h2>
          </div>
          <div class="card-body">
            <div class="test-info mb-4">
              <h4>Test Information</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Time Duration
                  <span class="badge bg-primary rounded-pill">60 minutes</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Number of Passages
                  <span class="badge bg-primary rounded-pill">3</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Questions
                  <span class="badge bg-primary rounded-pill">40</span>
                </li>
              </ul>
            </div>

            <div class="instructions mb-4">
              <h4>Instructions</h4>
              <div class="alert alert-info">
                <ul class="mb-0">
                  <li>You have 60 minutes to complete all three passages</li>
                  <li>Each passage contains 13-14 questions</li>
                  <li>You can navigate between passages using the navigation bar</li>
                  <li>Your answers are automatically saved</li>
                  <li>The test will automatically submit when time expires</li>
                </ul>
              </div>
            </div>

            <div class="text-center">
              <button class="btn btn-lg btn-primary px-5" t-on-click="props.onStart">
                <i class="bi bi-play-circle me-2"></i>
                Start the Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;