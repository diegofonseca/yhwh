# yhwh

> *"O SENHOR te abençoe e te guarde."* — Números 6:24

Uma biblioteca JavaScript (e CLI) minúscula e sem dependências que imprime **um versículo aleatório do livro de Salmos** seguido de **"Deus abençoe você!"** — em 36 idiomas, escolhido por você ou detectado automaticamente.

```
$ npx yhwh --lang pt
“O SENHOR é meu pastor, nada me faltará.”
— Salmos 23:1 (Bíblia Livre)

Deus abençoe você!
```

## Instalação

```sh
npm install yhwh
```

Requer Node.js ≥ 18.17. Funciona também em navegadores modernos, Deno e Bun.

## Uso

```js
import { bless, getVerse, blessing } from 'yhwh';

console.log(await bless());               // idioma detectado
console.log(await bless({ lang: 'pt' })); // português

const versiculo = await getVerse({ lang: 'pt-BR' });
console.log(versiculo.text, versiculo.reference, versiculo.blessing);

blessing('es'); // '¡Dios te bendiga!'
```

### Linha de comando

```sh
npx yhwh                # idioma detectado do sistema
npx yhwh --lang pt      # escolher idioma
npx yhwh --offline      # sem internet: versículo embutido
npx yhwh --list         # listar idiomas
```

Todas as opções estão documentadas no [README em inglês](../README.md#api).

## De onde vêm os versículos?

Do **[getBible.net](https://getbible.net)** — API aberta e gratuita, sem chave, sem cadastro e sem rastreamento. Usamos apenas traduções em **domínio público** ou com licença que **permite distribuição livre** (em português: **Bíblia Livre**, CC BY 3.0 BR). Um versículo por idioma (Salmos 23:1) vem embutido no pacote para funcionar offline.

## Segurança

Zero dependências, nenhum script de instalação, nenhuma telemetria, uma única requisição HTTPS (só quando você chama a função), texto remoto sanitizado (remove sequências de escape de terminal, caracteres bidi e HTML). Veja [SECURITY.md](../SECURITY.md).

## Licença

[MIT](../LICENSE).
