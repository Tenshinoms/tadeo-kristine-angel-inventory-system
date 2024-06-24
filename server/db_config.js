import { createConnection } from 'mysql';

// Create Connection to MySQL
const connection = createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'inventory_system'
});

export const checkConnection = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL Database: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL database as id ' + connection.threadId);
    });
    return connection;
}

// Close MySQL connection when Node.js app exits
process.on('exit', () => {
    connection.end();
});