# Dindin

Aplicativo financeiro local-first do Dolayout, ainda em etapa de preparação para lançamento.

## Dados e privacidade

- Não há conta, cadastro ou envio dos lançamentos para a Dolayout.
- Lançamentos e categorias são guardados no armazenamento local do navegador.
- A tela **Seus dados** permite baixar e restaurar uma cópia JSON e apagar os dados deste aparelho.
- A cópia JSON desta etapa não é criptografada; guarde-a em um local protegido.
- O backup do Google Drive usa a permissão restrita `drive.file` e grava um arquivo JSON na conta Google do próprio usuário. Os dados financeiros não passam pela Dolayout.
- O Dindin usa o modelo OAuth de código. Uma função da Dolayout troca o código de autorização e devolve um token ao navegador, sem guardar códigos, tokens ou lançamentos. Os registros são enviados do navegador diretamente ao Drive. O token fica apenas em memória durante a sessão; para sincronizar novamente depois de fechar o app, o usuário precisa reconectar.
- O arquivo de backup no Drive não é criptografado pelo Dindin; ele fica sujeito à segurança da conta Google do usuário.
- Fotos selecionadas são usadas apenas como referência temporária no navegador; o app ainda não faz OCR.
- Arquivos Excel (`.xlsx`/`.xls`) e CSV são analisados localmente no navegador. O app só grava os registros depois que a pessoa confere e confirma a prévia.
- Planilhas de despesas mensais importam valores consolidados por categoria e mês; elas não contêm o detalhe de cada compra. As categorias sugeridas podem ser ajustadas nos lançamentos.

## O que ainda falta antes de usar com dados reais

- OCR local para recibos; escrita à mão pode exigir revisão e ter precisão limitada.
- Ativar Google Drive API no projeto Google Cloud, declarar o escopo `https://www.googleapis.com/auth/drive.file` em **Acesso a dados**, cadastrar `https://dolayout.co` como URI de redirecionamento e incluir a conta de teste em **Público-alvo** enquanto o consentimento estiver em modo de teste.
- Configurar `GOOGLE_OAUTH_CLIENT_SECRET` como variável secreta do ambiente de produção do Cloudflare Pages. Nunca coloque esse segredo no código do navegador nem o envie pelo chat.
- Testar o backup e a restauração no domínio publicado e em outro aparelho. O navegador aberto como `file://` não é uma origem válida para OAuth.
- Revisão adicional de armazenamento local, acessibilidade e uso em navegadores móveis.

Abra `index.html` para revisar a interface. Para instalar como PWA, o app precisa estar publicado em HTTPS.

O leitor de planilhas usa SheetJS Community Edition, distribuído junto com o app em `vendor/` para funcionar sem enviar arquivos a serviços externos. Consulte `vendor/SHEETJS-LICENSE.txt`.
