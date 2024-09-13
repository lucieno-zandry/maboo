const URL_HOST = "http://localhost:5173";

class QueryUrl {
  private url: URL;
  private isValid: boolean = false;

  constructor(url: string) {
    let Url = null;

    this.checkValidity(url);

    Url = new URL(this.isValid ? url : URL_HOST + url);
    this.url = Url;
  }

  private checkValidity(url: string) {
    if (url.includes("http://") || url.includes("https://")) {
      this.isValid = true;
    }

    return this;
  }

  hasParams(): boolean {
    return !!this.url.href.includes("?");
  }

  addParam(key: string, value: string | number): QueryUrl {
    let url = this.url.href;

    if (this.hasParams()) {
      url += `&`;
    } else {
      url += "?";
    }

    url += `${key}=${value}`;

    this.url = new URL(url);

    return this;
  }

  getString(): string {
    return this.isValid ? this.url.href : this.url.href.slice(URL_HOST.length);
  }

  get(key: string): string | null {
    const params = this.url.searchParams;
    return params.get(key);
  }
}

export default QueryUrl;
