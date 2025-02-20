import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import Logo from "./logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
//import SocialSignInButtons from "../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useSignInEmailPassword } from '@nhost/react'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@vt\.edu$/;


const SignInScreen = () => {
  const navigation = useNavigation();
  //const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm();

  const { signInEmailPassword, isLoading} =useSignInEmailPassword();

  const onSignInPressed = async (data) => {
    if (isLoading) {
      return;
    }

    const { email, password} = data;

    const { error, needsEmailVerification} = await signInEmailPassword(email, password);

    if(error) {
      Alert.alert('Oops', error.message);
    }

    if(needsEmailVerification) {
      Alert.alert('Verify your email', "Check your email and follow the linkf");
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("NotFound");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp")
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode="cover" />
      <View style={styles.container}>
        <CustomInput
          name="email"
          placeholder="VT Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters long",
            },
          }}
        />
        <CustomButton
          text={isLoading ? "Loading..." : "Sign In"}
          onPress={handleSubmit(onSignInPressed)}
        />
        
        <CustomButton
          text="Don't have an account? Sign up"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    minHeight: "100%",
    
  },
  container: {
    padding: 20,
  
  },
  logo: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginTop: 100,
  },
});

export default SignInScreen;
