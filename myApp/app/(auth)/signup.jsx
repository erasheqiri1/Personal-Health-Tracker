// import { FontAwesome5 } from '@expo/vector-icons';
// import { Stack, router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Animated,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../../firebaseConfig';
// import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../../constants';
// import AnimatedButton from '../../components/AnimatedButton';


// function Dropdown({ placeholder, value, onChange, options, style }) {
//   const [open, setOpen] = useState(false);

//   const selectedLabel =
//     options.find((o) => o.value === value)?.label || '';

//   return (
//     <View style={style}>
//       <TouchableOpacity
//         style={[s.input, s.dropInput]}
//         onPress={() => setOpen((prev) => !prev)}
//         activeOpacity={0.8}
//       >
//         <Text
//           style={value ? s.dropText : s.dropPlaceholder}
//           numberOfLines={1}
//         >
//           {value ? selectedLabel : placeholder}
//         </Text>
//         <FontAwesome5
//           name={open ? 'chevron-up' : 'chevron-down'}
//           size={14}
//           color={COLORS.green}
//         />
//       </TouchableOpacity>

//       {open && (
//         <View style={s.dropList}>
//           <ScrollView style={{ maxHeight: 180 }}>
//             {options.map((opt) => (
//               <TouchableOpacity
//                 key={opt.value}
//                 style={s.dropItem}
//                 onPress={() => {
//                   onChange(opt.value);
//                   setOpen(false);
//                 }}
//                 activeOpacity={0.8}
//               >
//                 <Text style={s.dropItemText}>{opt.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// }

// export default function Signup() {
//   const params = useLocalSearchParams();

//   const [fromSocial, setFromSocial] = useState(false);

//   const [firstName, setFirstName] = useState('');
//   const [lastName,  setLastName]  = useState('');
//   const [email,     setEmail]     = useState('');
//   const [password,  setPassword]  = useState('');
//   const [gender,    setGender]    = useState('');
//   const [weight,    setWeight]    = useState('');
//   const [height,    setHeight]    = useState('');
//   const [agreed,    setAgreed]    = useState(false);

//   const [loading,   setLoading]   = useState(false);
//   const [error,     setError]     = useState('');
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;


//  const genderOptions = [
//     { label: 'Mashkull', value: 'male' },
//     { label: 'Femër', value: 'female' },
//   ];

//   const weightOptions = Array.from({ length: 171 }, (_, i) => 30 + i).map(
//     (w) => ({ label: `${w} kg`, value: String(w) })
//   );
//   const heightOptions = Array.from({ length: 101 }, (_, i) => 130 + i).map(
//     (h) => ({ label: `${h} cm`, value: String(h) })
//   );

//   useEffect(() => {
//     if (params.mode === 'social') {
//       setFromSocial(true);
//       if (params.firstName) setFirstName(String(params.firstName));
//       if (params.lastName)  setLastName(String(params.lastName));
//       if (params.email)     setEmail(String(params.email));
//     }
//   }, [params]);

//   const validateInputs = () => {
//     setError('');

//     if (!firstName || !lastName || !email) {
//       setError('Ju lutem plotësoni emrin, mbiemrin dhe email-in.');
//       return false;
//     }

//     if (!emailRegex.test(email.trim())) {
//       setError('Email nuk është në format të vlefshëm.');
//       return false;
//     }

//     if (!fromSocial) {
//       if (!password) {
//         setError('Ju lutem vendosni fjalëkalimin.');
//         return false;
//       }
//       if (password.length < 6) {
//         setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
//         return false;
//       }
//     }

//     if (!gender) {
//       setError('Ju lutem zgjidhni gjininë.');
//       return false;
//     }

//     if (!agreed) {
//       setError('Duhet të pranoni Termat dhe Kushtet.');
//       return false;
//     }

//     return true;
//   };

//   const handleSignup = async () => {
//     if (!validateInputs()) return;
//     setLoading(true);

