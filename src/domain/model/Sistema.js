import { validate } from "bycontract";

export default class Sistema {

    constructor(servicoAeronaves, servicoPilotos, servicoAerovias, servicoPlanos, ocupacaoAerovia) {
        this.servicoAeronaves = servicoAeronaves;
        this.servicoPilotos = servicoPilotos;
        this.servicoAerovias = servicoAerovias;
        this.servicoPlanos = servicoPlanos;
        this.ocupacaoAerovia = ocupacaoAerovia;
    }

    listarAerovias(origem, destino) {
        const aerovias = this.servicoAerovias.buscarPorOrigemEDestino(origem, destino);
        if (!aerovias || aerovias.length === 0) {
            console.log('Nenhuma aerovia encontrada entre os aeroportos especificados.');
            return;
        }
        aerovias.forEach(aerovia => {
            console.log(aerovia.toString());
        });
    }

    listarAltitudesLivres(idAerovia, data) {
        const altitudesLivres = this.ocupacaoAerovia.altitudesLivres(idAerovia, data);
        console.log(`Altitudes livres na aerovia ${idAerovia} em ${data}:`);
        altitudesLivres.forEach(altitude => {
            console.log(altitude);
        });
    }

    aprovarPlanoDeVoo(plano) {
        const numeroPlano = this.servicoPlanos.submete(plano);
        console.log(`Plano de voo aprovado com número: ${numeroPlano}`);
    }

    listarPlano(numero) {
        const plano = this.servicoPlanos.recupera(numero);
        if (plano) {
            console.log(plano.toString());
        } else {
            console.log(`Plano de voo com número ${numero} não encontrado.`);
        }
    }

    cadastrarPiloto(novoPiloto) {
        this.servicoPilotos.adicionarPiloto(novoPiloto);
    }

    cadastrarAerovia(novaAerovia) {
        this.servicoAerovias.adicionarAerovia(novaAerovia);
    }

    cadastrarAeronave(novaAeronave){
        this.servicoAeronaves.adicionarAeronave(novaAeronave);
    }

    listarAeronaves(){
        const aeronaves = this.servicoAeronaves.todas();
        aeronaves.forEach(aeronave => {
        console.log(aeronave.toString());
      });
    }

    listarPilotos() {
      const pilotos = this.servicoPilotos.todos();
      pilotos.forEach(piloto => {
        console.log(piloto.toString());
      });
    }

    buscarPiloto(id) {
        validate([id], ["String"]);
        const piloto = this.servicoPilotos.recupera(id);
        console.log(piloto ? piloto.toString() : `Piloto com matrícula ${id} não encontrado.`);
    }
}
