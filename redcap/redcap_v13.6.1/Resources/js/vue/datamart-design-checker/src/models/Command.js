export const status = Object.freeze({
    READY: 0,
    PROCESSING: 2,
    PROCESSED: 3,
    ERROR: 4,
})


export default class Command {
    /* {
        params: {formName: "labs"}
        text: "Add this field to the `labs`instrument: \"labs_unit\""
        type: "ADD_FIELDS"
    } */
    #properties = {
        id: '',
        description: '',
        parameters: {},
        status: status.READY,
        criticality: 0,
        action_type: '',
    }

    constructor(params={}) {
        for(let[key,value] of Object.entries(params)) {
            if(!(key in this.#properties)) continue
            this[key] = value
        }
    }

    get id() { return this.#properties['id'] }
    set id(value) { this.#properties['id'] = value }
    
    get description() { return this.#properties['description'] }
    set description(value) { this.#properties['description'] = value }

    get parameters() { return this.#properties['parameters'] }
    set parameters(value) { this.#properties['parameters'] = value }

    get action_type() { return this.#properties['action_type'] }
    set action_type(value) { this.#properties['action_type'] = value }

    get criticality() { return this.#properties['criticality'] }
    set criticality(value) { this.#properties['criticality'] = parseInt(value) }

    get status() { return this.#properties['status'] }
    set status(value) {
        if(value in Object.values(status)) this.#properties['status'] = value
        else this.#properties['status'] = status.ERROR
    }

    isReady() { return this.status === status.READY }

    resetStatus() { this.status = status.READY }

}