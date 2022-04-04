/**
 * Just for simplicity:
 * holds the token simply as a variable...
 */
class AuthTokenHolder {
    constructor(private token: string | null = null) {}

    getToken() {
        return this.token;
    }

    setToken(token: AuthTokenHolder["token"]) {
        this.token = token;
    }
}

export const appTokenHolder = new AuthTokenHolder();
