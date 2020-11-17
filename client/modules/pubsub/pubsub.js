export default class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {

        if(!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }

        console.log('SUBSCRIBE this.events')
        console.log(this.events);

        return this.events[event].push(callback);
    }

    publish(event, data = {}) {

        if(!this.events.hasOwnProperty(event)) {
            return [];
        }

        console.log('PUBLISH this.events')
        console.log(this.events);

        return this.events[event].map(callback => callback(data));
    }
}