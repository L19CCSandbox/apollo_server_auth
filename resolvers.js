const bcrypt = require('bcryptjs');
const {decodedToken} = require('./auth/authenticate');
const {generateToken} = require('./auth/token');

const resolvers = {
    Query: {
        users: async (root, args, {prisma, req}, info) => {
            try {
                const decoded = await decodedToken(req);
                return prisma.users();
            }catch(err){
                throw err;
            }
        },
    },

    Mutation: {
        register: async (root, args, {prisma}, info) => {
            const {data: {username, name, password} } = args;
            const user = await prisma.createUser({
                username,
                name,
                password: bcrypt.hashSync(password, 8)
            });

            console.log(user);
            return {token: generateToken(user)};
        },
        login: async (root, args, {prisma}, info) => {
            const {data: {username, password} } = args;
            const [user] = await prisma.users({
                where: {
                    username
                }
            });

            console.log(user);
            if(user && bcrypt.compareSync(password, user.password)){
                return {token: generateToken(user)};
            }else{
                throw new Error('Invalid username or password');
            }
        }
    }
};

module.exports = resolvers;