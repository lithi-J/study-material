import bcryptjs from "bcryptjs";
import { getDataSource } from "@/lib/typeorm";
import { User } from "@/backend/entities/User";

/**
 * Register a new user in the database
 */
export async function signUpUser(email: string, password: string, name: string) {
  try {
    const dataSource = await getDataSource();
    const userRepo = dataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return { user: null, error: "User with this email already exists" };
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(password, salt);

    // Create the user
    // Note: Our entity currently doesn't have a password column! We need to add it.
    // Wait, let's ensure the entity handles this.
    const user = userRepo.create({
      email,
      name,
      password: passwordHash, // We'll need to update the User entity to include password
    });

    await userRepo.save(user);

    return { user, error: null };
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    return { user: null, error: error.message };
  }
}

/**
 * Log in an existing user
 */
export async function signInUser(email: string, password: string) {
  try {
    const dataSource = await getDataSource();
    const userRepo = dataSource.getRepository(User);

    // Find user
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return { user: null, error: "Invalid email or password" };
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return { user: null, error: "Invalid email or password" };
    }

    return { user, error: null };
  } catch (error: any) {
    console.error("Error signing in:", error.message);
    return { user: null, error: error.message };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    const dataSource = await getDataSource();
    const userRepo = dataSource.getRepository(User);
    
    const user = await userRepo.findOne({ where: { id } });
    return { user, error: null };
  } catch (error: any) {
    console.error("Error getting user by id:", error.message);
    return { user: null, error: error.message };
  }
}

/**
 * Get user by Email
 */
export async function getUserByEmail(email: string) {
  try {
    const dataSource = await getDataSource();
    const userRepo = dataSource.getRepository(User);
    
    const user = await userRepo.findOne({ where: { email } });
    return { user, error: null };
  } catch (error: any) {
    console.error("Error getting user by email:", error.message);
    return { user: null, error: error.message };
  }
}
