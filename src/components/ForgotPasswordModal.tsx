import * as _ from 'lodash';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { resetPassword } from '../constants/AuthAPI';
import { Theme } from '../theme';
import EmailEntry from './PasswordReset/EmailEntry';
import NewPasswordEntry from './PasswordReset/NewPasswordEntry';
import VerificationCodeEntry from './PasswordReset/VerificationCodeEntry';

const {width} = Dimensions.get("window");

interface ForgotPasswordModalProps {
    closeModal: () => void;
}

export default function ForgotPasswordModal({closeModal}: ForgotPasswordModalProps) {
    const [verificationStep, setVerificationStep] = useState<boolean>(false);
    const [newPasswordStep, setNewPasswordStep] = useState<boolean>(false);
    const [email, setEmail] = useState<string>();
    const [verificationCode, setVerificationCode] = useState<string>();

    const forgotPasswordRequest = (emailParam?: string, verificationCodeParam?: string, newPasswordParam?: string) => {
        console.log(emailParam, verificationCodeParam, newPasswordParam)
        if(_.isNil(emailParam) && _.isNil(verificationCodeParam) && _.isNil(newPasswordParam)) {
            return;
        } else if (!_.isNil(emailParam) && _.isNil(verificationCodeParam) && _.isNil(newPasswordParam) ) {
            setEmail(emailParam);
            setVerificationStep(!verificationStep);
        } else if (!_.isNil(verificationCodeParam) && _.isNil(emailParam) && _.isNil(newPasswordParam)) {
            setVerificationCode(verificationCodeParam);
            setNewPasswordStep(!newPasswordStep);
            setVerificationStep(!verificationStep);
        } else if(!_.isNil(newPasswordParam) && _.isNil(verificationCodeParam) && _.isNil(emailParam)) {
            if(email && verificationCode){
                resetPassword({ email, verificationCode, newPassword: newPasswordParam });
                closeModal();
            }
        }
    }
    
    return(
                <View style={styles.container}>
                    { newPasswordStep ? <NewPasswordEntry forgotPasswordRequest={forgotPasswordRequest} /> : verificationStep ? <VerificationCodeEntry forgotPasswordRequest={forgotPasswordRequest} /> : <EmailEntry forgotPasswordRequest={forgotPasswordRequest} />  }
                    <View style={styles.cancel}>
                        <TouchableOpacity onPress={closeModal}>
                            <Text style={styles.canelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View> 
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    continueButton: {
        backgroundColor: Theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        height: 37.5,
        width: (width * .90),
        borderRadius: 5,
    },
    continueText: {
        fontWeight: '600',
        fontSize: 16,
        color: Theme.white,
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    canelText: {
        fontSize: 18,
    }
});