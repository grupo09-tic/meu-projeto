const db = require('../config/database');

class UserRepository {
    async findByEmail(email) {
        const result = await db.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }
}
module.exports = new UserRepository();