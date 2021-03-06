const port = process.env.port || 3400;
require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const app = express();
const store = new MongoDBStore({
    uri: process.env.MONGO_DB_STORE,
    collection: 'users'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const Product = require('./models/product');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false, store: store }));

// A middleware is registered and only executed for incoming requests
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});

// Relations
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize.sync({ force: true })
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: 'Breno',
                email: 'teste@teste.com.br'
            });
        }
        return Promise.resolve(user);
    })
    .then(user => {
        return user.createCart();
        
    })
    .then(_ => {
        app.listen(port, () => {
            console.log(`App is running on Port ${port}`)
        });
    })
    .catch(err => {
        console.error(err)
})

