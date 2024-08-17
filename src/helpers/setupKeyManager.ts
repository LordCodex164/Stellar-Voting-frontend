import { KeyManagerPlugins, KeyType } from "@stellar/wallet-sdk";
import { setupKeyManager } from "../lib/setupManager";
import { useDispatch} from "react-redux";
import { confirmPinCodeFailure, confirmPinCodeSuccess } from "../store/actions";
import { registerWalletFailure, registerWalletSuccess } from "../store/actions";

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
    return {
        keyId: keyMetaData.id
    }
    } catch (error) {
        console.log(error)
        registerWalletFailure({error})
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