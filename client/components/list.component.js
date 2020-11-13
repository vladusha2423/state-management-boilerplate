import Component from '../modules/component/component.js';
import store from '../store/index.js';

export default class List extends Component {
    constructor() {
        super({
            store
        });
    }

    render() {
        let items = store.state.items;
        return `
<ul class="list">
    ${items.map(text => { return `
    
    <li data-key="${text}" class="list__item">
        ${text} 
        <button class="list__delete-button">X</button>
    </li>
    
    `}).join('')}
</ul>
<input class="list__input" type="text">
<button class="list__button">Добавить</button>
        `;
    }
}
