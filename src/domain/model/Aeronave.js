import { validate } from "bycontract";

export default class Aeronave {
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;
  
    static idGen = 0;
    
    constructor(velocidadeCruzeiro, autonomia) {
      validate(arguments, ["Number", "Number"])
      Aeronave.idGen++;
      this.#prefixo = String(Aeronave.idGen);
      this.#velocidadeCruzeiro = velocidadeCruzeiro;
      this.#autonomia = autonomia;
    }
  
    // Getters
    get prefixo() {
      return this.#prefixo;
    }
  
    get velocidadeCruzeiro() {
      return this.#velocidadeCruzeiro;
    }
  
    get autonomia() {
      return this.#autonomia;
    }
  
    set velocidadeCruzeiro(novaVelocidadeCruzeiro) {
      validate([novaVelocidadeCruzeiro], ["Number"]);
      this.#velocidadeCruzeiro = novaVelocidadeCruzeiro;
    }
  
    set autonomia(novaAutonomia) {
      validate([novaAutonomia], ["Number"]);
      this.#autonomia = novaAutonomia;
    }
  
    // Método toString
    toString() {
      return `Aeronave: ${this.#prefixo} (Velocidade de Cruzeiro: ${this.#velocidadeCruzeiro} km/h, Autonomia: ${this.#autonomia} km)`;
    }
  }
  
export class AeronaveParticular extends Aeronave {
    #respManutencao;

    constructor(velocidadeCruzeiro, autonomia, respManutencao) {
      super(velocidadeCruzeiro, autonomia);
      validate([respManutencao], ["String"]);
      this.#respManutencao = respManutencao;
    }
  
    // Getter e setter específico
    get respManutencao() {
      return this.#respManutencao;
    }
  
    set respManutencao(novoRespManutencao) {
      validate([novoRespManutencao], ["String"]);
      this.#respManutencao = novoRespManutencao;
    }
  
    // Sobrescrevendo o método toString
    toString() {
      return `Aeronave Particular: ${this.prefixo} (Responsável pela Manutenção: ${this.respManutencaoresp})`;
    }
  }
  
export class AeronaveComercial extends Aeronave {
    #nomeCIA;
  
    constructor(velocidadeCruzeiro, autonomia, nomeCIA) {
      super(velocidadeCruzeiro, autonomia);
      validate([nomeCIA], ["String"]);
      this.#nomeCIA = nomeCIA;
    }
  
    // Getter e setter específico
    get nomeCIA() {
      return this.#nomeCIA;
    }
  
    set nomeCIA(novoNomeCIA) {
      validate([novoNomeCIA], ["String"]);
      this.#nomeCIA = novoNomeCIA;
    }
  
    // Sobrescrevendo o método toString
    toString() {
      return `Aeronave Comercial: ${this.prefixo} (Companhia Aérea: ${this.nomeCIA})`;
    }
  }
  
export class AeronavePassageiros extends AeronaveComercial {
    #maxPassageiros;
  
    constructor(velocidadeCruzeiro, autonomia, nomeCIA, maxPassageiros) {
      super(velocidadeCruzeiro, autonomia, nomeCIA);
      validate([maxPassageiros], ["Number"])
      this.#maxPassageiros = maxPassageiros;
    }
  
    // Getter e setter específico
    get maxPassageiros() {
      return this.#maxPassageiros;
    }
  
    set maxPassageiros(novoMaxPassageiros) {
      validate([novoMaxPassageiros], ["Number"]);
      this.#maxPassageiros = novoMaxPassageiros;
    }
  
    // Sobrescrevendo o método toString
    toString() {
      return `Aeronave de Passageiros: ${this.prefixo} (Companhia Aérea: ${this.nomeCIA}, Capacidade de Passageiros: ${this.maxPassageiros})`;
    }
  }
  
export class AeronaveCarga extends AeronaveComercial {
    #pesoMax;

    constructor(velocidadeCruzeiro, autonomia, nomeCIA, pesoMax) {
      super(velocidadeCruzeiro, autonomia, nomeCIA);
      validate([pesoMax], ["Number"]);
      this.#pesoMax = pesoMax;
    }
  
    // Getter e setter específico
    get pesoMax() {
      return this.#pesoMax;
    }
  
    set pesoMax(novoPesoMax) {
      validate([novoPesoMax], ["Number"]);
      this.#pesoMax = novoPesoMax;
    }
  
    // Sobrescrevendo o método toString
    toString() {
      return `Aeronave de Carga: ${this.prefixo} (Companhia Aérea: ${this.nomeCIA}, Peso Máximo: ${this.pesoMax} toneladas)`;
    }
  }
  