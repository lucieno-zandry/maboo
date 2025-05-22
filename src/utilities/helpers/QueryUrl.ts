const URL_HOST = "http://localhost:5173";

class QueryUrl {
  private url: URL;
  private isValid: boolean = false;
  private isRelative: boolean = false;

  constructor(url: string) {
    let Url = null;

    // Check if this is a relative URL starting with /
    if (url.startsWith('/')) {
      this.isRelative = true;
      url = url.substring(1); // Remove the leading slash
    }

    this.checkValidity(url);

    Url = new URL(this.isValid ? url : URL_HOST + (this.isRelative ? '/' : '') + url);
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
    if (this.isValid) {
      return this.url.href;
    } else if (this.isRelative) {
      // For relative URLs, keep the leading slash
      return '/' + this.url.href.slice(URL_HOST.length + 1);
    } else {
      // For other URLs, remove the host
      return this.url.href.slice(URL_HOST.length);
    }
  }

  get(key: string): string | null {
    const params = this.url.searchParams;
    return params.get(key);
  }
}

export default QueryUrl;
