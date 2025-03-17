import { Component, xml } from "@odoo/owl";

export class ConfirmationModal extends Component {
  static template = "ConfirmationModal";
  static props = {
    isOpen: { type: Boolean },
    title: { type: String },
    message: { type: String },
    onConfirm: { type: Function },
    onCancel: { type: Function }
  };
}

ConfirmationModal.template = xml`
<div class="modal fade" 
     t-att-class="props.isOpen ? 'show' : ''" 
     tabindex="-1" 
     t-att-style="props.isOpen ? 'display: block;' : 'display: none;'">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" t-esc="props.title"/>
        <button type="button" 
                class="btn-close btn-close-white" 
                t-on-click="props.onCancel"/>
      </div>
      <div class="modal-body">
        <p class="mb-0" t-esc="props.message"/>
      </div>
      <div class="modal-footer">
        <button type="button" 
                class="btn btn-secondary" 
                t-on-click="props.onCancel">Cancel</button>
        <button type="button" 
                class="btn btn-primary" 
                t-on-click="props.onConfirm">Submit Test</button>
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop fade" 
     t-att-class="props.isOpen ? 'show' : ''" 
     t-att-style="props.isOpen ? 'display: block;' : 'display: none;'"/>
`;