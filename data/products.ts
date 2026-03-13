export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  color: string;
  emoji: string;
};

export const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Sports'];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    description:
      'Premium wireless headphones with active noise cancellation and 30-hour battery life. Crystal-clear audio with deep bass and Hi-Res Audio certification.',
    rating: 4.5,
    reviews: 128,
    color: '#4A90E2',
    emoji: '🎧',
  },
  {
    id: '2',
    name: 'Running Shoes',
    price: 119.99,
    category: 'Sports',
    description:
      'Lightweight and breathable running shoes with superior cushioning for long distances. Features responsive foam midsole and durable rubber outsole.',
    rating: 4.7,
    reviews: 89,
    color: '#E24A4A',
    emoji: '👟',
  },
  {
    id: '3',
    name: 'Casual T-Shirt',
    price: 24.99,
    category: 'Clothing',
    description:
      'Comfortable 100% organic cotton t-shirt with a relaxed fit. Sustainably sourced and available in 12 colors.',
    rating: 4.2,
    reviews: 203,
    color: '#50C878',
    emoji: '👕',
  },
  {
    id: '4',
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    description:
      'Feature-packed smartwatch with health tracking, built-in GPS, sleep monitoring, and 7-day battery life. Water resistant up to 50m.',
    rating: 4.6,
    reviews: 312,
    color: '#9B59B6',
    emoji: '⌚',
  },
  {
    id: '5',
    name: 'Coffee Maker',
    price: 59.99,
    category: 'Home',
    description:
      '12-cup programmable coffee maker with auto-shutoff, brew strength control, and a built-in grinder for the freshest cup every time.',
    rating: 4.3,
    reviews: 156,
    color: '#E67E22',
    emoji: '☕',
  },
  {
    id: '6',
    name: 'Yoga Mat',
    price: 34.99,
    category: 'Sports',
    description:
      'Non-slip eco-friendly yoga mat with alignment lines and carrying strap. Made from natural rubber with a moisture-wicking top layer.',
    rating: 4.8,
    reviews: 74,
    color: '#1ABC9C',
    emoji: '🧘',
  },
  {
    id: '7',
    name: 'Denim Jacket',
    price: 89.99,
    category: 'Clothing',
    description:
      'Classic denim jacket with a modern slim fit. Made from 100% cotton denim with reinforced seams. Perfect for any casual occasion.',
    rating: 4.4,
    reviews: 91,
    color: '#2980B9',
    emoji: '🧥',
  },
  {
    id: '8',
    name: 'LED Desk Lamp',
    price: 44.99,
    category: 'Home',
    description:
      'Energy-efficient LED desk lamp with 5 brightness levels, 3 color temperatures, touch control, and a USB-A charging port.',
    rating: 4.5,
    reviews: 167,
    color: '#F39C12',
    emoji: '💡',
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    price: 54.99,
    category: 'Electronics',
    description:
      '360° portable Bluetooth speaker with 20-hour playtime, IPX7 waterproof rating, and built-in microphone for hands-free calls.',
    rating: 4.4,
    reviews: 241,
    color: '#E74C3C',
    emoji: '🔊',
  },
  {
    id: '10',
    name: 'Winter Scarf',
    price: 29.99,
    category: 'Clothing',
    description:
      'Soft merino wool scarf in a classic plaid pattern. Naturally temperature-regulating and hypoallergenic.',
    rating: 4.6,
    reviews: 58,
    color: '#C0392B',
    emoji: '🧣',
  },
  {
    id: '11',
    name: 'Resistance Bands Set',
    price: 19.99,
    category: 'Sports',
    description:
      'Set of 5 resistance bands in varying tensions. Perfect for home workouts, physical therapy, and stretching routines.',
    rating: 4.5,
    reviews: 182,
    color: '#27AE60',
    emoji: '🏋️',
  },
  {
    id: '12',
    name: 'Throw Pillow Set',
    price: 39.99,
    category: 'Home',
    description:
      'Set of 2 decorative throw pillows with removable, washable covers. Hypoallergenic fill for year-round comfort.',
    rating: 4.3,
    reviews: 95,
    color: '#8E44AD',
    emoji: '🛋️',
  },
];
