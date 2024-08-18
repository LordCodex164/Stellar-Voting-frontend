import { KeyManagerPlugins, KeyType } from "@stellar/wallet-sdk";
import { setupKeyManager } from "../lib/setupManager";
import { fundWithFriendbot } from "../lib/stellar";

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


export {
    registerHelper,
    confirmPinCode
}