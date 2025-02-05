import { htmlElOrNull } from '../types/types';

export let selectedOption: HTMLElement;
export const onDropdown = (toggle: string, menu: string) => {
  const toggleButton: htmlElOrNull = document.querySelector(toggle);
  const dropdownMenu: htmlElOrNull = document.querySelector(menu);

  if (toggleButton && dropdownMenu) {
    toggleButton.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    if (dropdownMenu) {
      dropdownMenu.addEventListener('click', (event) => {
        if (event.target && (event.target as HTMLLIElement).tagName === 'LI') {
          selectedOption = event.target as HTMLLIElement;
          toggleButton.textContent = (event.target as HTMLLIElement).textContent;
          dropdownMenu.style.display = 'none';
        }
      });
    }
  }
};
