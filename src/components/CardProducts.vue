<template>
    <div class="card shadow mb-4">
        <div class="promo position-absolute">
            <span v-if="promo_partner" class="badge badge-warning rounded-0 p-2">{{ promo_store.name }}</span>
            <span v-else-if="products.promo != false" class="badge badge-primary rounded-0 p-2">{{ promo_id.name }}</span>
        </div>
        <div class="card-img-top">
            <img :src="products.image" class="product" alt="" />
        </div>
        <div class="card-body">
            <h5 class="card-title">
                {{ products.name }}
            </h5>
            <p class="card-text">IDR {{ getNumeral(products.price) }}</p>
            <router-link v-if="partner_id" :to="'/detail-product/' + products.id + '/' + $route.params.id" class="btn btn-success rounded-pill px-3">Check Product
            </router-link>
            <router-link v-else :to="'/detail-product/' + products.id" class="btn btn-success rounded-pill px-3">Check Product
            </router-link>
        </div>
    </div>
</template>

<script>
    import numeral from 'numeral'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        name: 'CardProducts',
        props: ['products','promo_partner','partner_id'],
        computed: {
            ...mapGetters(['promos', 'promo'])
        },
        data() {
            return {
                promo_id: {},
                promo_store: []
            }
        },
        methods: {
            ...mapActions(['getPromos']),
            fetchPromoProduct(id) {
                this.promo_id = this.$store.getters.promo(id)
            },
            fetchPromoStore(id) {
                this.promo_store = this.$store.getters.promo(id)
            },
            getNumeral(num){
                return numeral(num).format('0,0')
            }
        },
        created() {
            this.getPromos()
            this.fetchPromoProduct(this.products.promo)
            this.fetchPromoStore(this.promo_partner)
        }
    }
</script>

<style scoped>
    .card-img-top {
        filter: contrast(80%) brightness(85%);
    }

    .promo {
        top: 0;
        right: 25px;
        z-index: 4;
    }

    .promo span {
        position: relative;
        overflow: hidden;
    }

    .promo span::after {
        content: '';
        display: block;
        position: absolute;
        top: -10px;
        width: 250%;
        height: 60px;
        animation: mymove 1s infinite;
        transform: rotate(45deg);
        background: rgba(255, 255, 255, 0.411);
    }

    @keyframes mymove {
        from {
            left: -150%;
        }

        to {
            left: 120%;
        }
    }
</style>