const bcrypt = require('bcrypt');
const db = require('../db'); 

const admins = [
  { username: 'Think01@gmail.com', password: 'Think@#$123' },
//   { username: 'admin2', password: 'password456' },
];

(async () => {
  try {
    for (const admin of admins) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [
        admin.username,
        hashedPassword,
      ]);
      console.log(`Admin ${admin.username} inserted`);
    }
    process.exit(0); // Exit the process once seeding is complete
  } catch (error) {
    console.error('Error seeding admins:', error.message);
    process.exit(1);
  }
})();
