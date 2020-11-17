import Component from '../../modules/component/component.js';
import store from '../../store/index.js';
import {exampleTemplate} from "./example.temlate.js";

export default class Example extends Component {
    constructor() {
        super({
            store
        });
    }

    render() {
        return this.compile(exampleTemplate.call(this));
    }
}
