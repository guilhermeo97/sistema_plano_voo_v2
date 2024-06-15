import { validate } from "bycontract";

export default class Aerovia {
    #id;
    #origem;
    #destino;
    #tamanho
  
    static idGen = 0
    constructor(origem, destino, tamanho) {
        validate(arguments, ['String', 'String', 'Number'])
        Aerovia.idGen++;
        this.#id = String(Aerovia.idGen);
        this.#origem = origem;
        this.#destino = destino;
        this.#tamanho = tamanho;
    }
  
    // Getters e setters
    get id() {
      return this.#id;
    }
  
    get origem() {
      return this.#origem;
    }
  
    get destino() {
      return this.#destino;
    }
  
    get tamanho() {
      return this.#tamanho;
    }
  
    set origem(novaOrigem) {
      validate(arguments, ['String']);
      this.#origem = novaOrigem;
    }
  
    set destino(novoDestino) {
      validate(arguments, ['String']);
      this.#destino = novoDestino;
    }
  
    set tamanho(novoTamanho) {
      validate(arguments, ['Number']);
      this.#tamanho = novoTamanho;
    }

    getTamanho() {
      return this.#tamanho;
    }
  
    // Método toString
    toString() {
      return `Aerovia ${this.#id}: Origem: ${this.#origem}, Destino: ${this.#destino}, Tamanho: ${this.#tamanho} km`;
    }
  }