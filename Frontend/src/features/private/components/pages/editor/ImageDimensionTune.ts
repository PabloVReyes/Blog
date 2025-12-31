export default class ImageDimensionTune {
    static get isTune() {
        return true;
    }

    private data: any;
    private block: any;

    constructor({ data, block }: any) {
        this.data = data || {};
        this.block = block;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-dimension-tune';

        const label = document.createElement('div');
        label.className = 'image-dimension-tune__label';
        label.innerText = 'Tamaño de la imagen';

        const row = document.createElement('div');
        row.className = 'image-dimension-tune__row';

        const widthInput = document.createElement('input');
        widthInput.type = 'text';
        widthInput.placeholder = 'Ancho (10px, 50%, auto...)';
        widthInput.value = this.data.width ?? '';

        const heightInput = document.createElement('input');
        heightInput.type = 'text';
        heightInput.placeholder = 'Alto (10px, 50%, auto...)';
        heightInput.value = this.data.height ?? '';

        widthInput.oninput = () => {
            this.data.width = widthInput.value;
            this.applyStyles();
            this.block.dispatchChange();
        };

        heightInput.oninput = () => {
            this.data.height = heightInput.value;
            this.applyStyles();
            this.block.dispatchChange();
        };

        row.appendChild(widthInput);
        row.appendChild(heightInput);

        wrapper.appendChild(label);
        wrapper.appendChild(row);

        setTimeout(() => this.applyStyles(), 50);

        return wrapper;
    }

    applyStyles() {
        const holder = this.block.holder;
        if (!holder) return;

        // SELECTOR CORRECTO DEL IMAGE TOOL
        const img = holder.querySelector(
            '.image-tool__image-picture'
        ) as HTMLImageElement;

        const figure = holder.querySelector(
            '.image-tool__image'
        ) as HTMLElement;

        if (!img || !figure) return;

        if (this.data.width) {
            figure.style.width = this.data.width;
            img.style.width = '100%';
        }

        if (this.data.height) {
            img.style.height = this.data.height;
        }
    }

    save() {
        return this.data;
    }
}
