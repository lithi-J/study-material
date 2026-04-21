import bcryptjs from "bcryptjs";

// This is a mocked database layer using an in-memory array.
// In a real application, replace these functions with your database ORM calls (e.g., Prisma, Mongoose, Firebase).

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

// In-memory store
const usersStore: User[] = [];

/**
 * Find a user by their email address
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const user = usersStore.find((u) => u.email === email);
  return user || null;
}

/**
 * Create a new user in the database
 */
export async function createUser(data: { name: string; email: string; passwordHash: string }): Promise<User> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    name: data.name,
    email: data.email,
    passwordHash: data.passwordHash,
    createdAt: new Date().toISOString(),
  };
  
  usersStore.push(newUser);
  return newUser;
}

/**
 * Compare a plain text password with a hashed password
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

/**
 * Hash a plain text password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}
