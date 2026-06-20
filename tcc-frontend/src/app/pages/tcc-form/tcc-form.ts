import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TccService } from '../../services/tcc.service';
import { LookupsService } from '../../services/lookups.service';
import {
  Aluno, Professor, TIPO_CHOICES, IDIOMA_CHOICES, STATUS_CHOICES, SEMESTRE_CHOICES,
} from '../../models/models';

@Component({
  selector: 'app-tcc-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './tcc-form.html',
  styleUrl: './tcc-form.scss',
})
export class TccForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tccService = inject(TccService);
  private lookups = inject(LookupsService);

  alunos: Aluno[] = [];
  professores: Professor[] = [];
  tipoChoices = TIPO_CHOICES;
  idiomaChoices = IDIOMA_CHOICES;
  statusChoices = STATUS_CHOICES;
  semestreChoices = SEMESTRE_CHOICES;

  id: number | null = null;
  loading = signal(true);
  saving = signal(false);
  error = signal('');
  selectedFile: File | null = null;
  existingArquivo: string | null = null;

  form = this.fb.group({
    titulo: ['', Validators.required],
    resumo: ['', Validators.required],
    palavras_chave: ['', Validators.required],
    tipo: ['', Validators.required],
    idioma: ['', Validators.required],
    aluno: [null as number | null, Validators.required],
    orientador: [null as number | null, Validators.required],
    coorientador: [null as number | null],
    presidente: [null as number | null, Validators.required],
    primeiro_membro: [null as number | null, Validators.required],
    segundo_membro: [null as number | null, Validators.required],
    semestre_letivo_defesa: [null as string | null],
    status: ['0', Validators.required],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    forkJoin({ alunos: this.lookups.alunos(), profs: this.lookups.professores() }).subscribe({
      next: ({ alunos, profs }) => {
        this.alunos = alunos;
        this.professores = profs;
        if (this.id) {
          this.loadTcc(this.id);
        } else {
          this.loading.set(false);
        }
      },
      error: () => {
        this.error.set('Erro ao carregar alunos/professores. Verifique o backend.');
        this.loading.set(false);
      },
    });
  }

  private loadTcc(id: number): void {
    this.tccService.get(id).subscribe({
      next: (t) => {
        this.existingArquivo = t.arquivo;
        this.form.patchValue({
          titulo: t.titulo,
          resumo: t.resumo,
          palavras_chave: t.palavras_chave,
          tipo: t.tipo,
          idioma: t.idioma,
          aluno: t.aluno,
          orientador: t.orientador,
          coorientador: t.coorientador,
          presidente: t.presidente,
          primeiro_membro: t.primeiro_membro,
          segundo_membro: t.segundo_membro,
          semestre_letivo_defesa: t.semestre_letivo_defesa,
          status: t.status,
        });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar o TCC.');
        this.loading.set(false);
      },
    });
  }

  onFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files && input.files.length ? input.files[0] : null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const fd = new FormData();
    Object.entries(v).forEach(([key, val]) => {
      if (val !== null && val !== '') {
        fd.append(key, String(val));
      }
    });
    if (this.selectedFile) {
      fd.append('arquivo', this.selectedFile);
    }

    this.saving.set(true);
    this.error.set('');
    const request = this.id ? this.tccService.update(this.id, fd) : this.tccService.create(fd);
    request.subscribe({
      next: (t) => this.router.navigate(['/tccs', t.id]),
      error: (err) => {
        this.saving.set(false);
        this.error.set('Erro ao salvar: ' + this.formatError(err));
      },
    });
  }

  private formatError(err: unknown): string {
    const e = err as { error?: unknown };
    try {
      return typeof e.error === 'string' ? e.error : JSON.stringify(e.error);
    } catch {
      return 'verifique os campos e tente novamente.';
    }
  }
}
