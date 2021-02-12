export interface SessionStore {
    create(userId: string): Promise<string>
    find(token: string): Promise<string | null>
    delete(token: string): Promise<{ message: string }>
}
