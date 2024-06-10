export interface OceanData {
  regiao: string;
  especie: string;
  statusConservacao: string;
  temperaturaAgua: number;
  pH: number;
  nivelPoluicao: string;
  especies: Especie[];
  projetosConservacao: ProjetoConservacao[];
  pagina: number;
  qtde: number;
}

export interface Especie {
  nome: string;
  status: string;
}

export interface ProjetoConservacao {
  nomeProjeto: string;
  tipoProjeto: string;
  tipoParticipacao: string;
}
