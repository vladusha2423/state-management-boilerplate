import Store from '../store/store.js';

export default class Component {
    constructor(props = {}) {
        let self = this;

        self.render = self.render || function() {};

        self.name = self.name || '';

        if(props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => {self.reload()});
        }
    }

    reload(){
        let self = this;

        const element = document.getElementsByClassName(self.name)[0];
        if(element)
            element.remove();

        self.render();
    }
}
