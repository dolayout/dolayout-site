# Deploy Dolayout

Site estatico da Dolayout preparado para GitHub + Cloudflare Pages.

## Dominio

```txt
dolayout.co
```

## Build local

```bash
npm run build
```

Saida:

```txt
dist/site
```

## Cloudflare Pages

No painel da Cloudflare:

1. Acesse `Workers & Pages`.
2. Crie um projeto em `Pages`.
3. Conecte o repositorio `dolayout/dolayout-site`.
4. Use as configuracoes:

```txt
Framework preset: None
Build command: npm run build
Build output directory: dist/site
Root directory: /
```

5. Depois do primeiro deploy, adicione o dominio customizado:

```txt
dolayout.co
www.dolayout.co
```

Como o dominio foi contratado na Cloudflare, o DNS normalmente e configurado automaticamente pelo Pages. Se pedir registro manual, use o CNAME indicado pelo proprio painel do Cloudflare Pages.

## GitHub Pages

O workflow em `.github/workflows/pages.yml` permanece como fallback, mas a publicacao principal recomendada agora e Cloudflare Pages.
