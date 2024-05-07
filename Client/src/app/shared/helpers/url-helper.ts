export class UrlHelper {
  static lastPathname(url :string) {
    if (url[url.length - 1] === '/') {
      url = url.slice(0, url.length - 1);
    }
    const lastSlashIndex = url.lastIndexOf('/');
    return url.slice(lastSlashIndex + 1, url.length);
  }
}
