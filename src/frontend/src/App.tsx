import {
  CheckCircle,
  Clock,
  Flame,
  MapPin,
  Moon,
  PhoneCall,
  Star,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

const HERO_BG = `linear-gradient(rgba(28,28,28,0.7), rgba(28,28,28,0.8)), url('/assets/generated/dhaba-hero.dim_1600x900.jpg') center/cover no-repeat`;

const menuCategories = [
  {
    title: "Biryani Specials",
    bg: "bg-maroon",
    icon: <Star className="w-4 h-4" />,
    items: [
      "Chicken Dum Biryani",
      "Chicken Fry Biryani",
      "Special Combo Biryani",
    ],
  },
  {
    title: "Kebabs",
    bg: "bg-charcoal",
    icon: <Flame className="w-4 h-4" />,
    items: ["Chicken Shami Kebab", "Seekh Kebab", "Chicken Bun Kebab"],
  },
  {
    title: "Classics",
    bg: "bg-charcoal",
    icon: <UtensilsCrossed className="w-4 h-4" />,
    items: ["Chicken Tikka Masala", "Chicken Korma", "Mutton Paya Soup"],
  },
  {
    title: "Fast Food",
    bg: "bg-charcoal",
    icon: <Zap className="w-4 h-4" />,
    items: ["Chicken Samosa", "Chicken Bun", "Kebab Combos"],
  },
];

export default function App() {
  return (
    <div className="bg-white font-body">
      {/* Mobile Bottom Bar */}
      <div
        data-ocid="mobile.bottom_bar"
        className="fixed bottom-0 left-0 right-0 bg-maroon text-white p-4 flex justify-around items-center z-50 md:hidden shadow-lg"
      >
        <a
          href="tel:8226061421"
          data-ocid="mobile.call_button"
          className="flex items-center gap-2 font-bold text-sm"
        >
          <PhoneCall className="w-4 h-4" /> Call Now
        </a>
        <div className="w-px h-6 bg-white opacity-30" />
        <a
          href="#menu"
          data-ocid="mobile.order_button"
          className="flex items-center gap-2 font-bold text-sm"
        >
          <UtensilsCrossed className="w-4 h-4" /> Order Now
        </a>
      </div>

      {/* Navbar */}
      <nav className="bg-charcoal text-white p-4 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter font-heading">
            DAWAT <span className="text-gold">RESTAURANT</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase font-semibold">
            <a
              href="#about"
              data-ocid="nav.about_link"
              className="hover:text-gold transition-colors"
            >
              About
            </a>
            <a
              href="#menu"
              data-ocid="nav.menu_link"
              className="hover:text-gold transition-colors"
            >
              Menu
            </a>
            <a
              href="#location"
              data-ocid="nav.location_link"
              className="hover:text-gold transition-colors"
            >
              Location
            </a>
          </div>
          <a
            href="tel:8226061421"
            data-ocid="nav.call_button"
            className="bg-maroon px-5 py-2 rounded text-sm font-bold hover:bg-red-900 transition-colors"
          >
            CALL TO ORDER
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{ background: HERO_BG }}
        className="h-[85vh] flex items-center justify-center text-center text-white px-6"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight font-heading">
            Sagar's Favorite Destination for{" "}
            <span className="text-gold">Authentic Non-Veg</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            From flavorful Chicken Dum Biryani to sizzling Kebabs — enjoy bold
            taste and unbeatable value.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#menu"
              data-ocid="hero.order_button"
              className="bg-maroon hover:bg-red-900 transition-colors text-white px-10 py-4 rounded font-bold text-lg flex items-center justify-center gap-2 shadow-xl"
            >
              Order Now 🍗
            </a>
            <a
              href="tel:8226061421"
              data-ocid="hero.call_button"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors px-10 py-4 rounded font-bold text-lg"
            >
              Call to Order
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-semibold opacity-80">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-gold" /> Famous Dum Biryani
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-gold" /> Fast &amp; Fresh
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-gold" /> Budget-Friendly
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gold" /> Open 3:00 AM
            </span>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-maroon pl-4 text-charcoal font-heading">
              Welcome to Dawat Restaurant
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Located near <strong>Jhhula Tigadda, Tilak Ganj</strong>, Dawat
              Restaurant is a trusted name in Sagar for rich flavors and
              satisfying meals at affordable prices.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Every dish, from our aromatic biryani to mouth-watering kebabs, is
              prepared with meticulous attention to freshness and quality.
              Whether you're a local or a traveler, we ensure a meal that keeps
              you coming back.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/assets/generated/dhaba-interior.dim_800x600.jpg"
              alt="Restaurant Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-charcoal uppercase tracking-widest font-heading">
            The Dawat Restaurant Experience
          </h2>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Flame className="text-maroon mb-4 w-10 h-10" />,
              title: "Signature Biryani",
              desc: "Packed with rich aroma and authentic spices, our Chicken Dum Biryani is a legend.",
            },
            {
              icon: <Zap className="text-maroon mb-4 w-10 h-10" />,
              title: "Quick Service",
              desc: "Fast preparation ensures minimal waiting time for your hunger cravings.",
            },
            {
              icon: <Moon className="text-maroon mb-4 w-10 h-10" />,
              title: "Early Morning",
              desc: "Open from 3:00 AM—perfect for early travelers and late-night workers.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white p-8 rounded shadow-sm hover:shadow-md transition-shadow border-b-4 border-gold"
            >
              {card.icon}
              <h3 className="text-xl font-bold mb-2 font-heading">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center underline decoration-gold underline-offset-8 font-heading">
            Our Popular Dishes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuCategories.map((cat) => (
              <div key={cat.title}>
                <h3
                  className={`${cat.bg} text-white p-3 font-bold mb-4 rounded flex items-center gap-2 font-heading`}
                >
                  {cat.icon} {cat.title}
                </h3>
                <ul className="space-y-3 font-semibold text-charcoal">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex justify-between border-b pb-1"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              type="button"
              data-ocid="menu.view_full_button"
              className="bg-charcoal text-gold font-bold py-3 px-8 rounded border-2 border-gold hover:bg-gold hover:text-charcoal transition-colors font-heading"
            >
              VIEW FULL MENU
            </button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-20 bg-charcoal text-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gold font-heading">
              Visit Us
            </h2>
            <div className="space-y-6">
              <p className="flex items-start gap-4 text-lg">
                <MapPin className="text-gold mt-1 shrink-0" />
                <span>
                  Mariyam Manzil, Jhhula Tigadda,
                  <br />
                  Tilak Ganj, Sagar, Madhya Pradesh
                </span>
              </p>
              <p className="flex items-start gap-4 text-lg">
                <Clock className="text-gold mt-1 shrink-0" />
                Open Daily: 3:00 AM – 11:00 PM
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="location.directions_button"
                className="inline-block bg-white text-charcoal px-8 py-3 rounded font-bold hover:bg-gold transition-colors"
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>
          <div className="h-64 bg-gray-600 rounded-lg flex items-center justify-center italic text-gray-400">
            [ Google Map Embed Area ]
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2 font-heading">
            Dawat Restaurant &amp; Fast Food
          </h2>
          <p className="text-gold italic mb-8">
            Authentic Taste. Real Satisfaction.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dawat Restaurant Sagar. All Rights
            Reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
