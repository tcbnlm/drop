  import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

  const lightbox = new PhotoSwipeLightbox({
    gallery: '#my-gallery', // ギャラリーを囲むID名
    children: '.pswp-link', // クリックさせるaタグのクラス名
    pswpModule: () => import('https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.esm.js'),
  });

  // 画像ごとに背景色を変えるための魔法（ベタ塗り対応）
  const updateBgColor = () => {
    const currSlide = lightbox.pswp.currSlide.data;
    const bgColor = currSlide.element.getAttribute('data-background') || '#000';
    document.documentElement.style.setProperty('--pswp-bg-color', bgColor);
  };

  lightbox.on('beforeOpen', updateBgColor);
  lightbox.on('change', updateBgColor);
  
  lightbox.init();