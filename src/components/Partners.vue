<template>
    <div class="container pt-5">
        <h1 v-if="$route.name == 'PartnerPage'" class="mb-4">Our <strong class="text-success">Partner</strong></h1>
        <div class="option-partner-page w-100 mb-5 d-flex justify-content-between">
            <router-link v-if="$route.name == 'PartnerPage'" to="/add-partner" class="btn btn-success rounded-pill px-3">Add More Partner</router-link>
            <input :class="($route.name == 'PartnerPage') ? ' w-25' : ' w-100'" class="form-control" @keyup="searchPartner" v-model="search" type="text"
                placeholder="Search partner...">
        </div>
        <div class="row">
            <div class="col-lg-12 text-center pt-5" v-if="partners.length < 1">
                <h1 class="mt-5">Toko <strong class="text-success">{{ search }}</strong> tidak di temukan.</h1>
            </div>
            <div class="col-md-4 col" v-for="item in partners" :key="item.id">
                <div class="card shadow border-0 mb-4">
                    <div class="card-img-top">
                        <img :src="item.store_image" alt="" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <div class="text-success">
                            <p class="card-text m-0">{{ item.location.city }}, {{ item.location.province }}</p>
                        </div>
                        <router-link v-if="$route.name == 'PartnerPage'" class="btn btn-success mt-3 rounded-pill px-3" :to="'/partner-page/' + item.id">
                            Profile Partner</router-link>
                        <router-link v-else class="btn btn-primary mt-3 rounded-pill px-3"
                            :to="'/partner-page/' + item.id">Visit Store</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'Partners',
        data() {
            return {
                partners: [],
                search: ''
            }
        },
        methods: {
            getPartners(data) {
                this.partners = data
            },
            searchPartner() {
                axios
                    .get('http://localhost:3000/partners?name_like=' + this.search)
                    .then((response) => this.getPartners(response.data))
                    .catch((error) => console.log(error))
            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/partners')
                .then((response) => this.getPartners(response.data))
                .catch((error) => console.log(error))
        }
    }
</script>

<style>

</style>