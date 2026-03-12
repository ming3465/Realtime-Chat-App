import { Router } from "express";
import { z } from "zod";
import {
  toUserProfileResponse,
  UserProfile,
  UserProfileResponse,
} from "../modules/users/user.types.js";
import { getAuth } from "@clerk/express";
import { UnauthorizedError } from "../lib/errors.js";
import {
  getUserFromClerk,
  updateUserProfile,
} from "../modules/users/user.service.js";

export const userRouter = Router();

// user update schema

const UserProfileUpdateSchema = z.object({
  displayName: z.string().trim().max(50).optional(),
  handle: z.string().trim().max(30).optional(),
  bio: z.string().trim().max(500).optional(),
  avatarUrl: z.url("Avatar must be valid url").optional(),
});

function toResponse(profile: UserProfile): UserProfileResponse {
  return toUserProfileResponse(profile);
}

// get -> /api/me

userRouter.get("/", async (req, res, next) => {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      throw new UnauthorizedError("Unauthorized");
    }
    console.log("Auth UserID:", auth.userId); // LOG 1


    const profile = await getUserFromClerk(auth.userId);
    console.log("Profile Data:", profile); // LOG 2
    const response = toResponse(profile);

    res.json({ data: response });
  } catch (err) {
    console.error("FULL ERROR TRACE:", err); // THIS WILL SHOW THE REAL CULPRIT
    next(err);
  }
});

// patch -> /api/me

userRouter.patch("/", async (req, res, next) => {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      throw new UnauthorizedError("Unauthorized");
    }

    const parsedBody = UserProfileUpdateSchema.parse(req.body);

    const displayName =
      parsedBody.displayName && parsedBody.displayName.trim().length > 0
        ? parsedBody.displayName.trim()
        : undefined;

    const handle =
      parsedBody.handle && parsedBody.handle.trim().length > 0
        ? parsedBody.handle.trim()
        : undefined;

    const bio =
      parsedBody.bio && parsedBody.bio.trim().length > 0
        ? parsedBody.bio.trim()
        : undefined;

    const avatarUrl =
      parsedBody.avatarUrl && parsedBody.avatarUrl.trim().length > 0
        ? parsedBody.avatarUrl.trim()
        : undefined;

    try {
      const profile = await updateUserProfile({
        clerkUserId: auth.userId,
        displayName,
        handle,
        bio,
        avatarUrl,
      });

      const response = toResponse(profile);

      res.json({ data: response });
    } catch (e) {
      throw e;
    }
  } catch (err) {
    next(err);
  }
});
