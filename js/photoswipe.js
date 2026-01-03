import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#my-gallery',
    children: '.pswp-link',
    pswpModule: () => import('https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.esm.js'),
});

// 背景色をセットする専用の関数
const setBgColor = (pswpInstance) => {
    const currSlideElement = pswpInstance.currSlide.data.element;
    if (currSlideElement) {
        const bgColor = currSlideElement.getAttribute('data-background') || '#000';
        document.documentElement.style.setProperty('--pswp-bg-color', bgColor);
    }
};

// 【ここがポイント】
// 画面が初期化された後（afterInit）に実行することで、エラーを回避します
lightbox.on('afterInit', () => {
    const pswp = lightbox.pswp;
    
    // 最初に開いた時の色
    setBgColor(pswp);

    // 画像を切り替えた時の色
    pswp.on('change', () => {
        setBgColor(pswp);
    });
});

lightbox.init();