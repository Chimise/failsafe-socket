import OfflineState from "./states/offline-state.js";
import OnlineState from "./states/online-state.js";

class FailSafeSocket {
    constructor(options) {
        this.options = options;
        this.jsonSocket = null;
        this.socket = null;
        this.currentState = null;
        this.states = {
            offline: new OfflineState(this),
            online: new OnlineState(this)
        }
        this.queue = []

        this.changeState('offline');
    }

    changeState(state) {
        console.log(`Activating state: ${state}`)
        this.currentState = this.states[state];
        this.currentState.activate();
    }

    send(data) {
        this.currentState.send(data);
    }
}

export default FailSafeSocket;