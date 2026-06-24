#!/bin/sh
set -e

python manage.py migrate --noinput

HAS_DATA=$(python -c "import django, os; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tcc_project.settings'); django.setup(); from core.models import UnidadeAcademica; print('yes' if UnidadeAcademica.objects.exists() else 'no')")

if [ "$HAS_DATA" = "no" ]; then
    echo "Banco vazio: carregando dados iniciais (load.py)..."
    python load.py
else
    echo "Dados ja existem: pulando load.py."
fi

exec python manage.py runserver 0.0.0.0:8000
