import { Product, Testimonial, User } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky croissant filled with rich chocolate.',
    price: 4.99,
    category: 'Pastries',
    image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    ingredients: ['Flour', 'Butter', 'Chocolate', 'Sugar', 'Yeast'],
    nutritionInfo: {
      calories: 320,
      protein: 5,
      carbs: 35,
      fat: 18,
    },
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread with a crispy crust and tender crumb.',
    price: 6.99,
    category: 'Bread',
    image: 'https://images.pexels.com/photos/920220/pexels-photo-920220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    ingredients: ['Flour', 'Water', 'Salt', 'Sourdough Starter'],
    nutritionInfo: {
      calories: 160,
      protein: 6,
      carbs: 32,
      fat: 1,
    },
    createdAt: new Date('2023-02-10'),
  },
  {
    id: '3',
    name: 'Blueberry Muffin',
    description: 'Soft muffin loaded with fresh blueberries.',
    price: 3.99,
    category: 'Muffins',
    image: 'https://images.pexels.com/photos/5386673/pexels-photo-5386673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    ingredients: ['Flour', 'Sugar', 'Blueberries', 'Butter', 'Eggs'],
    nutritionInfo: {
      calories: 280,
      protein: 4,
      carbs: 36,
      fat: 12,
    },
    createdAt: new Date('2023-01-20'),
  },
  {
    id: '4',
    name: 'Raspberry Tart',
    description: 'Buttery tart shell filled with pastry cream and topped with fresh raspberries.',
    price: 5.99,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    ingredients: ['Flour', 'Butter', 'Sugar', 'Raspberries', 'Cream'],
    nutritionInfo: {
      calories: 340,
      protein: 4,
      carbs: 38,
      fat: 19,
    },
    createdAt: new Date('2023-03-05'),
  },
  {
    id: '5',
    name: 'Cinnamon Roll',
    description: 'Soft rolls with a cinnamon-sugar swirl and cream cheese frosting.',
    price: 4.49,
    category: 'Pastries',
    image: 'https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    ingredients: ['Flour', 'Sugar', 'Cinnamon', 'Butter', 'Cream Cheese'],
    nutritionInfo: {
      calories: 420,
      protein: 6,
      carbs: 58,
      fat: 19,
    },
    createdAt: new Date('2023-02-25'),
  },
  {
    id: '6',
    name: 'Baguette',
    description: 'Traditional French baguette with a crispy crust and airy interior.',
    price: 3.49,
    category: 'Bread',
    image: 'https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    ingredients: ['Flour', 'Water', 'Salt', 'Yeast'],
    nutritionInfo: {
      calories: 150,
      protein: 6,
      carbs: 29,
      fat: 1,
    },
    createdAt: new Date('2023-01-05'),
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    position: 'Food Blogger',
    content: 'The croissants from Sweet Delights are the best I\'ve had outside of Paris. Perfectly flaky and buttery!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    date: new Date('2023-02-15'),
  },
  {
    id: '2',
    name: 'David Chen',
    position: 'Local Restaurant Owner',
    content: 'As a restaurant owner, I appreciate quality baked goods. Sweet Delights consistently delivers exceptional bread for our establishment.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    date: new Date('2023-03-10'),
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    position: 'Regular Customer',
    content: 'I\'ve been ordering their sourdough bread weekly for months. The flavor is incredible and it stays fresh for days!',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
    date: new Date('2023-01-20'),
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    position: 'Birthday Party Host',
    content: 'The custom cake I ordered for my daughter\'s birthday was not only beautiful but absolutely delicious. Everyone wanted to know where I got it!',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    date: new Date('2023-04-05'),
  }
];

export const initialUsers: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    isAdmin: true,
  }
];