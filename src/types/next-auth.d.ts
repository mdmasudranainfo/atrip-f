import { Session as DefaultSession, User as DefaultUser } from "next-auth";

// Define the User interface that extends the default user
export interface User extends DefaultUser {
  token?: string | null;  // Custom token field (you can also store other custom properties)
  id?: string;  // You can add more custom fields if necessary
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  display_name?: string;
  need_update_pw?: number;
  role?: string;
  countryCode?: string;
}

// Augment next-auth types
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;   // Add the accessToken to the session interface
    user: User;  // Attach the extended User interface (with the token and custom properties)
  }
}
