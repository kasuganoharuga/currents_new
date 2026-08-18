import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

import { getPool } from "@/db/pool";
import { sendVerificationOtpEmail } from "@/lib/email/ses";

export const auth = betterAuth({
  database: getPool(),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await sendVerificationOtpEmail({ to: email, otp });
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        async after(user) {
          await getPool().query(
            `insert into user_profiles (user_id, avatar_url, luma_email)
             values ($1, $2, $3)
             on conflict (user_id) do nothing`,
            [user.id, user.image ?? null, user.email],
          );
        },
      },
    },
  },
});
