abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  id: string;

  constructor(id: string) {
    this.container = document.body;
    this.id = id;
  }

  render() {
    return this.container;
  }
}

export default Page;
