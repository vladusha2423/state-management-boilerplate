import Header from "../header/header.component.js";
import List from "../list/list.component.js";
import Example from "../example/example.component.js";

export const todoTemplate = function(){
    return {
        tagName: 'div',
        classList: ['app__content'],
        attributes: {},
        children: [
            new Header().render(),
            new List().render()
        ]
    }
}