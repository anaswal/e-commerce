import Box from "./components/Box";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[90vh]">
        <Box />
      </main>
      <Footer />
    </>
  );
}

export default App;
