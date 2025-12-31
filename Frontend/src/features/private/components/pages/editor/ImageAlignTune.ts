export default class ImageAlignTune {
    private block: any;
    private data: { align: 'left' | 'center' | 'right' };
    private wrapper!: HTMLElement;

    static get isTune() {
        return true;
    }

    constructor({ block, data }: any) {
        this.block = block;
        this.data = data || { align: 'center' };
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('image-align-tune');

        // LABEL
        const label = document.createElement('div');
        label.className = 'image-align-label';
        label.innerText = 'Alineación';
        this.wrapper.appendChild(label);

        // CONTENEDOR DE BOTONES
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'image-align-buttons';

        const icons: Record<'left' | 'center' | 'right', string> = {
            left: `
                <svg viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm0 5h12v2H3V9zm0 5h18v2H3v-2zm0 5h12v2H3v-2z"/>
                </svg>
            `,
            center: `
                <svg viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm3 5h12v2H6V9zm-3 5h18v2H3v-2zm3 5h12v2H6v-2z"/>
                </svg>
            `,
            right: `
                <svg viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm6 5h12v2H9V9zm-6 5h18v2H3v-2zm6 5h12v2H9v-2z"/>
                </svg>
            `,
        };

        (['left', 'center', 'right'] as const).forEach(align => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'cdx-settings-button';
            button.innerHTML = icons[align];

            if (this.data.align === align) {
                button.classList.add('cdx-settings-button--active');
            }

            button.onclick = () => {
                this.data.align = align;
                this.apply();

                buttonsWrapper
                    .querySelectorAll('.cdx-settings-button')
                    .forEach(btn => btn.classList.remove('cdx-settings-button--active'));
                button.classList.add('cdx-settings-button--active');
            };

            buttonsWrapper.appendChild(button);
        });

        this.wrapper.appendChild(buttonsWrapper);

        return this.wrapper;
    }

    apply() {
        const holder: HTMLElement = this.block.holder;
        if (!holder) return;

        holder.dataset.align = this.data.align;

        const inner = holder.querySelector('.image-inner') as HTMLElement;
        if (!inner) return;

        // reset
        inner.style.marginLeft = '';
        inner.style.marginRight = '';

        switch (this.data.align) {
            case 'left':
                inner.style.marginRight = 'auto';
                inner.style.marginLeft = '0';
                break;

            case 'right':
                inner.style.marginLeft = 'auto';
                inner.style.marginRight = '0';
                break;

            case 'center':
            default:
                inner.style.marginInline = 'auto';
                break;
        }
    }


    save() {
        return this.data;
    }
}
