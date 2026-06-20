import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TccService } from '../../services/tcc.service';
import { TccStats } from '../../models/models';

interface ChartCard {
  title: string;
  type: ChartType;
  data: ChartData;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private tccService = inject(TccService);

  loading = signal(true);
  error = signal('');
  total = 0;
  charts: ChartCard[] = [];

  private palette = [
    '#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed',
    '#0891b2', '#db2777', '#65a30d', '#ea580c', '#475569',
  ];

  options: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
  };

  ngOnInit(): void {
    this.tccService.stats().subscribe({
      next: (s) => {
        this.total = s.total_geral;
        this.build(s);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar estatísticas. Verifique se o backend está em execução em ' + '127.0.0.1:8000.');
        this.loading.set(false);
      },
    });
  }

  private build(s: TccStats): void {
    this.charts = [
      { title: 'Por Status', type: 'doughnut', data: this.toData(s.por_status) },
      { title: 'Por Tipo', type: 'bar', data: this.toData(s.por_tipo) },
      { title: 'Por Idioma', type: 'pie', data: this.toData(s.por_idioma) },
      { title: 'Por Semestre', type: 'bar', data: this.toData(s.por_semestre) },
      { title: 'Por Curso', type: 'bar', data: this.toData(s.por_curso) },
      { title: 'Por Orientador', type: 'bar', data: this.toData(s.por_orientador) },
      { title: 'Por Departamento', type: 'bar', data: this.toData(s.por_departamento) },
      { title: 'Por Unidade Acadêmica', type: 'doughnut', data: this.toData(s.por_unidade_academica) },
    ];
  }

  private toData(rec: Record<string, number>): ChartData {
    const labels = Object.keys(rec);
    const values = Object.values(rec);
    const colors = labels.map((_, i) => this.palette[i % this.palette.length]);
    return {
      labels,
      datasets: [{ data: values, label: 'TCCs', backgroundColor: colors }],
    };
  }
}
