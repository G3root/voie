import { eq, and } from "drizzle-orm";
import type { Adapter, AdapterAccount } from "next-auth/adapters";
import { db } from "./db";
import { users, accounts, sessions, verificationTokens } from "../schema";

export function DrizzleAdapter(): Adapter {
  return {
    createUser(data) {
      return db
        .insert(users)
        .values({ ...data, id: crypto.randomUUID() })
        .returning()
        .get();
    },
    async getUser(data) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, data))
        .get();
      return user ?? null;
    },
    async getUserByEmail(data) {
      return (
        (await db.select().from(users).where(eq(users.email, data)).get()) ??
        null
      );
    },
    createSession(data) {
      return db.insert(sessions).values(data).returning().get();
    },
    async getSessionAndUser(data) {
      return (
        (await db
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, data))
          .innerJoin(users, eq(users.id, sessions.userId))
          .get()) ?? null
      );
    },
    updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      return db
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .get();
    },
    updateSession(data) {
      return db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .get();
    },
    async linkAccount(rawAccount) {
      const updatedAccount = await db
        .insert(accounts)
        .values(rawAccount)
        .returning()
        .get();

      const account: AdapterAccount = {
        ...updatedAccount,
        type: updatedAccount.type,
        access_token: updatedAccount.access_token ?? undefined,
        token_type: updatedAccount.token_type ?? undefined,
        id_token: updatedAccount.id_token ?? undefined,
        refresh_token: updatedAccount.refresh_token ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expires_at ?? undefined,
        session_state: updatedAccount.session_state ?? undefined,
      };

      return account;
    },
    async getUserByAccount(account) {
      const results = await db
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, account.provider),
            eq(accounts.providerAccountId, account.providerAccountId)
          )
        )
        .get();

      return results?.user ?? null;
    },
    deleteSession(sessionToken) {
      return (
        db
          .delete(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .returning()
          .get() ?? null
      );
    },
    createVerificationToken(token) {
      return db.insert(verificationTokens).values(token).returning().get();
    },
    async useVerificationToken(token) {
      try {
        return (
          (await db
            .delete(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token)
              )
            )
            .returning()
            .get()) ?? null
        );
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    deleteUser(id) {
      return db.delete(users).where(eq(users.id, id)).returning().get();
    },
    unlinkAccount(account) {
      db.delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .run();

      return undefined;
    },
  };
}
