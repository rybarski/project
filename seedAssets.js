// seedAssets.js
const Asset = require('./models/asset'); // Ensure correct path
const { faker } = require('@faker-js/faker'); // Confirming correct faker import
const db = require('./config/database'); // Database connection file

// Array of IT equipment types and models for realistic data generation
const equipmentTypes = [
  { type: 'Laptop', models: ['Dell Latitude', 'HP EliteBook', 'Lenovo ThinkPad', 'MacBook Pro'] },
  { type: 'Desktop', models: ['Dell OptiPlex', 'HP Pavilion', 'Apple iMac', 'Lenovo ThinkCentre'] },
  { type: 'Router', models: ['Cisco 2901', 'Juniper MX204', 'Netgear Nighthawk', 'TP-Link Archer'] },
  { type: 'Switch', models: ['Cisco Catalyst 9300', 'HP ProCurve', 'Netgear ProSAFE', 'Dell PowerConnect'] },
  { type: 'Server', models: ['Dell PowerEdge', 'HP ProLiant', 'IBM System x', 'Cisco UCS'] },
  { type: 'Access Point', models: ['Ubiquiti UniFi', 'Cisco Aironet', 'TP-Link Omada', 'Aruba Instant'] },
  { type: 'Printer', models: ['HP LaserJet', 'Canon PIXMA', 'Brother HL-L2350DW', 'Epson EcoTank'] },
  { type: 'Label Printer', models: ['DYMO LabelWriter', 'Brother QL-820NWB', 'Zebra ZD420', 'Epson LabelWorks'] },
];

// Helper function to select a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate a random alphanumeric string for serial numbers
function generateSerialNumber(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Helper function to generate a random number within a range
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedAssets() {
  try {
    await db.authenticate();
    console.log('Database connected successfully.');
    await db.sync();

    // Seeding data with realistic IT equipment
    for (let i = 0; i < 150; i++) {
      const equipment = getRandomItem(equipmentTypes);
      await Asset.create({
        type: equipment.type,
        model: getRandomItem(equipment.models),
        serialNumber: generateSerialNumber(10),
        purchaseDate: faker.date.past(),
        warrantyStatus: faker.helpers.arrayElement(['Valid', 'Expired']),
        assignedUserId: generateRandomNumber(1, 10),
        location: faker.location.city(),
        status: faker.helpers.arrayElement(['Active', 'Inactive', 'In Repair', 'Decommissioned']),
      });
    }

    console.log('Assets seeded successfully.');
  } catch (error) {
    console.error('Error seeding assets:', error);
  }
}

seedAssets();
