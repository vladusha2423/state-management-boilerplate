import Component from '../../modules/component/component.js';
import store from '../../store/index.js';
import {template} from "./notFound.template.js";

export default class NotFound extends Component {
    constructor(text) {
        super({
            store,
            text
        });
    }

    render() {
        return this.compile(template.call(this));
    }
}
