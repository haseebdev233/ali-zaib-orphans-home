# Ali Zaib Orphan Home

The public website and staff admin panel share the existing Firebase Realtime Database.

## Run locally

```powershell
npm ci
npm run dev
```

Open the development address printed by Vite. The staff sign-in is at `/admin`.

## Enable the admin panel on the live site

1. In the `ali-zaib-orphans-home` Firebase project, enable **Email/Password** under **Authentication → Sign-in method**.
2. Create the staff user under **Authentication → Users** and copy their UID.
3. In the same project's **Realtime Database → Data**, add `adminUids/<UID>` with the Boolean value `true`. Remove that entry to revoke access.
4. From the project folder, publish the database rules with `firebase deploy --only database --project ali-zaib-orphans-home`. Build the website with `npm run build` and publish `dist` through your existing host. For Firebase Hosting, deploy the rules and the built site together with `firebase deploy --only database,hosting --project ali-zaib-orphans-home`.
5. Sign in at `/admin`. Choose a page, edit its content or upload an image, and select **Publish changes**. The homepage and gallery support adding, reordering, and removing images. Bank and JazzCash details are maintained under **Donation** and shared by the homepage, Donate, and Support Us.

The inbox shows existing and new donations, volunteer applications, campus ambassador applications, and newsletter signups. Staff can change review status and download proof attached through the new donation form. Donors receive an acknowledgement after Firebase saves their details. Staff verify the transfer against their bank records. Contact uses direct call, email, and map links.

## Test with an isolated Firebase project

Install the Firebase CLI and a Java runtime supported by the Firebase Emulator Suite. Start the emulators in one terminal.

```powershell
firebase emulators:start --only auth,database --project demo-ali-zaib
```

In another terminal, start Vite in emulator mode.

```powershell
$env:VITE_FIREBASE_EMULATORS = 'true'
npm run dev
```

Open the Emulator UI at `http://127.0.0.1:4000` and repeat the staff user and UID setup there. Use test data in these forms. The emulator mode uses a demo project and skips EmailJS notifications.
