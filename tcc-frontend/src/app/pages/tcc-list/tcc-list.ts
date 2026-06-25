import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TccService } from '../../services/tcc.service';
import { Tcc, STATUS_CHOICES } from '../../models/models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tcc-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tcc-list.html',
  styleUrl: './tcc-list.scss',
})
export class TccList implements OnInit {
  private tccService = inject(TccService);

  tccs = signal<Tcc[]>([]);
  loading = signal(true);
  error = signal('');
  search = '';
  statusChoices = STATUS_CHOICES;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.tccService.list(this.search.trim() || undefined).subscribe({
      next: (t) => {
        this.tccs.set(t);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar TCCs. Verifique se o backend está em execução.');
        this.loading.set(false);
      },
    });
  }

  onStatusChange(tcc: Tcc, status: string): void {
    this.tccService.updateStatus(tcc.id, status).subscribe({
      next: (updated) => {
        tcc.status = updated.status;
        tcc.status_display = updated.status_display;
      },
      error: () => alert('Falha ao atualizar o status.'),
    });
  }

  arquivoUrl(id: number): string {
    return `${environment.apiUrl}tccs/${id}/arquivo/`;
  }

  remove(tcc: Tcc): void {
    if (!confirm(`Excluir o TCC "${tcc.titulo}"?`)) {
      return;
    }
    this.tccService.delete(tcc.id).subscribe({
      next: () => this.tccs.set(this.tccs().filter((t) => t.id !== tcc.id)),
      error: () => alert('Falha ao excluir o TCC.'),
    });
  }
}
