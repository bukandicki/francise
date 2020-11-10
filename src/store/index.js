import Vue from 'vue'
import Vuex from 'vuex'
// import database from 'https://franchise-backend.herokuapp.com/db'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        database: {},
        products: [],
        product: [],
        promos: [],
        promoid: [],
        cart: [],
        partners: [],
        partner: {}
    },
    getters: {
        products: state => state.products,
        promos: state => state.promos,
        cart: state => state.cart,
        promoid: state => state.promoid,
        promo: (state) => (id) => {
            return state.promos.find(prom => prom.id == id)
        },
        productcart: (state) => (id) => {
            return state.products.find(product => product.id == id)
        },
        partnercart: (state) => (id) => {
            return state.partners.find(partner => partner.id == id)
        },
        product: state => state.product,
        partners: state => state.partners,
        partner: state => state.partner
    },
    actions: {
        async fetchData (store){
            return await fetch('https://franchise-backend.herokuapp.com/db')
                    .then(resp => resp.json())
                    .then(data => {
                        store.commit('setFetchData', data)
                        store.commit('setCartData', data)
                    })
        },
        getProducts({commit}){
            commit("setProductData")
        },
        getPromos({commit}){
            commit("setPromosData")
        },
        getPromoId({commit}, id){
            commit("setPromoId", id)
        },
        getProduct({commit}, id){
            commit("setProduct", id)
        },
        getProductProfile({commit}, product){
            commit("setProductProfile", product)
        },
        getPartners({commit}){
            commit("setPartnersData")
        },
        getPartner({commit}, id){
            commit("setPartner", id)
        }
    },
    mutations: {
        setFetchData(state, database) {
            state.database = database
        },
        setProductData(state) {
            state.products = state.database.products
        },
        setPromosData(state) {
            state.promos = state.database.promo
        },
        setCartData(state, database) {
            state.cart = database.cart
        },
        setPartnersData(state) {
            state.partners = state.database.partners
        },
        setPartner(state, id) {
            const data = state.partners.find(partner => partner.id == id)
            state.partner = data
        },
        setPromoId(state, id) {
            const data = state.promos.find(prom => prom.id == id)
            state.promoid = data
        },
        setProduct(state, id) {
            const data = state.products.find(product => product.id == id)
            state.product = data
        },
        setProductProfile(state, product) {
            const data = product.map(id => {
                let filtered_data = state.products.filter(prod => prod.id == id )
                return filtered_data[0]
            })
            state.product = data
        }
    }
})