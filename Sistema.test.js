import Sistema from './src/domain/model/Sistema.js';
import PilotoService from './src/domain/service/PilotoService.js';
import AeronaveService from './src/domain/service/AeronaveService.js';
import AeroviaService from './src/domain/service/AeroviaService.js';
import PlanoDeVooService from './src/domain/service/PlanoDeVooService.js';
import OcupacaoAerovia from './src/domain/model/OcupacaoAerovia.js';

const mockPilotoService = {
    todos: jest.fn(),
    adicionarPiloto: jest.fn(),
    recupera: jest.fn(),
};

const mockAeronaveService = {
    todas: jest.fn(),
    adicionarAeronave: jest.fn(),
};

const mockAeroviaService = {
    buscarPorOrigemEDestino: jest.fn(),
    adicionarAerovia: jest.fn(),
};

const mockPlanoDeVooService = {
    submete: jest.fn(),
    recupera: jest.fn(),
};

const mockOcupacaoAerovia = {
    altitudesLivres: jest.fn(),
};

let sistema;

beforeEach(() => {
    sistema = new Sistema(
        mockAeronaveService,
        mockPilotoService,
        mockAeroviaService,
        mockPlanoDeVooService,
        mockOcupacaoAerovia
    );
});

// Testes para listarAerovias
test('listarAerovias deve listar aerovias entre dois aeroportos', () => {
    const aeroviasMock = [{ toString: () => 'Aerovia 1' }, { toString: () => 'Aerovia 2' }];
    mockAeroviaService.buscarPorOrigemEDestino.mockReturnValue(aeroviasMock);

    console.log = jest.fn();

    sistema.listarAerovias('POA', 'FLO');

    expect(mockAeroviaService.buscarPorOrigemEDestino).toHaveBeenCalledWith('POA', 'FLO');
    expect(console.log).toHaveBeenCalledWith('Aerovia 1');
    expect(console.log).toHaveBeenCalledWith('Aerovia 2');
});

test('listarAerovias deve informar quando nenhuma aerovia é encontrada', () => {
    mockAeroviaService.buscarPorOrigemEDestino.mockReturnValue([]);

    console.log = jest.fn();

    sistema.listarAerovias('POA', 'FLO');

    expect(mockAeroviaService.buscarPorOrigemEDestino).toHaveBeenCalledWith('POA', 'FLO');
    expect(console.log).toHaveBeenCalledWith('Nenhuma aerovia encontrada entre os aeroportos especificados.');
});

// Testes para listarAltitudesLivres
test('listarAltitudesLivres deve listar altitudes livres', () => {
    const altitudesMock = [25000, 27000];
    mockOcupacaoAerovia.altitudesLivres.mockReturnValue(altitudesMock);

    console.log = jest.fn();

    sistema.listarAltitudesLivres('1', new Date('2023-06-15'));

    expect(mockOcupacaoAerovia.altitudesLivres).toHaveBeenCalledWith('1', new Date('2023-06-15'));
    expect(console.log).toHaveBeenCalledWith('Altitudes livres na aerovia 1 em Tue Jun 15 2023 00:00:00 GMT+0000 (Coordinated Universal Time):');
    expect(console.log).toHaveBeenCalledWith(25000);
    expect(console.log).toHaveBeenCalledWith(27000);
});

// Testes para aprovarPlanoDeVoo
test('aprovarPlanoDeVoo deve submeter e aprovar plano de voo', () => {
    const planoMock = { id: '1' };
    mockPlanoDeVooService.submete.mockReturnValue('1');

    console.log = jest.fn();

    sistema.aprovarPlanoDeVoo(planoMock);

    expect(mockPlanoDeVooService.submete).toHaveBeenCalledWith(planoMock);
    expect(console.log).toHaveBeenCalledWith('Plano de voo aprovado com número: 1');
});

// Testes para listarPlano
test('listarPlano deve listar um plano de voo existente', () => {
    const planoMock = { toString: () => 'Plano 1' };
    mockPlanoDeVooService.recupera.mockReturnValue(planoMock);

    console.log = jest.fn();

    sistema.listarPlano('1');

    expect(mockPlanoDeVooService.recupera).toHaveBeenCalledWith('1');
    expect(console.log).toHaveBeenCalledWith('Plano 1');
});

test('listarPlano deve informar quando plano de voo não é encontrado', () => {
    mockPlanoDeVooService.recupera.mockReturnValue(null);

    console.log = jest.fn();

    sistema.listarPlano('1');

    expect(mockPlanoDeVooService.recupera).toHaveBeenCalledWith('1');
    expect(console.log).toHaveBeenCalledWith('Plano de voo com número 1 não encontrado.');
});

// Testes para cadastrarPiloto
test('cadastrarPiloto deve adicionar um novo piloto', () => {
    const pilotoMock = { id: '1', nome: 'Piloto 1' };

    sistema.cadastrarPiloto(pilotoMock);

    expect(mockPilotoService.adicionarPiloto).toHaveBeenCalledWith(pilotoMock);
});

// Testes para cadastrarAerovia
test('cadastrarAerovia deve adicionar uma nova aerovia', () => {
    const aeroviaMock = { id: '1', origem: 'POA', destino: 'FLO' };

    sistema.cadastrarAerovia(aeroviaMock);

    expect(mockAeroviaService.adicionarAerovia).toHaveBeenCalledWith(aeroviaMock);
});

// Testes para cadastrarAeronave
test('cadastrarAeronave deve adicionar uma nova aeronave', () => {
    const aeronaveMock = { id: '1', prefixo: 'PP-AAA' };

    sistema.cadastrarAeronave(aeronaveMock);

    expect(mockAeronaveService.adicionarAeronave).toHaveBeenCalledWith(aeronaveMock);
});

// Testes para listarAeronaves
test('listarAeronaves deve listar todas as aeronaves', () => {
    const aeronavesMock = [{ toString: () => 'Aeronave 1' }, { toString: () => 'Aeronave 2' }];
    mockAeronaveService.todas.mockReturnValue(aeronavesMock);

    console.log = jest.fn();

    sistema.listarAeronaves();

    expect(mockAeronaveService.todas).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Aeronave 1');
    expect(console.log).toHaveBeenCalledWith('Aeronave 2');
});

// Testes para listarPilotos
test('listarPilotos deve listar todos os pilotos', () => {
    const pilotosMock = [{ toString: () => 'Piloto 1' }, { toString: () => 'Piloto 2' }];
    mockPilotoService.todos.mockReturnValue(pilotosMock);

    console.log = jest.fn();

    sistema.listarPilotos();

    expect(mockPilotoService.todos).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Piloto 1');
    expect(console.log).toHaveBeenCalledWith('Piloto 2');
});

// Testes para buscarPiloto
test('buscarPiloto deve retornar o piloto pela matrícula', () => {
    const pilotoMock = { toString: () => 'Piloto 1' };
    mockPilotoService.recupera.mockReturnValue(pilotoMock);

    console.log = jest.fn();

    sistema.buscarPiloto('1');

    expect(mockPilotoService.recupera).toHaveBeenCalledWith('1');
    expect(console.log).toHaveBeenCalledWith('Piloto 1');
});

test('buscarPiloto deve informar quando o piloto não é encontrado', () => {
    mockPilotoService.recupera.mockReturnValue(null);

    console.log = jest.fn();

    sistema.buscarPiloto('1');

    expect(mockPilotoService.recupera).toHaveBeenCalledWith('1');
    expect(console.log).toHaveBeenCalledWith('Piloto com matrícula 1 não encontrado.');
});
