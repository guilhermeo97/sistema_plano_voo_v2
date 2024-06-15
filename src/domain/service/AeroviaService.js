import Aerovia from '../model/Aerovia.js';

export default class AeroviaService {
    constructor() {
        this.aerovias = [];
    }

    adicionarAerovia(aerovia) {
        if (!(aerovia instanceof Aerovia)) {
            throw new Error('Invalid aerovia type');
        }
        this.aerovias.push(aerovia);
    }

    recupera(id) {
        return this.aerovias.find(aerovia => aerovia.id === id) || null;
    }

    listar() {
        return this.aerovias;
    }

    buscarPorOrigemEDestino(origem, destino) {
        return this.aerovias.filter(aerovia => 
            aerovia.origem === origem && aerovia.destino === destino
        );
    }
}
