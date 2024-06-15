import PlanoDeVoo from '../model/PlanoDeVoo.js'; // Certifique-se de ajustar o caminho conforme necessário
import { AeronaveParticular, AeronavePassageiros, AeronaveCarga, AeronaveComercial } from '../model/Aeronave.js';

export default class PlanoDeVooService {
    constructor(servicoAeronaves, servicoPilotos, servicoAerovias, ocupacaoAerovia) {
        this.planos = []; // Armazena os planos de voo
        this.nextId = 1;  // Para gerar identificadores únicos para os planos de voo
        this.servicoAeronaves = servicoAeronaves;
        this.servicoPilotos = servicoPilotos;
        this.servicoAerovias = servicoAerovias;
        this.ocupacaoAerovia = ocupacaoAerovia;
    }

    // Submete um novo plano de voo, valida e adiciona à lista de planos
    submete(plano) {
        this.consiste(plano); // Valida o plano
        plano.id = this.nextId; // Atribui um identificador único
        this.marcarOcupacao(plano);
        this.planos.push(plano); // Adiciona o plano à lista
        this.nextId++; // Incrementa o identificador para o próximo plano
        return plano.id; // Retorna o identificador do plano aprovado
    }

    marcarOcupacao(plano) {
        const aeronave = this.servicoAeronaves.recupera(plano.prefixoAeronave);
        const aerovia = this.servicoAerovias.recupera(plano.idAerovia);
        const slotsNecessarios = this.calculaSlotsNecessarios(aeronave, aerovia, plano.horario);
        
        slotsNecessarios.forEach(slot => {
            this.ocupacaoAerovia.marcarOcupado(aerovia.id, plano.data, plano.altitude, slot);
        })
    };

    // Valida o plano de voo conforme as regras especificadas
    consiste(plano) {
        const piloto = this.servicoPilotos.recupera(plano.matricPiloto);
        if (!piloto || !piloto.isHabilitacaoAtiva()) {
            throw new Error('A habilitação do piloto deve estar ativa.');
        }

        const aeronave = this.servicoAeronaves.recupera(plano.prefixoAeronave);
        if (!aeronave) {
            throw new Error('A aeronave especificada no plano de voo não foi encontrada.');
        }

        const aerovia = this.servicoAerovias.recupera(plano.idAerovia);
        if (!aerovia) {
            throw new Error('A aerovia especificada no plano de voo não foi encontrada.');
        }

        // Verifica a autonomia da aeronave
        const autonomiaNecessaria = aerovia.tamanho * 1.1;
        if (aeronave.autonomia < autonomiaNecessaria) {
            throw new Error('A autonomia da aeronave é insuficiente para voar o trecho.');
        }

        // Verifica a altitude compatível com o tipo de aeronave
        if ((aeronave instanceof AeronaveParticular && (plano.altitude < 25000 || plano.altitude > 27000)) ||
            (aeronave instanceof AeronavePassageiros && plano.altitude <= 28000) ||
            (aeronave instanceof AeronaveCarga && (plano.altitude < 25000 || plano.altitude > 35000))) {
            throw new Error('A altitude escolhida não é compatível com o tipo de aeronave.');
        }

        // Verifica restrições de horário para aeronaves de carga
        const horaVoo = plano.horario.getHours();
        if (aeronave instanceof AeronaveCarga && (horaVoo < 0 || horaVoo > 6)) {
            throw new Error('Aeronaves de carga só podem voar entre a meia-noite e as 6:00 da manhã.');
        }

        // Verifica se os slots de horário estão livres
        const slotsNecessarios = this.calculaSlotsNecessarios(aeronave, aerovia, plano.horario);
        for (let slot of slotsNecessarios) {
            if (this.ocupacaoAerovia.isOcupado(aerovia.id, plano.data, plano.altitude, slot)) {
                throw new Error('Os slots de horário necessários não estão livres.');
            }
        }
    }

    // Calcula os slots de horário necessários para o voo
    calculaSlotsNecessarios(aeronave, aerovia, horario) {
        const tempoVooHoras = aerovia.getTamanho() / aeronave.velocidadeCruzeiro;
        const slots = [];
        const slotInicial = horario.getHours();
        const slotsNecessarios = Math.ceil(tempoVooHoras);
        
        for (let i = 0; i < slotsNecessarios; i++) {
            slots.push(slotInicial + i);
        }
        
        return slots;
    }

    // Recupera um plano de voo pelo seu identificador
    recupera(id) {
        return this.planos.find(plano => plano.id === id) || null;
    }
}
