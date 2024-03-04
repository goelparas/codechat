


export class StorageService {

    private static instance: StorageService;
    static getInstance(): StorageService {
        if (!this.instance) {
            this.instance = new StorageService();

        }
        return this.instance;

    }
    setLocalStorgaevlaue(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    getLocalStorageValue(key: string): string | null {

        return localStorage.getItem(key)
    }
    // session storage . 


}

export const storageService = StorageService.getInstance();
