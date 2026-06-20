import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LookupsService } from '../../services/lookups.service';

interface Column {
  key: string;
  label: string;
}

type Row = Record<string, unknown>;

@Component({
  selector: 'app-entity-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './entity-list.html',
  styleUrl: './entity-list.scss',
})
export class EntityList implements OnInit {
  private route = inject(ActivatedRoute);
  private lookups = inject(LookupsService);

  title = signal('');
  columns = signal<Column[]>([]);
  items = signal<Row[]>([]);
  loading = signal(true);
  error = signal('');
  search = signal('');

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const cols = this.columns();
    if (!q) {
      return this.items();
    }
    return this.items().filter((it) =>
      cols.some((c) => this.cell(it, c.key).toLowerCase().includes(q)),
    );
  });

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.title.set(data['title']);
      this.columns.set(data['columns']);
      this.load(data['resource']);
    });
  }

  private load(resource: string): void {
    this.loading.set(true);
    this.error.set('');
    this.search.set('');
    this.lookups.list<Row>(resource).subscribe({
      next: (r) => {
        this.items.set(r);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar dados. Verifique se o backend está em execução.');
        this.loading.set(false);
      },
    });
  }

  cell(item: Row, key: string): string {
    const v = item[key];
    return v == null ? '' : String(v);
  }
}
