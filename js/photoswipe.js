    import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

    const lightbox = new PhotoSwipeLightbox({
        gallery: '#my-gallery',
        children: '.pswp-link',
        pswpModule: () => import('https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.esm.js'),
    });

    // 背景色を更新する関数（エラー防止のチェック付き）
    const updateBgColor = () => {
        // lightbox.pswp が存在し、かつ現在のスライドが存在するか確認
        if (lightbox.pswp && lightbox.pswp.currSlide) {
            const currSlideData = lightbox.pswp.currSlide.data;
            const bgColor = currSlideData.element.getAttribute('data-background') || '#000';
            document.documentElement.style.setProperty('--pswp-bg-color', bgColor);
        }
    };

    // イベントのタイミングを微調整
    // beforeOpen ではなく、開き始めた直後の 'openingAnimationStart' を使うとより安定します
    lightbox.on('openingAnimationStart', updateBgColor);
    lightbox.on('change', updateBgColor);

    lightbox.init();