import { TaroDocument } from "./dom/document.js";
interface Env {
    window: any;
    document: TaroDocument;
}
declare const env: Env;
export { env as default };
