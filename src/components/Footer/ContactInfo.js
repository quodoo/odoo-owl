import { Component, xml } from "@odoo/owl";

export class ContactInfo extends Component {
    static template =  xml`
    <div class="contact-info">
        <h2>Developer Contact</h2>
        <div class="developer-details">
            <p class="name">Trinh Van Quang</p>
            <p class="location">Nam Tu Liem, Hanoi, Vietnam</p>
            <p class="phone">
                <a href="tel:+84972421977">+84 972 421 977</a>
            </p>
            <p class="email">
                <a href="mailto:trinhvanquangf1@gmail.com">trinhvanquangf1@gmail.com</a>
            </p>
        </div>
        <a href="/contact" class="contact-button">Get In Touch</a>
    </div>
`;
} 
