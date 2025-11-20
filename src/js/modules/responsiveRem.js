// responsiveRem.js
export class ResponsiveRem {
    constructor(options = {}) {
        this.options = {
            designWidth: 1920,
            minWidth: 320,
            maxWidth: 1920,
            baseFontSize: 16,
            minFontSize: 16,
            maxFontSize: 80,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.setRemUnit();
        this.bindEvents();
    }
    
    setRemUnit() {
        const html = document.documentElement;
        const windowWidth = html.clientWidth;
        const {
            designWidth,
            minWidth,
            maxWidth,
            baseFontSize,
            minFontSize,
            maxFontSize
        } = this.options;
        
        // Ограничиваем ширину окна
        const clampedWidth = Math.max(minWidth, Math.min(windowWidth, maxWidth));
        
        // Расчет размера шрифта
        let fontSize = (clampedWidth / designWidth) * baseFontSize;
        
        // Ограничиваем размер шрифта
        fontSize = Math.max(minFontSize, Math.min(fontSize, maxFontSize));
        
        html.style.fontSize = fontSize + 'px';
        
        console.log(`Responsive rem: ${fontSize}px (window: ${windowWidth}px)`);
    }
    
    bindEvents() {
        window.addEventListener('resize', this.debounce(() => {
            this.setRemUnit();
        }, 250));
        
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.setRemUnit(), 100);
        });
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Метод для обновления настроек
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.setRemUnit();
    }
    
    // Метод для уничтожения (очистки событий)
    destroy() {
        window.removeEventListener('resize', this.debounce);
        document.documentElement.style.fontSize = '';
    }
}