//     try {
//       const parsedWeight = weight
//         ? Number(String(weight).replace(',', '.'))
//         : null;
//       const parsedHeight = height
//         ? Number(String(height).replace(',', '.'))
//         : null;

//       let userAccount = null;

//       if (fromSocial) {
//         userAccount = auth.currentUser;
//         if (!userAccount) {
//           setError('Nuk ka përdorues të kyçur.');
//           setLoading(false);
//           return;
//         }

//         await updateProfile(userAccount, {
//           displayName: `${firstName} ${lastName}`,
//         });
//       } else {
//         const cred = await createUserWithEmailAndPassword(
//           auth,
//           email.trim(),
//           password
//         );

//         userAccount = cred.user;

//         await updateProfile(userAccount, {
//           displayName: `${firstName} ${lastName}`,
//         });
//       }

//       await setDoc(doc(db, 'users', userAccount.uid), {
//         firstName,
//         lastName,
//         email: email.trim(),
//         gender,
//         weight: parsedWeight,
//         height: parsedHeight,
//         photo: null,
//         profileCompleted: true,
//       });

//       router.replace('/(tabs)/dashboard');
//     } catch (e) {
//       console.log('Firebase signup error:', e);

//       if (e.code === 'auth/email-already-in-use') {
//         setError('Ky email është tashmë i regjistruar.');
//       } else if (e.code === 'auth/invalid-email') {
//         setError('Email i pavlefshëm.');
//       } else if (e.code === 'auth/weak-password') {
//         setError('Fjalëkalimi është shumë i dobët.');
//       } else {
//         setError(e.message || 'Diçka shkoi keq gjatë regjistrimit.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ScrollView
//         contentContainerStyle={s.scrollWrap}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Stack.Screen options={{ headerShown: false }} />

//         <Animated.View style={[s.wrap, { opacity: fadeAnim }]}>
//           <View style={s.brand}>
//           <View style={s.runCircle}>
//             <FontAwesome5 name="running" size={56} color="#FFFFFF" />
//           </View>
//           <Text style={s.brandTitle}>PERSONAL HEALTH TRACKER</Text>
//         </View>

//         <Text style={s.h1}>REGJISTROHU</Text>

//         <TextInput
//           placeholder="Emri"
//           style={s.input}
//           value={firstName}
//           onChangeText={setFirstName}
//         />
//         <TextInput
//           placeholder="Mbiemri"
//           style={s.input}
//           value={lastName}
//           onChangeText={setLastName}
//         />
//         <TextInput
//           placeholder="Email"
//           style={s.input}
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           editable={!fromSocial}
//         />
//         {!fromSocial && (
//           <TextInput
//             placeholder="Fjalëkalimi"
//             style={s.input}
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         )}

//         <Dropdown
//           placeholder="Gjinia"
//           value={gender}
//           onChange={setGender}
//           options={genderOptions}
//           style={{ marginBottom: 12 }}
//         />

//         <View style={s.row}>
//           <Dropdown
//             placeholder="Pesha (kg)"
//             value={weight}
//             onChange={setWeight}
//             options={weightOptions}
//             style={[s.col, { marginRight: 8 }]}
//           />

//           <Dropdown
//             placeholder="Gjatësia (cm)"
//             value={height}
//             onChange={setHeight}
//             options={heightOptions}
//             style={[s.col, { marginLeft: 8 }]}
//           />
//         </View>

//         <Pressable
//           style={s.checkboxRow}
//           onPress={() => setAgreed(!agreed)}
//         >
//           <View style={[s.checkbox, agreed && s.checkboxOn]}>
//             {agreed ? <Text style={s.checkmark}>✓</Text> : null}
//           </View>
//           <Text style={s.checkboxTxt}>
//             I agree with Terms and Conditions
//           </Text>
//         </Pressable>

//         {error ? <Text style={s.error}>{error}</Text> : null}

//         <AnimatedButton
//           onPress={handleSignup}
//           disabled={loading}
//           style={s.primary}
//         >
//           <Text style={s.primaryTxt}>
//             {loading ? 'Duke u regjistruar...' : 'RUAJ'}
//           </Text>
//         </AnimatedButton>

