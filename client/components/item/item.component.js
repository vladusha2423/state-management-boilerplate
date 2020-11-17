import Component from '../../modules/component/component.js';
import store from '../../store/index.js';
import {itemTemplate} from "./item.template.js";

export default class Item extends Component {
    constructor(data) {
        super({
            store,
            ...data
        });
    }

    render() {
        return this.compile(itemTemplate.call(this));
    }
}
