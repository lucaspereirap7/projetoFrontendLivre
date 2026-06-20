import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TccService } from '../../services/tcc.service';
import { LookupsService } from '../../services/lookups.service';
import { Tcc } from '../../models/models';

@Component({
  selector: 'app-tcc-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './tcc-detail.html',
  styleUrl: './tcc-detail.scss',
})
export class TccDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private tccService = inject(TccService);
  private lookups = inject(LookupsService);

  tcc = signal<Tcc | null>(null);
  loading = signal(true);
  error = signal('');

  private alunos = new Map<number, string>();
  private profs = new Map<number, string>();

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      tcc: this.tccService.get(id),
      alunos: this.lookups.alunos(),
      profs: this.lookups.professores(),
    }).subscribe({
      next: ({ tcc, alunos, profs }) => {
        alunos.forEach((a) => this.alunos.set(a.id, `${a.nome} (${a.matricula})`));
        profs.forEach((p) => this.profs.set(p.id, p.nome));
        this.tcc.set(tcc);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar o TCC.');
        this.loading.set(false);
      },
    });
  }

  alunoNome(id: number): string {
    return this.alunos.get(id) ?? `#${id}`;
  }

  profNome(id: number | null): string {
    return id == null ? '—' : (this.profs.get(id) ?? `#${id}`);
  }
}
