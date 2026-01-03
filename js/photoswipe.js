import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#my-gallery',
    children: '.pswp-link',
    pswpModule: () => import('https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.esm.js'),

    // --- 挙動のカスタマイズ ---
    showAnimationDuration: 300,
    hideAnimationDuration: 300,
    showHideAnimationType: 'fade', // ズームせずにふわっと開閉する
    zoom: false,
    returnFocus: false,

    // --- ×ボタンを消して、画像クリックで閉じる設定 ---
    closeSVG: '<svg></svg>',       // ボタンのアイコンを空にする（物理的に見えなくする）
    imageClickAction: 'close',     // 画像をクリックしたら閉じる
    tapAction: 'close',            // スマホでタップしたら閉じる
    bgClickAction: 'close',        // 背景をクリックしたら閉じる
});

// 背景色を更新する処理を関数化
const updateColor = (pswpInstance) => {
    // オプショナルチェーン（?.）を使って、データが存在する時だけ処理する
    const bgColor = pswpInstance?.currSlide?.data?.element?.getAttribute('data-background') || '#000';
    
    // CSS変数へ送る
    document.documentElement.style.setProperty('--pswp-bg-color', bgColor);
    
    // 【念のため】背景要素へ直接も反映（キャッシュ対策）
    const pswpBg = document.querySelector('.pswp__bg');
    if (pswpBg) {
        pswpBg.style.backgroundColor = bgColor;
        pswpBg.style.opacity = '1';
    }
};

// 画面が完全に準備できた後にイベントを設定する
lightbox.on('afterInit', () => {
    const pswp = lightbox.pswp;
    
    // 1枚目を開いた時の色
    updateColor(pswp);

    // 画像を切り替えた時の色
    pswp.on('change', () => {
        updateColor(pswp);
    });
});

lightbox.init();import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

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