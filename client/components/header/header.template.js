export const headerTemplate = function(){
    return {
        tagName: 'h3',
        classList: ['header'],
        attributes: {},
        textContent: `Всего записей ${this.props.store.state.items.length}:`,
        children: []
    }
}