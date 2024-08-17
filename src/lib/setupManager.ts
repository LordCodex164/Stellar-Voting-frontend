import { KeyManager, KeyManagerPlugins } from "@stellar/wallet-sdk"


export const setupKeyManager = () => {
    const localKeyStore = new KeyManagerPlugins.LocalStorageKeyStore()
    localKeyStore.configure({
        prefix: 'bpa',
        storage: localStorage,
    })
    const keyManager = new KeyManager({
        keyStore: localKeyStore,
    })
    keyManager.registerEncrypter(KeyManagerPlugins.ScryptEncrypter)

    return keyManager
}