//         <View style={s.loginRow}>
//           <Text style={s.loginTxt}>Tashmë keni një llogari? </Text>
//           <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
//             <Text style={s.loginLink}>Hyr</Text>
//           </TouchableOpacity>
//         </View>
//         </Animated.View>
//       </ScrollView>
//     </>
//   );
// }

// const s = StyleSheet.create({
//   scrollWrap: {
//     flexGrow: 1,
//   },
//   wrap: {
//     justifyContent: 'center',
//     padding: SPACING.xl,
//     backgroundColor: COLORS.bg,
//   },
//   brand: {
//     alignItems: 'center',
//     marginBottom: SPACING.xxl,
//   },
//   runCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: COLORS.green,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: SPACING.xs,
//   },
//   brandTitle: {
//     marginTop: SPACING.sm,
//     fontSize: FONT_SIZES.lg,
//     fontWeight: FONT_WEIGHTS.extraBold,
//     color: COLORS.green,
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//   },
//   h1: {
//     fontSize: FONT_SIZES.xxxl,
//     color: COLORS.green,
//     fontWeight: FONT_WEIGHTS.extraBold,
//     marginBottom: SPACING.lg,
//   },
//   input: {
//     backgroundColor: COLORS.inputBg,
//     borderRadius: BORDER_RADIUS.md,
//     paddingHorizontal: SPACING.md,
//     paddingVertical: SPACING.md,
//     marginBottom: SPACING.md,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   row: {
//     flexDirection: 'row',
//     marginBottom: SPACING.md,
//   },
//   col: {
//     flex: 1,
//   },

