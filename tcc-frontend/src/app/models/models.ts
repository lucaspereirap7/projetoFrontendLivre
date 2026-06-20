export interface UnidadeAcademica {
  id: number;
  nome: string;
  sigla: string;
}

export interface Departamento {
  id: number;
  nome: string;
  sigla: string;
  unidade_academica: number;
}

export interface Curso {
  id: number;
  nome: string;
  sigla: string;
  codigo: string;
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  curso: number;
}

export interface Professor {
  id: number;
  nome: string;
  departamento: number;
}

export interface Tcc {
  id: number;
  titulo: string;
  resumo: string;
  palavras_chave: string;
  tipo: string;
  idioma: string;
  aluno: number;
  orientador: number;
  coorientador: number | null;
  presidente: number;
  primeiro_membro: number;
  segundo_membro: number;
  semestre_letivo_defesa: string | null;
  status: string;
  arquivo: string | null;
  status_display?: string;
  tipo_display?: string;
  idioma_display?: string;
}

export interface TccStats {
  total_geral: number;
  por_status: Record<string, number>;
  por_tipo: Record<string, number>;
  por_idioma: Record<string, number>;
  por_semestre: Record<string, number>;
  por_orientador: Record<string, number>;
  por_coorientador: Record<string, number>;
  por_curso: Record<string, number>;
  por_departamento: Record<string, number>;
  por_unidade_academica: Record<string, number>;
}

export const STATUS_CHOICES: { value: string; label: string }[] = [
  { value: '0', label: 'Em Elaboração' },
  { value: '1', label: 'Enviado' },
  { value: '2', label: 'Aprovado' },
  { value: '3', label: 'Reprovado' },
];

export const TIPO_CHOICES: { value: string; label: string }[] = [
  { value: 'MONOGRAFIA', label: 'Monografia' },
  { value: 'RELATORIO_ESTAGIO', label: 'Relatório de Estágio' },
  { value: 'RELATORIO_TECNICO', label: 'Relatório Técnico' },
  { value: 'ARTIGO', label: 'Artigo' },
];

export const IDIOMA_CHOICES: { value: string; label: string }[] = [
  { value: 'PT', label: 'Português' },
  { value: 'EN', label: 'Inglês' },
];

export const SEMESTRE_CHOICES: string[] = [
  '2020/1', '2020/2', '2021/1', '2021/2', '2022/1', '2022/2',
  '2023/1', '2023/2', '2024/1', '2024/2', '2025/1', '2025/2', '2026/1',
];
