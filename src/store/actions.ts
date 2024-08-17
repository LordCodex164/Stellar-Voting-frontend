

export const registerWallet = (publicKey:string, privateKey:string, pinCode:string) => ({
    type: 'REGISTER_WALLET',
    payload: {publicKey, privateKey, pinCode },
});


export const registerWalletRequest = ({publicKey, privateKey, pinCode}: {publicKey:string, privateKey:string, pinCode:string}) => ({ type: 'REGISTER_WALLET_REQUEST',  payload: {publicKey, privateKey, pinCode}});
export const registerWalletSuccess = ({keyId, publicKey, privateKey, pinCode}: {keyId:any, publicKey:string, privateKey:string, pinCode:string}) => ({ type: 'REGISTER_WALLET_SUCCESS', payload: {keyId, publicKey, privateKey, pinCode}});
export const registerWalletFailure = ({error}: {error: any}) => ({ type: 'REGISTER_WALLET_FAILURE', payload: {error}});

export const confirmPinCodeRequest = () => ({ type: 'CONFIRM_PIN_CODE_REQUEST'});
export const confirmPinCodeSuccess = ({account}: {account:any}) => ({ type: 'CONFIRM_PIN_CODE_SUCCESS', payload: {account}});
export const confirmPinCodeFailure = ({error}: {error: any}) => ({ type: 'CONFIRM_PIN_CODE_FAILURE', payload: {error}});


