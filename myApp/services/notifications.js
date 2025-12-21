
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const KEY_ENABLED = "water_reminder_enabled";
const KEY_ID = "water_reminder_id";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function ensureNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function configureAndroidChannel() {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("reminders", {
    name: "Reminders",
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: "default",
  });
}

export async function scheduleHourlyWaterReminder() {
  const ok = await ensureNotificationPermissions();
  if (!ok) return { ok: false, reason: "no_permission" };

  await configureAndroidChannel();

  // Fshi çdo schedule të vjetër (me qenë i pastër)
  const oldId = await AsyncStorage.getItem(KEY_ID);
  if (oldId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(oldId);
    } catch {}
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Kujtesë 💧",
      body: "Mos harroni të pini ujë",
      sound: "default",
    },
 
    trigger: {
      seconds: 3600,
      repeats: true,
      channelId: Platform.OS === "android" ? "reminders" : undefined,
    },
  });

  await AsyncStorage.setItem(KEY_ENABLED, "true");
  await AsyncStorage.setItem(KEY_ID, id);

  return { ok: true, id };
}

export async function cancelHourlyWaterReminder() {
  const id = await AsyncStorage.getItem(KEY_ID);
  if (id) {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
    } catch {}
  }

  await AsyncStorage.setItem(KEY_ENABLED, "false");
  await AsyncStorage.removeItem(KEY_ID);

  return { ok: true };
}

export async function getWaterReminderState() {
  const enabled = (await AsyncStorage.getItem(KEY_ENABLED)) === "true";
  return enabled;
}
