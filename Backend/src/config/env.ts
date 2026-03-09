import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
    PORT: z.string().default('5000'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.string().default('8000'),
    DB_NAME: z.string().default('realtime_chat_and_threads_app'),
    DB_USER: z.string().default('MikasaN'),
    DB_PASSWORD: z.string().default('ming3465')
});
const parsed = envSchema.safeParse(process.env);
// console.log(typeof process.env.HOME);
// console.log(parsed);
// console.log(parsed.data);
// console.log(parsed.success);
if (!parsed.success){
    process.exit(1);
}
export const env = parsed.data; 