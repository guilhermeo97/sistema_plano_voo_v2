import { validate } from "bycontract";

export default class PlanoDeVoo {
    static idGen = 0;
    #id;
    #matricPiloto;
    #prefixoAeronave;
    #idAerovia;
    #data;
    #horario;
    #altitude;
    #slots;
    #cancelado;

    constructor(matricPiloto, prefixoAeronave, idAerovia, data, horario, altitude, slots) {
        validate([matricPiloto, prefixoAeronave, idAerovia, altitude, slots], ["String", "String", "String", "Number", "Array"]);
        PlanoDeVoo.idGen++;
        this.#id = String(PlanoDeVoo.idGen);
        this.#matricPiloto = matricPiloto;
        this.#prefixoAeronave = prefixoAeronave;
        this.#idAerovia = idAerovia;
        this.#data = data;
        this.#horario = horario;
        this.#altitude = altitude;
        this.#slots = slots;
        this.#cancelado = false;
    }

    // Getters e setters
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get matricPiloto() {
        return this.#matricPiloto;
    }

    get prefixoAeronave() {
        return this.#prefixoAeronave;
    }

    get idAerovia() {
        return this.#idAerovia;
    }

    get data() {
        return this.#data;
    }

    get horario() {
        return this.#horario;
    }

    get altitude() {
        return this.#altitude;
    }

    get slots() {
        return this.#slots;
    }

    get cancelado() {
        return this.#cancelado;
    }

    cancelarPlanoVoo() {
        this.#cancelado = true;
    }

    toString() {
        const status = this.#cancelado ? 'Cancelado' : 'Ativo';
        return `Plano de Voo ${this.#id}: [Piloto: ${this.#matricPiloto}, Aeronave: ${this.#prefixoAeronave}, Aerovia: ${this.#idAerovia}, Data: ${this.#data}, Horário: ${this.#horario}, Altitude: ${this.#altitude}, Slots: ${this.#slots}, Status: ${status}]`;
    }
}
