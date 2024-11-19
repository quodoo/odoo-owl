import { Component, xml } from "@odoo/owl";
import "./style.scss";

export default class PrivacyPage extends Component {
    static template = xml`
        <div class="privacy-policy">
            <div class="py-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card shadow-sm">
                            <div class="card-body p-md-5">
                                <h1 class="text-center mb-4">Privacy Policy</h1>
                                
                                <section class="mb-5">
                                    <h2 class="h4 mb-4">1. Information We Collect</h2>
                                    <p class="text-muted">We collect information that you provide directly to us, including:</p>
                                    <ul class="list-group list-group-flush mb-3">
                                        <li class="list-group-item">
                                            <i class="fa fa-user me-2 text-primary"></i>
                                            Name and contact information
                                        </li>
                                        <li class="list-group-item">
                                            <i class="fa fa-key me-2 text-primary"></i>
                                            Account credentials
                                        </li>
                                        <li class="list-group-item">
                                            <i class="fa fa-credit-card me-2 text-primary"></i>
                                            Payment information
                                        </li>
                                        <li class="list-group-item">
                                            <i class="fa fa-chart-line me-2 text-primary"></i>
                                            Usage data and preferences
                                        </li>
                                    </ul>
                                </section>

                                <section class="mb-5">
                                    <h2 class="h4 mb-4">2. How We Use Your Information</h2>
                                    <p class="text-muted">We use the information we collect to:</p>
                                    <div class="list-group mb-3">
                                        <div class="list-group-item">
                                            <i class="fa fa-check me-2 text-success"></i>
                                            Provide and maintain our services
                                        </div>
                                        <div class="list-group-item">
                                            <i class="fa fa-check me-2 text-success"></i>
                                            Process your transactions
                                        </div>
                                        <div class="list-group-item">
                                            <i class="fa fa-check me-2 text-success"></i>
                                            Send you technical notices and updates
                                        </div>
                                        <div class="list-group-item">
                                            <i class="fa fa-check me-2 text-success"></i>
                                            Respond to your comments and questions
                                        </div>
                                    </div>
                                </section>

                                <section class="mb-5">
                                    <h2 class="h4 mb-4">3. Information Sharing</h2>
                                    <div class="alert alert-info">
                                        <i class="fa fa-info-circle me-2"></i>
                                        We do not sell or rent your personal information to third parties.
                                    </div>
                                    <p class="text-muted">We may share your information only in the following circumstances:</p>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <i class="fa fa-shield-alt me-2 text-primary"></i>
                                            With your consent
                                        </li>
                                        <li class="list-group-item">
                                            <i class="fa fa-balance-scale me-2 text-primary"></i>
                                            To comply with legal obligations
                                        </li>
                                        <li class="list-group-item">
                                            <i class="fa fa-user-shield me-2 text-primary"></i>
                                            To protect our rights and safety
                                        </li>
                                    </ul>
                                </section>

                                <section class="mb-5">
                                    <h2 class="h4 mb-4">4. Data Security</h2>
                                    <div class="card bg-light">
                                        <div class="card-body">
                                            <i class="fa fa-lock text-primary mb-3 fs-2"></i>
                                            <p class="mb-0">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                                        </div>
                                    </div>
                                </section>

                                <section class="mb-5">
                                    <h2 class="h4 mb-4">5. Contact Us</h2>
                                    <div class="card border-primary">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                <i class="fa fa-envelope me-2 text-primary"></i>
                                                Get in Touch
                                            </h5>
                                            <p class="card-text">If you have any questions about this Privacy Policy, please contact us at:</p>
                                            <a href="mailto:privacy@owlproject.com" class="btn btn-primary">
                                                <i class="fa fa-paper-plane me-2"></i>
                                                privacy@owlproject.com
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};