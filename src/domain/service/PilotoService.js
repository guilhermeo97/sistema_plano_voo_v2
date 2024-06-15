export default class PilotoService{
    constructor() {
      this.pilotos = []; // Array para armazenar os pilotos
    }
    
      // Método para recuperar um piloto com base na matrícula
    recupera(matricula) {
      return this.pilotos.find(piloto => piloto.matricula === matricula);
    }
    
      // Método para recuperar todos os pilotos
    todos() {
      return this.pilotos;
    }
    
      // Método para adicionar um novo piloto
    adicionarPiloto(piloto) {
      this.pilotos.push(piloto);
    }

    isHabilitacaoAtiva(id) {
      const piloto = this.recupera(id);
      if (piloto) {
          return piloto.isHabilitacaoAtiva();
      } else {
          throw new Error(`Piloto com matrícula ${id} não encontrado.`);
      }
    }
}