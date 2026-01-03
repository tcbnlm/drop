import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#my-gallery',
    children: '.pswp-link',
    pswpModule: () => import('https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.esm.js'),

    // --- 挙動のカスタマイズ ---
    showAnimationDuration: 300,
    hideAnimationDuration: 300,
    showHideAnimationType: 'fade',
    zoom: false,
    returnFocus: false,

    // --- ×ボタンを消して、画像クリックで閉じる設定 ---
    closeSVG: '<svg></svg>',
    imageClickAction: 'close',
    tapAction: 'close',
    bgClickAction: 'close',
});

// 【追加】画像サイズを自動取得して「潰れ」を防止する設定
lightbox.addFilter('domItemData', (itemData, element) => {
    const img = element.querySelector('img');
    if (img) {
        // 画像本来のサイズ（naturalWidth/Height）をセットする
        itemData.width = img.naturalWidth;
        itemData.height = img.naturalHeight;
    }
    return itemData;
});

// 背景色を更新する処理を関数化
const updateColor = (pswpInstance) => {
    const bgColor = pswpInstance?.currSlide?.data?.element?.getAttribute('data-background') || '#000';
    document.documentElement.style.setProperty('--pswp-bg-color', bgColor);
    
    const pswpBg = document.querySelector('.pswp__bg');
    if (pswpBg) {
        pswpBg.style.backgroundColor = bgColor;
        pswpBg.style.opacity = '1';
    }
};

lightbox.on('afterInit', () => {
    const pswp = lightbox.pswp;
    updateColor(pswp);
    pswp.on('change', () => {
        updateColor(pswp);
    });
});

lightbox.init();