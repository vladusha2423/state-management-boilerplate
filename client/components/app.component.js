import Component from '../modules/component/component.js';
import store from '../store/index.js';

import List from './list.component.js';
import Header from './header.component.js';

export default class App extends Component {
    constructor() {
        super({
            store
        });
        this.name = 'app';
    }

    render() {
        return `
        
<div class="${this.name}">
    ${new Header('Заголовок').render()}
    ${new List().render()}
</div>
        
        `;
    }
}
