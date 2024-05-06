import Box from "./components/Box";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[90vh]">
        <Box />
        <Button>Shadcn Button</Button>
      </main>
      <Footer />
    </>
  );
}

export default App;
