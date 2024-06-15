import { validate } from "bycontract";

export default class OcupacaoAerovia {
  constructor() {
    this._ocupacoes = {}; // Objeto para armazenar as ocupações das aerovias
  }

  // Método para verificar as altitudes livres em uma determinada aerovia e data
  altitudesLivres(idAerovia, data) {
    validate(arguments, ["Number", "Date"])

    if (!this._ocupacoes[idAerovia] || !this._ocupacoes[idAerovia][data]) {
      // Se não houver ocupações para a aerovia ou data especificada, todas as altitudes estão livres
      // Retorna um array com as altitudes permitidas
      return [25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000];
    } else {
      // Se houver ocupações, verifica quais altitudes estão livres
      const altitudesOcupadas = this._ocupacoes[idAerovia][data].map(ocupacao => ocupacao.altitude);
      const altitudesLivres = [];
      for (let altitude = 25000; altitude <= 35000; altitude += 1000) {
        if (!altitudesOcupadas.includes(altitude.toString())) {
          altitudesLivres.push(altitude.toString());
        }
      }
      return altitudesLivres;
    }
  }

  // Método para ocupar uma altitude em uma determinada aerovia, data e slot de tempo
  ocupa(idAerovia, data, altitude, slot) {
    validate(arguments, ["String", "Date", "Number", "Number"])

    // Verifica se já existe uma entrada para a aerovia e data
    if (!this._ocupacoes[idAerovia]) {
      this._ocupacoes[idAerovia] = {};
    }

    if (!this._ocupacoes[idAerovia][data]) {
      this._ocupacoes[idAerovia][data] = [{ altitude: altitude.toString(), slot }];
    } else {
      this._ocupacoes[idAerovia][data].push({ altitude: altitude.toString(), slot });
    }

    return true; // Retorna true se a operação for bem-sucedida
  }

  // Método para verificar se uma altitude em uma determinada aerovia, data e slot de tempo está ocupada
  isOcupado(idAerovia, data, altitude, slot) {
    validate(arguments, ["String", "Date", "Number", "Number"])
    const chave = `${idAerovia}-${data.toISOString().split('T')[0]}-${altitude}-${slot}`;
    return this._ocupacoes[chave] || false;;
  }

  marcarOcupado(aeroviaId, data, altitude, slot) {
    const chave = `${aeroviaId}-${data.toISOString().split('T')[0]}-${altitude}-${slot}`;
    this._ocupacoes[chave] = true;
}
}
