export function handleReviewTabs() {
    if (window.innerWidth < 1440) return;

    const tabs = document.querySelectorAll('.reviews__tab');
    const items = document.querySelectorAll('.reviews__item');

    if (tabs.length === 0 || items.length === 0) return;

    items.forEach((item, index) => {
        item.style.display = index === 0 ? 'block' : 'none';
    });
  
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
        const reviewId = tab.dataset.review;
      
        items.forEach(item => {
            item.style.display = item.dataset.review === reviewId ? 'block' : 'none';
        });
      
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        });
    });
}