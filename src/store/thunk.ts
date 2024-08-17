//thunk actions

import { registerHelper } from "../helpers/setupKeyManager";
import { registerWalletFailure, registerWalletRequest, registerWalletSuccess, confirmPinCodeRequest, confirmPinCodeSuccess, confirmPinCodeFailure } from "./actions";
import { confirmPinCode } from "../helpers/setupKeyManager";

export const registerWalletThunk = (publicKey:string, privateKey:string, pinCode:string): any => {
    return async (dispatch:any) => {
      dispatch(registerWalletRequest({publicKey, privateKey, pinCode}));
      try {
        const keyMetaData = await registerHelper(publicKey, privateKey, pinCode);
        dispatch(registerWalletSuccess({keyId: keyMetaData?.keyId, publicKey, privateKey, pinCode}));
      } catch (error:any) {
        dispatch(registerWalletFailure(error));
      }
    };
  };


  export const confirmPinCodeThunk = (pinCode:string, keyId:string):any => {
    console.log("trigeered>>>")
    console.log("pin", pinCode)
    console.log(keyId, "<<<keyId")
    return async (dispatch:any) => {
        dispatch(confirmPinCodeRequest());
        try {
            const account = await confirmPinCode(pinCode, keyId)
            console.log(account, "account<<<")
            dispatch(confirmPinCodeSuccess({account}))
            return account
        } catch (error:any) {
            console.log(error)
            dispatch(confirmPinCodeFailure({error}))
        }
    }
  }