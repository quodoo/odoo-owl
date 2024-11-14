// // // src/components/Root.js -------------------------------------------------------

import { Component, xml, mount } from "@odoo/owl";

import '@pages/Home/style.scss'

import { Header } from "@layouts/Header/";



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
export class Root extends Component {
    static template = xml`
    <Header />
        <div class="task-list">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
                <Task task="task" />
            </t>
        </div>
    `;

    static components = { Task, Header };


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