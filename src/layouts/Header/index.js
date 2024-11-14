// // // src/components/Root.js -------------------------------------------------------

import { Component, xml, mount } from "@odoo/owl";

import '@layouts/Header/style.scss'


class Task extends Component {
    static template = xml`
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''"> 
        <input type="checkbox" t-att-checked="props.task.isCompleted" />
        <span><t t-esc="props.task.text"/></span>
    </div>
    `;

    static props = ["task"];
}


// Owl Components
export class Header extends Component {
    static template = xml`
        <div class="task-list">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
                <Task task="task" />
            </t>
        </div>
    `;

    static components = { Task };


    tasks = [
        {
            id: 1,
            text: "buy milk",
            isCompleted: true,
        },
        {
            id: 2,
            text: "clean house",
            isCompleted: false,
        },
    ];
}