import { Component, xml } from "@odoo/owl";
import "./style.scss";

class ContactPage extends Component {
    static template = xml`
        <div class="contact-page">
            <div class="container">
                <h1>Contact Us</h1>
                <div class="contact-content">
                    <div class="contact-info">
                        <h2>Get in Touch</h2>
                        <div class="info-items">
                            <div class="info-item">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                <p>Nam Tu Liem, Ha Noi, Viet Nam, 100000</p>
                            </div>
                            <div class="info-item">
                                <i class="fa fa-phone"></i>
                                <p>+84 (97) 242-1977</p>
                            </div>
                            <div class="info-item">
                                <i class="fa fa-envelope"></i>
                                <p>trinhvanquangf1@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <form class="contact-form" t-on-submit="onSubmit">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="5" required="required"/>
                        </div>
                        <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    onSubmit(ev) {
        ev.preventDefault();
        // Handle form submission here
        // console.log('Form submitted');
    }
}

export default ContactPage; 