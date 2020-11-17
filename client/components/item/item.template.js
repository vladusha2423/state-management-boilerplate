export const itemTemplate = function(){
    return {
        tagName: 'div',
        classList: ['item'],
        attributes: {
            style: 'color: blue'
        },
        children: [
            {
                tagName: 'h1',
                classList: ['item__content'],
                attributes: {
                    style: 'color: blue'
                },
                textContent: this.props.store.state.items[this.props.index - 1] ?
                    this.props.store.state.items[this.props.index - 1] :
                    'Такого нет :(',
                children: []
            },
            {
                tagName: 'h3',
                classList: ['item__logs'],
                attributes: {
                    style: 'color: black'
                },
                textContent: JSON.stringify(this.props.store.state),
                children: []
            },
        ]
    }
}