import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

// Static prerendering on the server, hydration on the client — both driven by
// the same route table.
export const createRoot = ViteReactSSG({ routes });
