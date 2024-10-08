export class Slug {
  public readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receive a string and normalized it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  public static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
