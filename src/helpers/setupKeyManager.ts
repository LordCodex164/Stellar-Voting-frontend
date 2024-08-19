import {TransactionBuilder} from '@stellar/stellar-sdk'
import { setupKeyManager } from "../lib/setupManager";
import { fundWithFriendbot } from "../lib/stellar";
import { KeyManagerPlugins, KeyType } from '@stellar/wallet-sdk';

const keyManager = setupKeyManager()

const registerHelper = async (publicKey:string, privateKey:string, pinCode:string) => {
    console.log("publicKey", publicKey)
    try {
   const keyMetaData = await keyManager.storeKey({
        key: {
            type: KeyType.plaintextKey,
            publicKey: publicKey,
            privateKey: privateKey
        },
    password: pinCode,
    encrypterName: KeyManagerPlugins.ScryptEncrypter.name,
    })
    await fundWithFriendbot(publicKey)
    return {
        keyId: keyMetaData.id
    }
    } catch (error) {
        console.log(error)
    }
    
    
}


const confirmPinCode = async (pinCode:string, keyId:string) => {
    console.log("pin", pinCode)
    console.log("keyId", keyId)
    try{
     const account = await keyManager.loadKey(keyId, pinCode) 
    return {
        account
    }
    }
    catch(error){
        console.log(error)
        // dispatch(confirmPinCodeFailure({
        //     account: null,
        //     error: "pinCode not correct"
        // }))
    }

}

const sign =  async ({ transactionXDR, network, pinCode, keyId }: {transactionXDR:string, network:string, pinCode:string, keyId:string}) => {
    console.log("transactionXDR", transactionXDR)   
    console.log("network", network)
    console.log("pinCode", pinCode)
    console.log("keyId", keyId)
    try {
        const keyManager = setupKeyManager()
        let signedTransaction = await keyManager.signTransaction({
            // @ts-ignore
            transaction: TransactionBuilder.fromXDR(transactionXDR, network),
            id: keyId,
            password: pinCode,
        })
        return signedTransaction
    } catch (err:any) {
        console.error('Error signing transaction', err?.message || err.response)
        // @ts-ignore
        throw error(400, { message: err.toString() })
    }
}

export {
    registerHelper,
    confirmPinCode,
    sign
}