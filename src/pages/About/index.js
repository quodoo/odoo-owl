import { Component, xml } from "@odoo/owl";
import "./style.scss";

class MissionSection extends Component {
    static template = xml`
        <div class="mission-section">
            <h2>Our Mission</h2>
            <p>We are dedicated to creating modern, efficient web applications using the Odoo OWL framework. Our goal is to provide developers with robust, scalable solutions.</p>
        </div>
    `;
}

class TeamSection extends Component {
    static template = xml`
        <div class="team-section">
            <h2>Our Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <h3>Quang Trinh</h3>
                    <p>Lead Developer</p>
                </div>
                <div class="team-member">
                    <h3>Cursor AI</h3>
                    <p>UX Designer</p>
                </div>
                <div class="team-member">
                    <h3>Gemini AI</h3>
                    <p>Backend Engineer</p>
                </div>
            </div>
        </div>
    `;
}

class AboutPage extends Component {
    static template = xml`
        <div class="about-page">
            <div class="container">
                <h1>About Us</h1>
                <div class="about-content">
                    <MissionSection />
                    <TeamSection />
                </div>
            </div>
        </div>
    `;
    static components = { MissionSection, TeamSection };
}

export default AboutPage;