//   dropInput: {
//     justifyContent: 'space-between',
//   },
//   dropText: {
//     color: COLORS.textDark,
//     flex: 1,
//     marginRight: SPACING.sm,
//   },
//   dropPlaceholder: {
//     color: COLORS.placeholder,
//     flex: 1,
//     marginRight: SPACING.sm,
//   },
//   dropList: {
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.md,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     marginTop: SPACING.xs,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   dropItem: {
//     paddingVertical: SPACING.sm,
//     paddingHorizontal: SPACING.md,
//   },
//   dropItemText: {
//     fontSize: FONT_SIZES.sm,
//     color: COLORS.textDark,
//   },

//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: SPACING.md,
//   },
//   checkbox: {
//     width: 22,
//     height: 22,
//     borderRadius: BORDER_RADIUS.sm,
//     borderWidth: 1.5,
//     borderColor: COLORS.green,
//     backgroundColor: COLORS.inputBg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: SPACING.sm,
//   },
//   checkboxOn: {
//     backgroundColor: COLORS.green,
//   },
//   checkmark: {
//     color: COLORS.white,
//     fontWeight: FONT_WEIGHTS.extraBold,
//     lineHeight: 18,
//   },
//   checkboxTxt: {
//     color: COLORS.green,
//     fontWeight: FONT_WEIGHTS.medium,
//   },
//   error: {
//     color: COLORS.error,
//     marginBottom: SPACING.sm,
//     fontSize: FONT_SIZES.sm,
//     fontWeight: FONT_WEIGHTS.medium,
//   },
//   primary: {
//     backgroundColor: COLORS.green,
//     padding: SPACING.md,
//     borderRadius: BORDER_RADIUS.md,
//     alignItems: 'center',
//   },
//   primaryTxt: {
//     color: COLORS.white,
//     fontWeight: FONT_WEIGHTS.bold,
//     letterSpacing: 1,
//   },
//   loginRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: SPACING.lg,
//   },
//   loginTxt: {
//     color: COLORS.placeholder,
//   },
//   loginLink: {
//     color: COLORS.green,
//     fontWeight: FONT_WEIGHTS.extraBold,
//   },
// });

import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../../constants';
import AnimatedButton from '../../components/AnimatedButton';

function Dropdown({ placeholder, value, onChange, options, style }) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  return (
    <View style={style}>
      <TouchableOpacity
        style={[s.input, s.dropInput]}
        onPress={() => setOpen((prev) => !prev)}
        activeOpacity={0.8}
      >
        <Text style={value ? s.dropText : s.dropPlaceholder} numberOfLines={1}>
          {value ? selectedLabel : placeholder}
        </Text>
        <FontAwesome5
          name={open ? 'chevron-up' : 'chevron-down'}
          size={14}
          color={COLORS.green}
        />
      </TouchableOpacity>

      {open && (
        <View style={s.dropList}>
          <ScrollView style={{ maxHeight: 180 }} keyboardShouldPersistTaps="handled">
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={s.dropItem}
                onPress={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={s.dropItemText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default function Signup() {
  const params = useLocalSearchParams();

  const [fromSocial, setFromSocial] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [agreed, setAgreed] = useState(false);

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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  const genderOptions = [
    { label: 'Mashkull', value: 'male' },
    { label: 'Femër', value: 'female' },
  ];

  const weightOptions = Array.from({ length: 171 }, (_, i) => 30 + i).map((w) => ({
    label: `${w} kg`,
    value: String(w),
  }));

  const heightOptions = Array.from({ length: 101 }, (_, i) => 130 + i).map((h) => ({
    label: `${h} cm`,
    value: String(h),
  }));

  useEffect(() => {
    if (params.mode === 'social') {
      setFromSocial(true);
      if (params.firstName) setFirstName(String(params.firstName));
      if (params.lastName) setLastName(String(params.lastName));
      if (params.email) setEmail(String(params.email));
    }
  }, [params]);

  const validateInputs = () => {
    setError('');

    if (!firstName || !lastName || !email) {
      setError('Ju lutem plotësoni emrin, mbiemrin dhe email-in.');
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      setError('Email nuk është në format të vlefshëm.');
      return false;
    }

    if (!fromSocial) {
      if (!password) {
        setError('Ju lutem vendosni fjalëkalimin.');
        return false;
      }
      if (password.length < 6) {
        setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
        return false;
      }
    }

    if (!gender) {
      setError('Ju lutem zgjidhni gjininë.');
      return false;
    }

    if (!agreed) {
      setError('Duhet të pranoni Termat dhe Kushtet.');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;
    setLoading(true);

    try {
      const parsedWeight = weight ? Number(String(weight).replace(',', '.')) : null;
      const parsedHeight = height ? Number(String(height).replace(',', '.')) : null;

      let userAccount = null;

      if (fromSocial) {
        userAccount = auth.currentUser;
        if (!userAccount) {
          setError('Nuk ka përdorues të kyçur.');
          setLoading(false);
          return;
        }

        await updateProfile(userAccount, {
          displayName: `${firstName} ${lastName}`,
        });
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        userAccount = cred.user;

        await updateProfile(userAccount, {
          displayName: `${firstName} ${lastName}`,
        });
      }

      await setDoc(doc(db, 'users', userAccount.uid), {
        firstName,
        lastName,
        email: email.trim(),
        gender,
        weight: parsedWeight,
        height: parsedHeight,
        photo: null,
        profileCompleted: true,
      });

      router.replace('/(tabs)/dashboard');
    } catch (e) {
      console.log('Firebase signup error:', e);

      if (e.code === 'auth/email-already-in-use') {
        setError('Ky email është tashmë i regjistruar.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Email i pavlefshëm.');
      } else if (e.code === 'auth/weak-password') {
        setError('Fjalëkalimi është shumë i dobët.');
      } else {
        setError(e.message || 'Diçka shkoi keq gjatë regjistrimit.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={s.scrollWrap}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen options={{ headerShown: false }} />

        <Animated.View style={[s.wrap, { opacity: fadeAnim }]}>
          <View style={s.brand}>
            <View style={s.runCircle}>
              <FontAwesome5 name="running" size={56} color="#FFFFFF" />
            </View>
            <Text style={s.brandTitle}>PERSONAL HEALTH TRACKER</Text>
          </View>

          <Text style={s.h1}>REGJISTROHU</Text>

          <TextInput
            placeholder="Emri"
            placeholderTextColor={COLORS.placeholder}
            style={s.input}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Mbiemri"
            placeholderTextColor={COLORS.placeholder}
            style={s.input}
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.placeholder}
            style={s.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!fromSocial}
          />

          {!fromSocial && (
            <TextInput
              placeholder="Fjalëkalimi"
              placeholderTextColor={COLORS.placeholder}
              style={s.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          )}

          <Dropdown
            placeholder="Gjinia"
            value={gender}
            onChange={setGender}
            options={genderOptions}
            style={{ marginBottom: 12 }}
          />

          <View style={s.row}>
            <Dropdown
              placeholder="Pesha (kg)"
              value={weight}
              onChange={setWeight}
              options={weightOptions}
              style={[s.col, { marginRight: 8 }]}
            />

            <Dropdown
              placeholder="Gjatësia (cm)"
              value={height}
              onChange={setHeight}
              options={heightOptions}
              style={[s.col, { marginLeft: 8 }]}
            />
          </View>

          <Pressable style={s.checkboxRow} onPress={() => setAgreed(!agreed)}>
            <View style={[s.checkbox, agreed && s.checkboxOn]}>
              {agreed ? <Text style={s.checkmark}>✓</Text> : null}
            </View>
            <Text style={s.checkboxTxt}>I agree with Terms and Conditions</Text>
          </Pressable>

          {error ? <Text style={s.error}>{error}</Text> : null}

          <AnimatedButton onPress={handleSignup} disabled={loading} style={s.primary}>
            <Text style={s.primaryTxt}>{loading ? 'Duke u regjistruar...' : 'RUAJ'}</Text>
          </AnimatedButton>

          <View style={s.loginRow}>
            <Text style={s.loginTxt}>Tashmë keni një llogari? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={s.loginLink}>Hyr</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  scrollWrap: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
    paddingVertical: SPACING.xl, // ✅ e barazon nalt/posht
  },

  wrap: {
    flex: 1, // ✅ e bën me u qendru ma mirë në ekran
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl, // ✅ distancë e njëjtë nalt/posht brenda wrap
    backgroundColor: COLORS.bg,
  },

  brand: {
    alignItems: 'center',
    marginBottom: SPACING.xl, // ✅ pak ma pak se xxl që mos i shtyn elementet nalt/posht pa nevojë
  },

  runCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm, // ✅ distancë e qartë poshtë ikonës
  },

  brandTitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.extraBold,
    color: COLORS.green,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  h1: {
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.green,
    fontWeight: FONT_WEIGHTS.extraBold,
    marginBottom: SPACING.lg,
  },

  input: {
    backgroundColor: COLORS.inputBg,
    color: COLORS.textDark, // ✅ tekst i input-it (kur shkruan)
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  row: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  col: {
    flex: 1,
  },

  dropInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropText: {
    color: COLORS.textDark,
    flex: 1,
    marginRight: SPACING.sm,
  },
  dropPlaceholder: {
    color: COLORS.placeholder,
    flex: 1,
    marginRight: SPACING.sm,
  },

  dropList: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.xs,
    overflow: 'hidden',
    elevation: 3,
  },
  dropItem: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  dropItemText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textDark,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1.5,
    borderColor: COLORS.green,
    backgroundColor: COLORS.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  checkboxOn: {
    backgroundColor: COLORS.green,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.extraBold,
    lineHeight: 18,
  },
  checkboxTxt: {
    color: COLORS.green,
    fontWeight: FONT_WEIGHTS.medium,
  },

  error: {
    color: COLORS.error,
    marginBottom: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },

  primary: {
    backgroundColor: COLORS.green,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  primaryTxt: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 1,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  loginTxt: {
    color: COLORS.placeholder,
  },
  loginLink: {
    color: COLORS.green,
    fontWeight: FONT_WEIGHTS.extraBold,
  },
});