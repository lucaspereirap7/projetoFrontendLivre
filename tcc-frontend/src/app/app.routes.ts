import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { TccList } from './pages/tcc-list/tcc-list';
import { TccForm } from './pages/tcc-form/tcc-form';
import { TccDetail } from './pages/tcc-detail/tcc-detail';
import { EntityList } from './pages/entity-list/entity-list';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'tccs', component: TccList },
  { path: 'tccs/new', component: TccForm },
  { path: 'tccs/:id/edit', component: TccForm },
  { path: 'tccs/:id', component: TccDetail },
  {
    path: 'alunos',
    component: EntityList,
    data: { title: 'Alunos', resource: 'alunos', columns: [{ key: 'nome', label: 'Nome' }, { key: 'matricula', label: 'Matrícula' }] },
  },
  {
    path: 'professores',
    component: EntityList,
    data: { title: 'Professores', resource: 'professores', columns: [{ key: 'nome', label: 'Nome' }] },
  },
  {
    path: 'cursos',
    component: EntityList,
    data: { title: 'Cursos', resource: 'cursos', columns: [{ key: 'nome', label: 'Nome' }, { key: 'sigla', label: 'Sigla' }, { key: 'codigo', label: 'Código' }] },
  },
  {
    path: 'departamentos',
    component: EntityList,
    data: { title: 'Departamentos', resource: 'departamentos', columns: [{ key: 'nome', label: 'Nome' }, { key: 'sigla', label: 'Sigla' }] },
  },
  {
    path: 'unidades-academicas',
    component: EntityList,
    data: { title: 'Unidades Acadêmicas', resource: 'unidades-academicas', columns: [{ key: 'nome', label: 'Nome' }, { key: 'sigla', label: 'Sigla' }] },
  },
  { path: '**', redirectTo: '' },
];
