import { Component, xml } from "@odoo/owl";

export class TestFooter extends Component {
  static template = "TestFooter";
  static props = {
    sections: { type: Array },
    currentIndex: { type: Number },
    onSectionSwitch: { type: Function },
    type: { type: String }, // 'reading' or 'writing'
    progress: { type: Object, optional: true }
  };

  isQuestionAnswered(section, questionId) {
    return section.answeredQuestions?.[questionId] || false;
  }

  getAnsweredCount(section) {
    if (!section.answeredQuestions) return 0;
    return Object.keys(section.answeredQuestions).length;
  }

  getSectionInfo(section, index) {
    if (this.props.type === 'reading') {
      const questions = section.questions || [];
      const questionRange = questions.map(q => q.id);
      return {
        title: `Passage ${index + 1}`,
        subtitle: section.type,
        questions: questionRange,
        progress: section.answeredQuestions ? `${section.answeredQuestions}/${questions.length} answered` : ''
      };
    }
    return {
      title: `Task ${index + 1}`,
      subtitle: section.type,
      description: section.timeAllocation ? `${section.timeAllocation} minutes` : '',
      progress: this.props.progress?.[index] || ''
    };
  }

  scrollToQuestion(questionId) {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

TestFooter.template = xml`
<footer class="question-palette">
  <div class="container-fluid">
    <div class="navigation-wrapper">
      <div class="progress-bar-wrapper">
        <div class="progress-indicator" 
             t-attf-style="width: {{ (props.currentIndex + 1) / props.sections.length * 100 }}%">
        </div>
      </div>
      
      <div class="section-navigation">
        <div class="nav-buttons">
          <button t-if="props.currentIndex > 0"
                  class="btn btn-outline-primary"
                  t-on-click="() => props.onSectionSwitch(props.currentIndex - 1)">
            <i class="bi bi-arrow-left"></i> Previous
          </button>
          <button t-if="props.currentIndex &lt; props.sections.length - 1"
                  class="btn btn-outline-primary"
                  t-on-click="() => props.onSectionSwitch(props.currentIndex + 1)">
            Next <i class="bi bi-arrow-right"></i>
          </button>
        </div>
        
        <div class="section-indicators">
        <t t-foreach="props.sections" t-as="section" t-key="section_index">
          <div class="indicator-item" 
               t-attf-class="{{ props.currentIndex === section_index ? 'active' : '' }}"
               t-on-click="() => props.onSectionSwitch(section_index)">
            <div class="dot"></div>
            <div class="info-tooltip">
              <div class="info-title" t-esc="getSectionInfo(section, section_index).title"/>
              <t t-if="props.type === 'reading'">
                <div class="info-summary">
                  <t t-esc="getAnsweredCount(section)"/> of <t t-esc="section.questions.length"/> questions
                </div>
                <div class="question-grid">
                  <t t-foreach="getSectionInfo(section, section_index).questions" t-as="qId" t-key="qId">
                    <button class="question-number" 
                            t-on-click.stop="() => this.scrollToQuestion(qId)"
                            t-attf-class="{{ isQuestionAnswered(section, qId) ? 'answered' : '' }}">
                      <t t-esc="qId"/>
                    </button>
                  </t>
                </div>
              </t>
              <t t-else="">
                <div class="info-desc" t-esc="getSectionInfo(section, section_index).description"/>
              </t>
            </div>
          </div>
        </t>
      </div>
      </div>
    </div>
  </div>
</footer>`;