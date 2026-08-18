import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({
  region: process.env.AWS_REGION ?? "ap-southeast-2",
});

function fromAddress(): string {
  const from = process.env.SES_FROM_EMAIL;

  if (!from) {
    throw new Error("SES_FROM_EMAIL is required");
  }

  return from;
}

export async function sendVerificationOtpEmail({
  to,
  otp,
}: {
  to: string;
  otp: string;
}): Promise<void> {
  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: fromAddress(),
      Destination: { ToAddresses: [to] },
      Content: {
        Simple: {
          Subject: { Data: "Your Currents sign-in code" },
          Body: {
            Text: {
              Data: `Your Currents sign-in code is ${otp}. It expires in 5 minutes.`,
            },
          },
        },
      },
    }),
  );
}
