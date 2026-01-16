# 📝 Editor de Texto com Histórico Temporal

Este projeto consiste em um editor de texto em JavaScript que permite registrar, desfazer, refazer e reproduzir o histórico de edição respeitando o tempo real entre as teclas digitadas.

O sistema utiliza pilhas encadeadas (**LinkedStack**) para gerenciar os estados do texto, aplicando conceitos clássicos de Estrutura de Dados e padrões de projeto.

---

## 📌 Funcionalidades

* **✍️ Edição de texto:** Captura em tempo real.
* **↩️ Desfazer (Undo):** Reverte para o estado anterior.
* **↪️ Refazer (Redo):** Avança para o próximo estado.
* **💾 Backup:** Criação e recuperação de pontos de estado específicos.
* **🧹 Limpeza:** Limpa o editor e o histórico atual.
* **🎬 Reprodução (Replay):** Reproduz o histórico respeitando o intervalo exato entre as digitações.
* **⏱️ Cronometragem:** Cálculo da duração total da edição.
* **🔔 Notificações:** Avisos visuais utilizando **Bootstrap Toast**.

---

## 🧠 Conceitos Utilizados

* **Pilha (Stack) Encadeada:** Estrutura base para o histórico.
* **Padrão Memento:** Para gestão do histórico de estados.
* **Manipulação do DOM:** Interação com elementos HTML.
* **Eventos:** Escuta de `input` e `click`.
* **Controle de Tempo:** Uso de `Date.now()` e `setTimeout`.
* **POO:** Programação Orientada a Objetos para modularização.

---

## 🗂️ Estrutura do Projeto

```text
/
├── index.html          # Interface do usuário
├── historico.js        # Lógica principal do editor
├── LinkedStack.js      # Implementação da pilha encadeada
├── img/                # Assets e imagens
└── README.md           # Documentação

```
---

## ⚙️ Estrutura do Histórico

Cada estado salvo no histórico é representado por um objeto que mapeia o conteúdo e o tempo da ação:

```json
{
  "texto": "conteúdo do editor",
  "tempo": 1700000000000,
  "delta": 120
}
```
Essa estrutura possibilita:

* **Replay fiel:** Reprodução da digitação no ritmo original.
* **Métricas precisas:** Cálculo da duração total da edição através da soma dos deltas.

---

### ▶️ Como Executar

1.  **Clone ou baixe** os arquivos do projeto.
2.  **Abra o arquivo `index.html`** em um navegador moderno.
3.  **⚠️ Nota Importante:** O projeto utiliza **ES Modules** (`import`/`export`), o que exige que os arquivos sejam servidos via protocolo **HTTP**. Utilize uma destas opções:
    * Extensão **Live Server** no VS Code.
    * Comando `npx serve` na raiz do projeto.
    * Qualquer servidor local de sua preferência.

---

### 📏 Duração Total do Histórico

Ao acionar a função **“Mostrar histórico”**, o editor executa as seguintes etapas:

* **Reprodução:** O texto é reconstruído caractere por caractere (ou estado por estado) respeitando o tempo original.
* **Notificação:** Ao final, o sistema exibe um alerta (*Toast*) com o tempo total gasto na edição, calculado pela soma dos intervalos entre as interações.

---

### 🚀 Possíveis Melhorias Futuras

- [ ] **Controles de Vídeo:** Adicionar botões de Play, Pause e ajuste de Velocidade.
- [ ] **Feedback Visual:** Implementar uma barra de progresso para o replay.
- [ ] **Portabilidade:** Exportação do histórico completo em formato JSON.
- [ ] **Otimização:** Agrupamento inteligente de digitação rápida (*Debounce*) para evitar pilhas excessivamente grandes.
- [ ] **Data Viz:** Gráficos mostrando os picos de velocidade de digitação do usuário.

---

### 📚 Objetivo Educacional

Este repositório é um excelente recurso para quem deseja aprofundar conhecimentos em:

* **Estruturas de Dados:** Implementação e uso prático de **Pilhas (Stacks)**.
* **JavaScript Avançado:** Manipulação de eventos e assincronismo (`Promises`/`Timeouts`).
* **UX/UI:** Análise de interação do usuário e feedback em tempo real.

TESTE
