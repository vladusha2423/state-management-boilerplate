export const listTemplate = function(){
    return {
        tagName: 'div',
        classList: ['list'],
        children: [
            {
                tagName: 'ul',
                classList: ['list__content'],
                children: [
                    ...this.props.store.state.items.map(text => {
                        return {
                            tagName: 'li',
                            classList: ['list__item'],
                            attributes: {
                                'data-key': text,
                            },
                            children: [
                                {
                                    tagName: 'div',
                                    classList: ['list__text'],
                                    textContent: text
                                },
                                {
                                    tagName: 'button',
                                    classList: ['list__delete-button'],
                                    events: {
                                        onclick: this.methods.clearItem
                                    },
                                    textContent: 'X'
                                },
                            ]
                        }
                    })
                ]
            },
            {
                tagName: 'input',
                classList: ['list__input']
            },
            {
                tagName: 'button',
                classList: ['list__button'],
                events: {
                    onclick: this.methods.addItem
                },
                textContent: 'Add'
            }
        ]
    }
}