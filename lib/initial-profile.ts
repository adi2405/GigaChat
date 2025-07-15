import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";
import { NextResponse } from "next/server";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const firstName = user.firstName ?? "";
  const lastName = user.lastName ?? "";
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: fullName,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
