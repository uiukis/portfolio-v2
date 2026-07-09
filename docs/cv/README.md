# Currículo — Wilker Quirino

Arquivos para gerar e manter o CV.

## RenderCV (recomendado)

[RenderCV](https://rendercv.com/) gera PDF com tipografia profissional a partir de YAML.

**Fonte:** [`Wilker_Quirino_CV.yaml`](./Wilker_Quirino_CV.yaml)

### Pré-requisito

```bash
pip install "rendercv[full]"   # Python 3.12+
# ou: uv tool install "rendercv[full]"
```

### Gerar PDF

```bash
cd docs/cv
rendercv render Wilker_Quirino_CV.yaml
```

Saída em `rendercv_output/` (PDF, PNG, HTML, Markdown).

### Editar

1. Abra `Wilker_Quirino_CV.yaml` no VS Code (autocomplete com extensão YAML).
2. Ajuste experiência, projetos ou skills.
3. Rode `rendercv render` de novo.

Tema atual: `engineeringresumes` · locale: `portuguese`.

Outros temas: `classic`, `moderncv`, `sb2nov` — altere em `design.theme` no YAML.

## HTML legado (alternativa)

- [`wilker-quirino.html`](./wilker-quirino.html) — layout simples estilo Word
- `node ../../scripts/generate-cv-pdf.mjs` — exporta via Chrome headless
