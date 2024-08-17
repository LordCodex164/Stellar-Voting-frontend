import { registerHelper, confirmPinCode } from "../helpers/setupKeyManager";
// reducers.js
export const initialState = {
    keyId: "",
    publicKey: '',
    privateKey: "",
    pinCode: "",
    devInfo: null,
    error: ""
};

//we use our keymanager to store our key, password and encrypter name

const walletReducer = (state = initialState, action:any) => {
    console.log("state>>", state)
    console.log("action>>", action)
    switch (action.type) {

        //REGISTER_WALLET case
        case "REGISTER_WALLET_REQUEST":
         return {
            ...state,
         }

        case 'REGISTER_WALLET_SUCCESS':
            return {
                ...state,
                keyId: action.payload.keyId,
                privateKey: action.payload.privateKey,
                publicKey: action.payload.publicKey,
                pinCode: action.payload.pinCode
            };

            case 'REGISTER_WALLET_FAILURE':
                return {
                    ...state,   
                    error: action.payload.error
                    };

        // create a confirmPinCode case
        case 'CONFIRM_PIN_CODE_REQUEST':
        return state;

        case 'CONFIRM_PIN_CODE_SUCCESS':
            return {
                ...state,
                devInfo: action.payload.account
            }

        case 'CONFIRM_PIN_CODE_FAILURE':
            return {
                ...state,
                 error: action.payload.error
                }
        default:
            return state;
    }
};

export default walletReducer;
