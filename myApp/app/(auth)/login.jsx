import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../../constants';
import AnimatedButton from '../../components/AnimatedButton';

const ADMIN_EMAIL = 'test1@gmail.com';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const redirectAfterLogin = (user) => {
    const userEmail = (user?.email || '').toLowerCase();
    const adminEmail = ADMIN_EMAIL.toLowerCase();

    if (userEmail === adminEmail) {
    //kur eshte admin
      router.replace('/(admin)/dashboard');
    } else {
      // kur eshte user normal
      router.replace('/(tabs)/dashboard');
    }
  };

    const handleEmailLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Ju lutem shkruani email-in dhe fjalëkalimin.');
      return;
    }

    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = cred.user;
      redirectAfterLogin(user);
    } catch (e) {
      console.log('Login error:', e.code, e.message);

      if (
        e.code === 'auth/user-not-found' ||
        e.code === 'auth/invalid-credential'
      ) {
        setError('Ky përdorues nuk ekziston.');
      } else if (e.code === 'auth/wrong-password') {
        setError('Email ose fjalëkalim i pasaktë.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Email i pavlefshëm.');
      } else {
        setError('Gabim gjatë kyçjes.');
      }
    } finally {
      setLoading(false);
    }
  };

  
  //profileCompleted
  const socialLoginWithProfileCheck = async (provider, providerName) => {
    setError('');

    if (Platform.OS !== 'web') {
      Alert.alert(
        `${providerName} login`,
        `Login me ${providerName} në pajisje mobile nuk është implementuar.`
      );
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists() || snap.data().profileCompleted !== true) {
        const displayName = user.displayName || '';
        const [firstName, ...rest] = displayName.split(' ');
        const lastName = rest.join(' ');

        router.replace({
          pathname: '/(auth)/signup',
          params: {
            mode: 'social',
            firstName: firstName || '',
            lastName: lastName || '',
            email: user.email || '',
          },
        });
      } else {
        // nese ekziston dhe eshte i plotësuar → direkt në app
        redirectAfterLogin(user);
      }
    } catch (e) {
      console.log(`${providerName} login error:`, e);

      if (e.code === 'auth/account-exists-with-different-credential') {
        setError(
          'Ky email është regjistruar me metodë tjetër (p.sh. email/password).'
        );
      } else {
        setError(`Nuk u arrit login me ${providerName}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () =>
    socialLoginWithProfileCheck(new GoogleAuthProvider(), 'Google');

  const handleGitHubLogin = () =>
    socialLoginWithProfileCheck(new GithubAuthProvider(), 'GitHub');

  const handleMicrosoftLogin = () =>
    socialLoginWithProfileCheck(new OAuthProvider('microsoft.com'), 'Microsoft');

  const handleFacebookLogin = () =>
    socialLoginWithProfileCheck(new FacebookAuthProvider(), 'Facebook');


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View style={[s.container, { opacity: fadeAnim }]}>
            <View style={s.logoWrap}>
            <RunIcon />
            <Text style={s.appTitle}>
              PERSONAL{'\n'}HEALTH{'\n'}TRACKER
            </Text>
          </View>

     
          <View style={s.form}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS.placeholder}
              style={s.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />

            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Fjalëkalimi"
                placeholderTextColor={COLORS.placeholder}
                style={[s.input, { paddingRight: 48 }]}
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPass((v) => !v)}
                style={s.eyeBtn}
                hitSlop={8}
              >
                <FontAwesome
                  name={showPass ? 'eye-slash' : 'eye'}
                  size={18}
                  color={COLORS.green}
                />
              </TouchableOpacity>
            </View>

            {error ? <Text style={s.error}>{error}</Text> : null}

            <AnimatedButton
              onPress={handleEmailLogin}
              disabled={loading}
              style={s.primaryBtn}
            >
              <Text style={s.primaryTxt}>
                {loading ? 'Duke u kyçur...' : 'HYR'}
              </Text>
            </AnimatedButton>

            <View style={s.dividerRow}>
              <View style={s.divider} />
              <Text style={s.dividerText}>or continue</Text>
              <View style={s.divider} />
            </View>

            <View style={s.socialRow}>
              <AnimatedButton style={s.socialBtn} onPress={handleGoogleLogin}>
                <Image
                  source={require('../../assets/icons/google.png')}
                  style={{ width: 22, height: 22, resizeMode: 'contain' }}
                />
              </AnimatedButton>

              <AnimatedButton style={s.socialBtn} onPress={handleMicrosoftLogin}>
                <FontAwesome5 name="microsoft" size={20} color="#0078D4" />
              </AnimatedButton>

              <AnimatedButton style={s.socialBtn} onPress={handleGitHubLogin}>
                <FontAwesome5 name="github" size={20} color="#000000" />
              </AnimatedButton>

              <AnimatedButton style={s.socialBtn} onPress={handleFacebookLogin}>
                <FontAwesome5 name="facebook" size={20} color="#1877F2" />
              </AnimatedButton>
            </View>
          </View>

          <Text style={s.footer}>
            S’keni një llogari?{' '}
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={s.footerLink}>Regjistrohu</Text>
            </TouchableOpacity>
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function RunIcon() {
  return (
    <View style={s.runCircle}>
      <FontAwesome5 name="running" size={56} color="#FFFFFF" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  appTitle: {
    textAlign: 'center',
    color: COLORS.textDark,
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.extraBold,
    letterSpacing: 1,
    lineHeight: 28,
    marginTop: SPACING.sm,
  },
  form: {
    width: '100%',
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: FONT_SIZES.md,
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  eyeBtn: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
  },
  error: {
    color: COLORS.error,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: SPACING.sm,
  },
  primaryBtn: {
    backgroundColor: COLORS.green,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryTxt: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.extraBold,
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  dividerText: {
    marginHorizontal: SPACING.sm,
    fontSize: FONT_SIZES.xs,
    color: COLORS.placeholder,
    textTransform: 'uppercase',
    fontWeight: FONT_WEIGHTS.medium,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: SPACING.sm,
    color: COLORS.green,
  },
  footerLink: {
    fontWeight: FONT_WEIGHTS.extraBold,
    textDecorationLine: 'underline',
    color: COLORS.green,
  },
  runCircle: {
    width: 130,
    height: 130,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
