import { Component, useState, xml } from "@odoo/owl";
import { TestHeader } from "../common/TestHeader";
import { TestFooter } from "../common/TestFooter";

export class ReadingTest extends Component {
  static template = "ReadingTest";
  static components = { TestHeader, TestFooter };

  setup() {
    this.state = useState({
      currentPassageIndex: 0,
      timer: 60, // 60 minutes for the test
      selectedAnswers: {},
      passages: [
        {
          title: "Reading Passage 1",
          type: "social",
          content: "Your reading passage content here...",
          questions: [
            {
              id: 1,
              text: "What is the main idea of the passage?",
              options: [
                { id: 'A', text: 'Option A' },
                { id: 'B', text: 'Option B' },
                { id: 'C', text: 'Option C' },
                { id: 'D', text: 'Option D' }
              ]
            },
            
            {
                id: 2,
                text: "What is the main idea of the passage?",
                options: [
                  { id: 'A', text: 'Option A' },
                  { id: 'B', text: 'Option B' },
                  { id: 'C', text: 'Option C' },
                  { id: 'D', text: 'Option D' }
                ]
              },
              
            {
                id: 3,
                text: "What is the main idea of the passage?",
                options: [
                  { id: 'A', text: 'Option A' },
                  { id: 'B', text: 'Option B' },
                  { id: 'C', text: 'Option C' },
                  { id: 'D', text: 'Option D' }
                ]
              }
          ]
        },
        {
          title: "Reading Passage 2",
          type: "academic",
          content: "Second passage content...",
          questions: [/* questions */]
        },
        {
          title: "Reading Passage 3",
          type: "technical",
          content: "Third passage content...",
          questions: [/* questions */]
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
    }, 60000);
  }

  handleTimeUp() {
    this.handleSubmit();
  }

  handleSubmit() {
    const testData = {
      answers: this.state.selectedAnswers,
      timeSpent: 60 - this.state.timer,
      submittedAt: new Date().toISOString()
    };
    console.log("Test submitted:", testData);
  }

  getCurrentPassage() {
    return this.state.passages[this.state.currentPassageIndex];
  }

  switchPassage(index) {
    if (index >= 0 && index < this.state.passages.length) {
      this.state.currentPassageIndex = index;
    }
  }

  updateAnswer(questionId, answer) {
    this.state.selectedAnswers[questionId] = answer;
  }

  getAnsweredQuestionsCount(passageIndex) {
    const passage = this.state.passages[passageIndex];
    return passage.questions.filter(q => this.state.selectedAnswers[q.id]).length;
  }
}

ReadingTest.template = xml`
<div class="d-flex flex-column vh-100">
  <TestHeader 
    title="'IELTS Reading'"
    timeRemaining="state.timer"
    onSubmit="() => this.handleSubmit()"/>
  
  <main class="flex-grow-1 bg-light py-4">
    <div class="container-fluid">
      <div class="row g-4">
        <!-- Reading Passage Panel -->
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 class="card-title mb-0" t-esc="getCurrentPassage().title"/>
              <span class="badge bg-light text-primary" t-esc="getCurrentPassage().type"/>
            </div>
            <div class="card-body overflow-auto" style="max-height: calc(100vh - 250px);">
              <div class="passage-content">
                <p class="card-text" t-esc="getCurrentPassage().content"/>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Questions Panel -->
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 class="card-title mb-0">Questions</h4>
              <span class="badge bg-info">
                Section <t t-esc="state.currentPassageIndex + 1"/> of 3
              </span>
            </div>
            <div class="card-body overflow-auto" style="max-height: calc(100vh - 250px);">
              <div t-foreach="getCurrentPassage().questions" t-as="question" t-key="question.id" 
                   class="mb-4">
                <p class="fw-bold">
                  Question <t t-esc="question.id"/>: <t t-esc="question.text"/>
                </p>
                <div class="list-group">
                  <t t-foreach="question.options" t-as="option" t-key="option.id">
                    <label class="list-group-item list-group-item-action">
                      <input class="form-check-input me-2" 
                             type="radio" 
                             t-att-name="'q'+question.id"
                             t-att-value="option.id"
                             t-on-change="() => this.updateAnswer(question.id, option.id)"
                             t-att-checked="state.selectedAnswers[question.id] === option.id"/>
                      <span><t t-esc="option.id"/>. <t t-esc="option.text"/></span>
                    </label>
                  </t>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <TestFooter 
    sections="state.passages"
    currentIndex="state.currentPassageIndex"
    onSectionSwitch="(index) => this.switchPassage(index)"
    type="'reading'"/>
</div>`;