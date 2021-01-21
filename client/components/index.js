import AllProducts from './AllProducts'

/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './AllProducts'
export {default as Cart} from './cart'
export {default as AdminHome} from './AdminHome'
export {default as EditProduct} from './EditProduct'
export {default as AddProduct} from './AddProduct'
export {default as AllUsers} from './AllUsers'
export {default as SingleUser} from './SingleUser'
export {default as AddUser} from './AddUser'
export {default as EditUser} from './EditUser'
