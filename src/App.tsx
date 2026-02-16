import "./App.css";
import { CartCard } from "./components/CartCard";

// Renders a single empty cart card example for style and layout validation.
function App() {
  return (
    <main className="appShell">
      <CartCard itemCount={0} isEmpty />
    </main>
  );
}

export default App;
