export default class Tag {
  tag: string;

  className: string;

  content?: string | null;

  placeholder?: string;

  required?: boolean;

  type?: string;

  id?: string;

  disabled?: boolean;

  constructor(
    tag: string,
    className: string,
    content?: string | null,
    placeholder?: string,
    required?: boolean,
    type?: string,
    id?: string | undefined,
    disabled?: boolean
  ) {
    this.tag = tag;
    this.className = className;
    this.content = content;
    this.placeholder = placeholder;
    this.required = required;
    this.type = type;
    this.id = id;
    this.disabled = disabled;
  }

  createElem(): HTMLElement {
    const element = document.createElement(this.tag);
    element.className = this.className;
    if (this.content && this.content !== '') {
      element.innerText = this.content;
    }
    if (this.placeholder && this.id !== '') {
      element.setAttribute('placeholder', this.placeholder);
    }
    if (this.required) {
      element.setAttribute('required', '');
    }
    if (this.disabled) {
      element.setAttribute('disabled', 'false');
    }
    if (this.id && this.id !== '') {
      element.setAttribute('id', this.id);
    }
    if (this.type && this.type !== '') {
      element.setAttribute('type', 'text');
    }
    return element;
  }
}
