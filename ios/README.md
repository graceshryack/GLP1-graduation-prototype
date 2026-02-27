# Run the app on your phone

The same Xcode project runs in the **simulator** or on your **physical iPhone**. Use the steps below to put the app on your phone.

---

## 1. Open the project in Xcode

- In **Finder**, go to **`GLP1 transition/ios/App`** and double‑click **`App.xcworkspace`** (not `App.xcodeproj`).
- Or in Xcode: **File → Open**, go to `ios/App`, select **App.xcworkspace**, and click Open.

Opening the workspace ensures the scheme and project resolve correctly so the build succeeds.

---

## 2. Run on your iPhone

1. **Connect your iPhone** to your Mac with a USB cable (or use same Wi‑Fi if you’ve set that up in Xcode).
2. **Unlock your iPhone** and, if asked, tap **Trust** and enter your passcode.
3. In Xcode, click the **device menu** at the top (it might say “iPhone 16” or another simulator name).
4. In the list, under **“My Mac”** or **“iOS Device”**, select **your iPhone** (e.g. “Grace’s iPhone”).
5. Press **Run** (⌘R) or click the **Run** button.

Xcode will build the app and install it on your phone. The first time you do this, you may need to complete step 3 (signing) below.

---

## 3. Signing (first time only)

When you first run on a real device, Xcode may say you need a “development team”:

1. In the left sidebar, click the blue **App** project icon.
2. Select the **App** target (under TARGETS).
3. Open the **Signing & Capabilities** tab.
4. Under **Team**, choose your **Apple ID**:
   - Click the **Team** dropdown → **Add an Account…**
   - Sign in with your Apple ID (the same one you use for the App Store).
   - After it’s added, pick that account in the **Team** dropdown.
5. If you see “Untrusted Developer”, go to the next section.

---

## 4. Trust the app on your iPhone (first time only)

The first time you run an app from Xcode on your phone, iOS may block it until you trust the developer:

1. On your **iPhone**, open **Settings**.
2. Go to **General → VPN & Device Management** (or **General → Device Management**).
3. Under **Developer App**, tap your **Apple ID**.
4. Tap **Trust “Your Apple ID”** and confirm.

Then open the **Signos GLP-1** app from your home screen. It should launch normally.

---

## Simulator (no phone needed)

To run on a simulated iPhone instead:

- In the device menu at the top of Xcode, choose an **iPhone** simulator (e.g. **iPhone 16**).
- Press **Run** (⌘R).

---

## What the app is

The app runs from a **bundled copy** of the Signos GLP-1 Transition web app. You do **not** need to run Terminal or `npm run dev`.

The bundled web app runs **offline** from the **public** folder in the app (no server or npm needed). If you see a white screen, do **Product → Clean Build Folder** (⇧⌘K), then run again. Ensure the **public** folder is in the App target under **Copy Bundle Resources** (Project → App → Build Phases).
