export default {
  expo: {
    name: "Learn Norwegian",
    slug: "LearnNorwegianApp",
    version: "1.1.0",
    orientation: "portrait",
    icon: "./assets/logo3.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/logo3NoBackground.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.piotrcharkot.LearnNorwegianApp",
      buildNumber: "6"
    },
    android: {
      package: "com.piotrcharkot.LearnNorwegianApp",
      versionCode: "6",
      permissions: [
        "com.android.vending.BILLING"
      ],
      adaptiveIcon: {
        foregroundImage: "./assets/logo3zoomedout.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-secure-store"
    ],
    extra: {
      eas: {
        projectId: "05ce5f16-e014-41bf-af82-3bb5e37d1c23"
      },
      EXPO_PUBLIC_API_KEY_APPLE: process.env.EXPO_PUBLIC_API_KEY_APPLE,
      EXPO_PUBLIC_API_KEY_GOOGLE: process.env.EXPO_PUBLIC_API_KEY_GOOGLE
    }
  }
}
