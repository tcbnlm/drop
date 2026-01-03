import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#my-gallery',
    children: '.pswp-link',
		pswpModule: () => import('https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.esm.js'),
		
		showAnimationDuration: 300, // 開く時の時間（ミリ秒）
    hideAnimationDuration: 300, // 閉じる時の時間（ミリ秒）
    zoom: false,                // ズームアニメーションをオフにする
    returnFocus: false,         // 閉じた後に元の画像にフォーカスを戻さない（これもしばしば挙動を邪魔します）
});

// 背景色を更新する処理を関数化
const updateColor = (pswpInstance) => {
    // オプショナルチェーン（?.）を使って、データが存在する時だけ処理する
    const bgColor = pswpInstance?.currSlide?.data?.element?.getAttribute('data-background') || '#000';
    document.documentElement.style.setProperty('--pswp-bg-color', bgColor);
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

lightbox.init();