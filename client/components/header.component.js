import Component from '../modules/component/component.js';
import store from '../store/index.js';

export default class Header extends Component {
    constructor(text) {
        super({
            store
        });
        this.name = 'header';
        this.text = text;
    }

    render() {
        return `<h1>${this.text}</h1>`;
    }
}
