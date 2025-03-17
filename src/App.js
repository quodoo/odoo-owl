import { Component, useState, xml } from "@odoo/owl";
import { ReadingTest } from "./components/ReadingTest/ReadingTest";
import { WritingTest } from "./components/WritingTest/WritingTest";
import { WelcomeScreen } from "./components/WelcomeScreen/WelcomeScreen";
import { ConfirmationModal } from "./components/common/ConfirmationModal";
import { ThankYou } from "./components/common/ThankYou";

export class App extends Component {
  static template = "App";
  static components = { 
    ReadingTest, 
    WritingTest, 
    WelcomeScreen, 
    ConfirmationModal,
    ThankYou
  };

  setup() {
    this.state = useState({
      currentTest: "welcome",
      testStarted: false,
      showConfirmation: false,
      testResults: null
    });
  }

  startTest() {
    this.state.currentTest = "reading";
    this.state.testStarted = true;
  }

  switchTest(test) {
    this.state.currentTest = test;
  }

  handleSubmitRequest() {
    this.state.showConfirmation = true;
  }

  handleSubmitConfirm() {
    // Handle test submission
    const testResults = {
        timeSpent: 60 - this.state.timer, // Assuming timer is tracked in state
        answeredQuestions: 35, // This should be calculated from actual answers
        submittedAt: new Date().toISOString()
      };
      
      this.state.testResults = testResults;
      this.state.showConfirmation = false;
      this.state.currentTest = "thankyou";
  }

  handleSubmitCancel() {
    this.state.showConfirmation = false;
  }
}

App.template = xml`
<div class="app-container">
  <t t-if="state.currentTest === 'welcome'">
    <WelcomeScreen onStart="() => this.startTest()"/>
  </t>
  <t t-elif="state.currentTest === 'thankyou'">
    <ThankYou testResults="state.testResults"/>
  </t>
  <t t-else="">
    <div class="container-fluid py-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
          <div class="navbar-nav flex-grow-1">
            <div class="d-flex align-items-center">
              <button class="btn btn-primary me-2" 
                      t-att-class="state.currentTest === 'reading' ? 'active' : ''"
                      t-on-click="() => this.switchTest('reading')">
                Reading Test
              </button>
              <button class="btn btn-primary" 
                      t-att-class="state.currentTest === 'writing' ? 'active' : ''"
                      t-on-click="() => this.switchTest('writing')">
                Writing Test
              </button>
            </div>
            <button class="btn btn-danger ms-auto" 
                    t-on-click="() => this.handleSubmitRequest()">
              Submit Test
            </button>
          </div>
        </div>
      </nav>
      <main class="container">
        <ReadingTest t-if="state.currentTest === 'reading'" 
                    testStarted="state.testStarted"/>
        <WritingTest t-if="state.currentTest === 'writing'" 
                    testStarted="state.testStarted"/>
      </main>
    </div>
  </t>

  <ConfirmationModal 
    isOpen="state.showConfirmation"
    title="'Submit Test Confirmation'"
    message="'Are you sure you want to submit your test? This action cannot be undone.'"
    onConfirm="() => this.handleSubmitConfirm()"
    onCancel="() => this.handleSubmitCancel()"/>
</div>`;