import { z } from 'zod';

/**
 * Schéma de validation des variables d'environnement
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_BASE_URL: z.string().url("L'URL de base de l'application doit être une URL valide"),
});

/**
 * Type des variables d'environnement validées
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Fonction qui valide les variables d'environnement au démarrage de l'application
 */
const validateEnv = (): Env => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(issue => `- ${issue.path.join('.')}: ${issue.message}`);
      throw new Error(
        `❌ Variables d'environnement invalides:\n${missingVars.join('\n')}\n\nVérifiez votre fichier .env`
      );
    }
    throw error;
  }
};

export { validateEnv };
