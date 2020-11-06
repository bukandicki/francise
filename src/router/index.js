import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PartnerPage from '../views/PartnerPage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProductDetail from '../views/ProductDetail.vue'
import EditProduct from '../views/EditProduct.vue'
import EditPartner from '../views/EditPartner.vue'
import AddProducts from '../views/AddProducts.vue'
import AddPartner from '../views/AddPartner.vue'
import PartnerProfile from '../views/PartnerProfile.vue'
import DiscountPage from '../views/DiscountPage.vue'
import CashierPage from '../cashier-view/Home.vue'
import StorePage from '../cashier-view/StorePage.vue'
import CartPage from '../cashier-view/CartPage.vue'
import ProductDetailStore from '../cashier-view/ProductDetail.vue'
import SellingPage from '../cashier-view/SellingPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/partner-page',
    name: 'PartnerPage',
    component: PartnerPage
  },
  {
    path: '/cart-page',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/products-page',
    name: 'ProductsPage',
    component: ProductsPage
  },
  {
    path: '/discount-page',
    name: 'DiscountPage',
    component: DiscountPage
  },
  {
    path: '/detail-store-product/:id/:idp',
    name: 'ProductDetailStore',
    component: ProductDetailStore,
    props: true
  },
  {
    path: '/detail-product/:id/',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/detail-product/:id/:idp',
    name: 'ProductProfileDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/edit-partner/:id',
    name: 'EditPartner',
    component: EditPartner
  },
  {
    path: '/add-products',
    name: 'AddProducts',
    component: AddProducts
  },
  {
    path: '/store-profile/:id',
    name: 'StorePage',
    component: StorePage
  },
  {
    path: '/add-partner',
    name: 'AddPartner',
    component: AddPartner
  },
  {
    path: '/cashier-page',
    name: 'CashierPage',
    component: CashierPage
  },
  {
    path: '/selling-page',
    name: 'SellingPage',
    component: SellingPage
  },
  {
    path: '/partner-page/:id',
    name: 'PartnerProfile',
    component: PartnerProfile
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
