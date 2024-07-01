export let selectedOption: HTMLElement;
export const onDropdown = (toggle: string, menu: string) => {
  const toggleButton = document.querySelector(toggle) as HTMLElement; // Явно указываем тип как HTMLElement
  const dropdownMenu = document.querySelector(menu) as HTMLElement; // Явно указываем тип как HTMLElement

  toggleButton.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  dropdownMenu.addEventListener('click', (event) => {
    if (event.target && (event.target as HTMLLIElement).tagName === 'LI') {
      selectedOption = event.target as HTMLLIElement;
      toggleButton.textContent = (event.target as HTMLLIElement).textContent;
      dropdownMenu.style.display = 'none';
    }
  });
};
