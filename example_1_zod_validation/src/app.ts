import { z } from 'zod';

// Definiere ein Schema für die Benutzerdaten
const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    age: z.number().min(18, "Must be at least 18 years old"),
});

const validateUserData = (data: unknown) => {
    try {
        // Validierung der Daten gegen das Schema
        const validatedData = userSchema.parse(data);
        console.log("Valid user data:", validatedData);
    } catch (error) {
        // Fehlerbehandlung bei ungültigen Daten
        if (error instanceof z.ZodError) {
            console.error("Validation failed:", error.errors);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
};

// Beispiel für gültige Benutzerdaten
validateUserData({ username: "Alice", email: "alice@example.com", age: 25 });

// Beispiel für ungültige Benutzerdaten
validateUserData({ username: "", email: "invalid-email", age: 17 });