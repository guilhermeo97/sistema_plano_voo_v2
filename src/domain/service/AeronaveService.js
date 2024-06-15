export default class AeronaveService {
    constructor() {
      this.aeronaves = []; // Array para armazenar as aeronaves
    }
  
    // Método para recuperar uma aeronave com base no prefixo
    recupera(prefixo) {
      return this.aeronaves.find(aeronave => aeronave.prefixo === prefixo);
    }
  
    // Método para recuperar todas as aeronaves
    todas() {
      return this.aeronaves;
    }
  
    // Método para adicionar uma nova aeronave
    adicionarAeronave(aeronave) {
      this.aeronaves.push(aeronave);
    }
  }
  