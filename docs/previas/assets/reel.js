const dialog = document.querySelector('#reel');
const video = dialog.querySelector('video');
for (const trigger of document.querySelectorAll('[data-reel]')) {
  trigger.addEventListener('click', () => {
    dialog.showModal();
    video.play().catch(() => {});
  });
}
dialog.addEventListener('close', () => video.pause());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
