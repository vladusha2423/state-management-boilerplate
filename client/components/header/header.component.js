import Component from '../../modules/component/component.js';
import {headerTemplate} from "./header.template.js";
import store from '../../store/index.js';

export default class Header extends Component {
    constructor() {
        super({
            store
        });
        this.state = {};
        store.events.subscribe('addItem', this.reload.bind(this));
        store.events.subscribe('clearItem', this.reload.bind(this));
    }

    render() {
        return this.compile(headerTemplate.call(this));
    }
}
