class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		if (!config || config === {}) {
			throw new Error ('Invalid config');
		}
		this.initial = config.initial;
		this.state = config.initial;
		this.historyNext = [this.state];
		this.historyPrevios = [];
		this.states = config.states;
		return this.state;
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
		return this.state;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		if (!state || !this.states[state]) {
			throw new Error ('Invalid state');
		}
		this.state = state;
		this.historyNext.push(this.state);
		this.historyPrevios = [];
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		if(this.states[this.state].transitions[event]){
			this.state = this.states[this.state].transitions[event];
			this.historyNext.push(this.state);
			this.historyPrevios = [];
		} else {
			throw new Error ('Invalid event');
		}
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.state = this.initial;
		this.historyNext = [];
		this.historyPrevios = [];
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		let res = [];
		if (!event) {
			for (let i in this.states){
				res.push(i);
			}
		} else {
			for (let i in this.states){
				if (this.states[i].transitions[event]){
					res.push(i);
				}
			}
		}
		return res;
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		if (this.historyNext.length <= 1) {
			return false;
		} else {
			this.historyPrevios.push(this.historyNext.pop());
			this.state = this.historyNext[this.historyNext.length-1];
			return true;
		}
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		if (this.historyPrevios.length == 0) {
			return false;
		} else {
			this.state = this.historyPrevios.pop();
			return true;
		}
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		this.reset();
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
