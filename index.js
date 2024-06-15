import Sistema from './src/domain/model/Sistema.js';
import Piloto from './src/domain/model/Piloto.js';
import PilotoService from './src/domain/service/PilotoService.js';
import AeronaveService from './src/domain/service/AeronaveService.js';
import AeroviaService from './src/domain/service/AeroviaService.js';
import { AeronaveParticular, AeronavePassageiros, AeronaveCarga, AeronaveComercial } from './src/domain/model/Aeronave.js';
import Aerovia from './src/domain/model/Aerovia.js';
import PlanoDeVoo from './src/domain/model/PlanoDeVoo.js';
import PlanoDeVooService from './src/domain/service/PlanoDeVooService.js';
import OcupacaoAerovia from './src/domain/model/OcupacaoAerovia.js';

// Criando as instâncias dos serviços
const servicoPilotos = new PilotoService();
const servicoAeronaves = new AeronaveService();
const servicoAerovias = new AeroviaService();
const ocupacaoAerovia = new OcupacaoAerovia();
const servicoPlanos = new PlanoDeVooService(servicoAeronaves, servicoPilotos, servicoAerovias, ocupacaoAerovia);

// Instanciando o sistema com os serviços
const sistema = new Sistema(servicoAeronaves, servicoPilotos, servicoAerovias, servicoPlanos, ocupacaoAerovia);

// Cadastrando pilotos
const piloto1 = new Piloto('João Silva');
const piloto2 = new Piloto('Maria Oliveira');

sistema.cadastrarPiloto(piloto1);
sistema.cadastrarPiloto(piloto2);

console.log("---------");

sistema.listarPilotos();

// Cadastrando aeronaves
const aeronaveParticular = new AeronaveParticular(500, 2000, 'Empresa de Manutenção A');
const aeronavePassageiros = new AeronavePassageiros(800, 5000, 'Companhia Aérea B', 180);
const aeronaveCarga = new AeronaveCarga(600, 4000, 'Companhia Aérea C', 20);
sistema.cadastrarAeronave(aeronaveParticular);
sistema.cadastrarAeronave(aeronavePassageiros);
sistema.cadastrarAeronave(aeronaveCarga);
sistema.listarAeronaves();

// Cadastrando aerovias
const aerovia1 = new Aerovia('POA', 'FLO', 1000);
const aerovia2 = new Aerovia('FLO', 'POA', 1000);
sistema.cadastrarAerovia(aerovia1);
sistema.cadastrarAerovia(aerovia2);

// Listar aerovias entre dois aeroportos
console.log('Listar aerovias entre POA e FLO:');
sistema.listarAerovias('POA', 'FLO');

// Submeter um plano de voo
const plano1 = new PlanoDeVoo('1', '1', '1', new Date('2023-06-15'), new Date('2023-06-15T14:00:00'), 25000, [14, 15]);
console.log('\nSubmeter um plano de voo:');
sistema.aprovarPlanoDeVoo(plano1);

// Listar altitudes livres em uma aerovia em uma data
console.log('\nListar altitudes livres na aerovia 1 em 2023-06-15:');
sistema.listarAltitudesLivres(1, new Date('2023-06-15'));

// Listar um plano de voo
console.log('\nListar plano de voo com número 1:');
sistema.listarPlano(1);

sistema.listarAltitudesLivres(1, new Date('2023-06-15'));

// Cadastrar um piloto
console.log('\nCadastrar um novo piloto:');
const novoPiloto = new Piloto('Ana Paula');
sistema.cadastrarPiloto(novoPiloto);

// Listar todos os pilotos
console.log('\nListar todos os pilotos:');
sistema.listarPilotos();

// Buscar piloto por matrícula
console.log('\nBuscar piloto com matrícula 12345:');
sistema.buscarPiloto('1');