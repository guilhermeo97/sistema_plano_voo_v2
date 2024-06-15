import { validate } from "bycontract";

export default class Piloto {
    #matricula;
    #nome;
    #habilitacaoAtiva;
    static #idGen = 0;
    
    constructor(nome) {
      validate([nome], ["String"])
      Piloto.#idGen++;
      this.#matricula = String(Piloto.#idGen);
      this.#nome = nome;
      this.#habilitacaoAtiva = true;
    }
  
    get matricula() {
      return this.#matricula;
    }
  
    get nome() {
      return this.#nome;
    }
  
    get habilitacaoAtiva() {
      return this.#habilitacaoAtiva;
    }
  
    set nome(novoNome) {
      this.#nome = novoNome;
    }
  
    mudarStatusPiloto(){
        this.#habilitacaoAtiva = !this.#habilitacaoAtiva;
    }
  
    isHabilitacaoAtiva() {
      return this.#habilitacaoAtiva;
    }

    // Método toString
    toString() {
      return `Piloto: ${this.#nome} (Matrícula: ${this.#matricula}, Habilitação Ativa: ${this.#habilitacaoAtiva ? 'Sim' : 'Não'})`;
    }
  }
  