<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <router-link class="navbar-brand text-success" to="/">
                <span v-if="$route.name == 'StorePage'">{{ partner.name }}</span>
                <span v-else-if="$route.name == 'ProductDetailStore'">{{ partner.name }}</span>
                <span v-else>Sejahtera Foods</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/partner-page">Partners</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products-page">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/discount-page">Discount</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/cashier-page">Cashier</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/selling-page">Sales History</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="btn ml-3 px-0" to="/cart-page">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bag" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z" />
                            </svg> <span class="badge badge-success">{{ cart.cart_items.length }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'Navbar',
        computed: {
            ...mapGetters(['cart','partner'])
        },
        methods: {
            ...mapActions(['getCart','getPartners', 'getPartner'])
        },
        created() {
            this.getCart()
            this.getPartners()
            this.getPartner(this.$route.params.id)
        },
    }
</script>

<style>

</style>