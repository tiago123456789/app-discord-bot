export default class UnauthorizatedException extends Error {

    constructor(message) {
        super(message)
        this.name = "UnauthorizatedException" 
    }
}