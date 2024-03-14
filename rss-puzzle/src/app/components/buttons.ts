const saveUserCredentials = () => {
  const loginForm = document.getElementById('form');
  loginForm?.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const userFirstName: HTMLInputElement | null = loginForm.querySelector('[name = "firstName"]');
    const userSurName: HTMLInputElement | null = document.querySelector('.last-name');
    const user = {
      firstName: userFirstName?.value,
      surName: userSurName?.value
    };
    const userStr: string = JSON.stringify(user);
    localStorage.setItem('rss-puzle', userStr);
  });
};

export default saveUserCredentials;
