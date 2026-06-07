export class GitHubClient {
  constructor(private readonly token: string) {}

  async request<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...init?.headers,
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`GitHub API ${res.status} ${url}: ${body.slice(0, 200)}`);
    }

    return res.json() as Promise<T>;
  }

  async requestOptional<T>(url: string): Promise<T | null> {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`GitHub API ${res.status} ${url}: ${body.slice(0, 200)}`);
    }

    return res.json() as Promise<T>;
  }
}
