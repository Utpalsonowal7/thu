import { useTheme } from  "@/hooks/useTheme"
import { LuSun, LuMoon } from "react-icons/lu";


function ThemeToggle() {
     const { theme, setTheme } = useTheme();
     return (
          <button
               onClick={() => setTheme(theme === "light" ? "dark" : "light")}
               className="cursor-pointer rounded-lg border border-border p-2 text-foreground transition hover:bg-border"
          >
               {" "}
               {theme === "light" ? <LuMoon /> : <LuSun />}{" "}
          </button>
     );
}
export default ThemeToggle;
