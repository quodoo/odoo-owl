import { Component, useState, xml } from "@odoo/owl";
import { TestHeader } from "../common/TestHeader";
import { TestFooter } from "../common/TestFooter";

export class WritingTest extends Component {
  static template = "WritingTest";
  static components = { TestHeader, TestFooter };

  setup() {
    this.state = useState({
      currentTaskIndex: 0,
      timer: 60, // 60 minutes for the test
      essays: ["", "", ""],
      tasks: [
        {
          title: "IELTS Writing Task 1",
          type: "graph-description",
          prompt: `The graph below shows the average monthly temperatures in London over a one-year period.
                  Summarize the information by selecting and reporting the main features.`,
          requirements: "Write at least 150 words",
          timeAllocation: 20 // minutes
        },
        {
          title: "IELTS Writing Task 2",
          type: "essay",
          prompt: `Some people believe that universities should focus on providing academic skills. 
                  Others think universities should prepare students for their future careers. 
                  Discuss both views and give your opinion.`,
          requirements: "Write at least 250 words",
          timeAllocation: 40 // minutes
        },
        {
          title: "IELTS Writing Task 3",
          type: "essay",
          prompt: `Some people believe that universities should focus on providing academic skills. 
                  Others think universities should prepare students for their future careers. 
                  Discuss both views and give your opinion.`,
          requirements: "Write at least 250 words",
          timeAllocation: 40 // minutes
        }
      ]
    });
    this.startTimer();
  }

  startTimer() {
    const timer = setInterval(() => {
      if (this.state.timer > 0) {
        this.state.timer--;
      } else {
        clearInterval(timer);
        this.handleTimeUp();
      }
    }, 60000); // Update every minute
  }

  handleTimeUp() {
    this.handleSubmit();
  }

  handleSubmit() {
    const testData = {
      essays: this.state.essays,
      wordCounts: this.state.tasks.map((_, index) => this.getWordCount(index)),
      timeSpent: 60 - this.state.timer,
      submittedAt: new Date().toISOString()
    };
    console.log("Test submitted:", testData);
    // TODO: Implement submission to backend
  }

  updateEssay(ev) {
    this.state.essays[this.state.currentTaskIndex] = ev.target.value;
  }

  getWordCount(index = null) {
    const essayIndex = index !== null ? index : this.state.currentTaskIndex;
    const essay = this.state.essays[essayIndex];
    return essay.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  switchTask(index) {
    if (index >= 0 && index < this.state.tasks.length) {
      this.state.currentTaskIndex = index;
    }
  }

  getCurrentTask() {
    return this.state.tasks[this.state.currentTaskIndex];
  }

  getProgress() {
    return this.state.tasks.map((task, index) => {
      const wordCount = this.getWordCount(index);
      const required = index === 0 ? 150 : 250;
      return `${wordCount}/${required} words`;
    });
  }

  isTaskComplete(index) {
    const minWords = index === 0 ? 150 : 250;
    return this.getWordCount(index) >= minWords;
  }
}

WritingTest.template = xml`
<div class="d-flex flex-column vh-100">
  <TestHeader 
    title="'IELTS Writing'"
    timeRemaining="state.timer"
    onSubmit="() => this.handleSubmit()"/>
  
  <main class="flex-grow-1 bg-light py-4">
    <div class="container-fluid">
      <div class="row g-4">
        <!-- Instructions Panel -->
        <div class="col-md-5">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 class="card-title mb-0" t-esc="getCurrentTask().title"/>
              <span class="badge bg-light text-primary">
                <t t-esc="getCurrentTask().timeAllocation"/> minutes
              </span>
            </div>
            <div class="card-body">
              <div class="alert alert-info mb-4">
                <h5 class="alert-heading">Instructions</h5>
                <p class="mb-0" t-esc="getCurrentTask().prompt"/>
              </div>
              <div class="alert alert-warning">
                <h5 class="alert-heading">Requirements</h5>
                <p class="mb-0" t-esc="getCurrentTask().requirements"/>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Writing Panel -->
        <div class="col-md-7">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 class="card-title mb-0">Your Response</h4>
              <div>
                <span class="badge" t-attf-class="bg-{{ getWordCount() >= (state.currentTaskIndex === 0 ? 150 : 250) ? 'success' : 'light' }} me-2">
                  Words: <t t-esc="getWordCount()"/>
                </span>
                <span class="badge bg-info">
                  Task <t t-esc="state.currentTaskIndex + 1"/> of <t t-esc="state.tasks.length"/>
                </span>
              </div>
            </div>
            <div class="card-body p-0">
              <textarea 
                class="form-control border-0 h-100"
                style="min-height: calc(100vh - 300px); resize: none; padding: 1rem;"
                t-on-input="updateEssay"
                t-att-value="state.essays[state.currentTaskIndex]"
                placeholder="Start writing your essay here..."/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <TestFooter 
    sections="state.tasks"
    currentIndex="state.currentTaskIndex"
    onSectionSwitch="(index) => this.switchTask(index)"
    type="'writing'"
    progress="getProgress()"/>
</div>`;