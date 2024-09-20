import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
        <main className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">SecondLove</h1>
            <p className="text-xl text-white opacity-80">Revolutionizing Second-Hand Fashion Management</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">For Store Owners</h2>
              <ul className="list-disc list-inside text-white space-y-2">
                <li>Rent out your unused clothing racks</li>
                <li>Earn commission on sales</li>
                <li>Manage inventory efficiently</li>
                <li>Attract more consignors and customers</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">For Consignors</h2>
              <ul className="list-disc list-inside text-white space-y-2">
                <li>Find available rack space easily</li>
                <li>Keep track of your items' status</li>
                <li>Print professional labels</li>
                <li>Maximize your second-hand sales</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
                href="/register"
                className="inline-block bg-white text-blue-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-white text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Efficient Inventory</h3>
              <p>Keep track of all items with our advanced inventory system</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Smart Booking</h3>
              <p>Easily book and manage clothing rack rentals</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Automated Labels</h3>
              <p>Generate and print professional labels for all your items</p>
            </div>
          </div>
        </main>

        <footer className="mt-20 text-center text-white">
          <nav className="space-x-4">
            <a href="#about" className="hover:underline">About Us</a>
            <a href="#how-it-works" className="hover:underline">How It Works</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </nav>
          <p className="mt-4 text-sm opacity-70">&copy; 2024 SecondLove. All rights reserved.</p>
        </footer>
      </div>
  );
}