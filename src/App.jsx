import Box from "./components/Box";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductCard from "./components/ui/ProductCard";
import { Button } from "./components/ui/button";

const productRaw = [
  {
    productName: "Dark Gray T-Thirt",
    imgSrc:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456773/item/goods_08_456773.jpg?width=750",
    price: 199000,
    stock: 5,
  },
  {
    productName: "Chainsaw Man T-Thirt",
    imgSrc:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/467422/item/goods_00_467422.jpg?width=750",
    price: 129000,
    stock: 6,
  },
];

function App() {
  const products = productRaw.map((product) => {
    return (
      <ProductCard
        productName={product.productName}
        imgSrc={product.imgSrc}
        price={product.price}
        stock={product.stock}
      />
    );
  });
  return (
    <>
      <Header />
      <main className="min-h-[90vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Become a trend setter with us.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            e-Kommers provide you with th finest clothings and ensures your
            confidence througout your days.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">{products}</div>
      </main>
      <Footer />
    </>
  );
}

export default App;
