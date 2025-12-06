export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  queueLength: number;
  estimatedWaitMinutes: number;
  isTrendUp: boolean;
  isOpen: boolean;
  lastUpdated: string;
}

export const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Joe's Coffee",
    category: "Cafe",
    address: "123 Main St, New York, NY",
    latitude: 40.7128,
    longitude: -74.006,
    queueLength: 12,
    estimatedWaitMinutes: 18,
    isTrendUp: true,
    isOpen: true,
    lastUpdated: "2 min ago",
  },
  {
    id: "2",
    name: "City Health Clinic",
    category: "Clinic",
    address: "456 Broadway, New York, NY",
    latitude: 40.72,
    longitude: -74.01,
    queueLength: 5,
    estimatedWaitMinutes: 45,
    isTrendUp: false,
    isOpen: true,
    lastUpdated: "5 min ago",
  },
  {
    id: "3",
    name: "Tech Bank",
    category: "Bank",
    address: "789 Wall St, New York, NY",
    latitude: 40.705,
    longitude: -74.009,
    queueLength: 2,
    estimatedWaitMinutes: 5,
    isTrendUp: false,
    isOpen: true,
    lastUpdated: "Just now",
  },
  {
    id: "4",
    name: "Burger Palace",
    category: "Restaurant",
    address: "321 5th Ave, New York, NY",
    latitude: 40.7484,
    longitude: -73.9857,
    queueLength: 25,
    estimatedWaitMinutes: 30,
    isTrendUp: true,
    isOpen: true,
    lastUpdated: "1 min ago",
  },
];
