<template>
    <section class="products_page">
        <div class="container pt-5">
            <h1 class="mb-4">Our <strong class="text-success">Products</strong></h1>
            <div class="option-partner-page w-100 mb-5 d-flex justify-content-between">
                <router-link to="/add-products" class="btn btn-success rounded-pill px-3">Add More Products</router-link>
                <input class="form-control w-25" type="text" placeholder="Search products..." v-model="search" @keyup="searchProduct()">
            </div>
            <div class="row">
                <div class="col-lg-12 text-center pt-5" v-if="products.length < 1">
                    <h1 class="mt-5">Produk <strong class="text-success">{{ search }}</strong> tidak di temukan.</h1>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-6"
                    v-for="item in products"
                    :key="item.id"
                >
                    <CardProducts :products="item"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import CardProducts from '@/components/CardProducts.vue'

    export default {
        name: "ProductsPage",
        components: {
            CardProducts
        },
        data() {
            return {
                products: [],
                search: ''
            }
        },
        methods: {
            getProduct(data) {
                this.products = data
            },
            searchProduct() {
                axios
                .get('http://localhost:3000/products?name_like=' + this.search)
                .then((response) => this.getProduct(response.data))
                .catch((error) => console.log(error))
            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/products')
                .then((response) => this.getProduct(response.data))
                .catch((error) => console.log(error)) 
        },
    }
</script>

<style></style>
