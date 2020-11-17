import Component from '../../modules/component/component.js';
import {todoTemplate} from "./todo.template.js";
import store from '../../store/index.js';

export default class Todo extends Component {
    constructor() {
        super({
            store
        });
        this.state = {

        };
    }

    render() {
        document.title = 'App';
        return this.compile(todoTemplate.call(this));
    }
}
