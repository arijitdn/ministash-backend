import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000).optional(),
  JWT_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += issue.path[0] + "\n";
    });

    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.log(error);
  }
}

export default EnvSchema.parse(process.env);
