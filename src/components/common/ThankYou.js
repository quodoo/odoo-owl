import { Component, xml } from "@odoo/owl";

export class ThankYou extends Component {
  static template = "ThankYou";
  static props = {
    testResults: { type: Object, optional: true }
  };
}

ThankYou.template = xml`
<div class="thank-you-screen d-flex align-items-center justify-content-center min-vh-100 bg-light">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <div class="card shadow-lg">
          <div class="card-body p-5">
            <div class="mb-4">
              <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            </div>
            <h2 class="card-title mb-4">Test Submitted Successfully!</h2>
            <p class="card-text lead mb-4">
              Thank you for completing the IELTS practice test. Your responses have been recorded.
            </p>
            <div class="test-summary mb-4">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="p-3 border rounded bg-light">
                    <h5>Time Spent</h5>
                    <p class="mb-0 lead"><t t-esc="props.testResults?.timeSpent || '60'"/> minutes</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="p-3 border rounded bg-light">
                    <h5>Questions Answered</h5>
                    <p class="mb-0 lead"><t t-esc="props.testResults?.answeredQuestions || '40'"/> / 40</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <p class="text-muted mb-4">
                Your results will be processed and available shortly.
              </p>
              <a href="/" class="btn btn-primary btn-lg px-5">
                <i class="bi bi-house-door me-2"></i>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;