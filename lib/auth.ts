import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return bcrypt.compare(password, hashedPassword);
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(
  userId: string,
  name: string,
  email: string,
) {
  return await new SignJWT({ userId, name, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      userId: payload.userId as string,
      name: payload.name as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}
