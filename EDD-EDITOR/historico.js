import { LinkedStack } from "./LinkedStack.js";
class Editor {
    constructor(textarea) {
        this.textarea = textarea;
        this.undoStack = new LinkedStack();
        this.redoStack = new LinkedStack();
        this.backupStack = new LinkedStack();
        this.ultimoTempo = Date.now();
        this.init();
    }

    init() {
        this.undoStack.push({
            texto: this.textarea.value,
            tempo: Date.now(),
            delta: 0
        });
        this.textarea.addEventListener('input', () => this.salvar());

        document.querySelector('#desfazer')
            .addEventListener('click', () => this.desfazer());

        document.querySelector('#refazer')
            .addEventListener('click', () => this.refazer());

        document.querySelector('#backup')
            .addEventListener('click', () => this.backup());

        document.querySelector('#recuperar')
            .addEventListener('click', () => this.recuperar());

        document.querySelector('#limpar')
            .addEventListener('click', () => this.limpar());

        document.querySelector('#revisao')
            .addEventListener('click', () => this.exibirHistorico());
    }
    // Salva uma nova "fase" a cada alteração feita no textarea.
    salvar() {
        const content = this.textarea.value;
        const agora = Date.now();
        const delta = agora - this.ultimoTempo;
        this.ultimoTempo = agora;
        const topo = this.undoStack.peek();
        if (topo && topo.texto === content) return;
        this.undoStack.push({
            texto: content,
            tempo: agora,
            delta: delta
        });
        this.redoStack.limpar();
    }
    // "Retorna" uma fase, guarda a fase "descatada" em outra pilha.
    desfazer() {
        if (this.undoStack.size() <= 1) return;
        this.redoStack.push(this.undoStack.pop());
        this.textarea.value = this.undoStack.peek().texto;
    }

    // Utiliza da pilha reserva para realocar a fase descatada na pilha principal.
    refazer() {
        if (this.redoStack.isEmpty()) return;
        const estado = this.redoStack.pop();
        this.undoStack.push(estado);
        this.textarea.value = estado.texto;
    }

    // Guarda a fase atual em um backup.
    backup() {
        if (this.undoStack.isEmpty()) return;
        this.backupStack.push(this.undoStack.peek());
        this.notificar("Backup criado", "success");
    }
    // Utiliza do backup para recuperar informações da fase.
    recuperar() {
        if (this.backupStack.isEmpty()) return;
        const estado = this.backupStack.peek();
        this.undoStack.push(estado);
        this.redoStack.limpar();
        this.textarea.value = estado.texto;
    }
    // Limpa as stacks.
    limpar() {
        this.undoStack.limpar();
        this.redoStack.limpar();
        this.textarea.value = "";
        this.undoStack.push({
            texto: "",
            tempo: Date.now(),
            delta: 0
        });
    }
    // Exibe o historico de digitação, invertendo a stack principal e exibindo-a fase a fase. 
    exibirHistorico() {
        const tempStack = new LinkedStack();
        const fases = [];
        let atraso = 0;
        let total = 0;
        while (!this.undoStack.isEmpty()) {
            tempStack.push(this.undoStack.pop());
        }

        while (!tempStack.isEmpty()) {
            const estado = tempStack.pop();
            this.undoStack.push(estado);
            fases.push(estado);
        }

        fases.forEach((fase) => {
            atraso += fase.delta;
            total += fase.delta;

            setTimeout(() => {
                this.textarea.value = fase.texto;
            }, atraso);
        });

        const segundos = (total / 1000).toFixed(2);
        this.notificar(`Exibindo histórico — duração total: ${segundos}s`, "success");
        total = 0;
    }
    // Notifica as acções realizadas.
    notificar(mensagem, tipo = "dark") {
        const toastEl = document.getElementById('toastEditor');
        const toastMsg = document.getElementById('toastMensagem');

        toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;
        toastMsg.textContent = mensagem;

        const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
            delay: 2000
        });

        toast.show();
    }

}

const textareaEditor = document.querySelector('#textareaEditor');
const editor = new Editor(textareaEditor);
