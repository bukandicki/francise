<template>
    <section class="partner-edit">
        <div class="container pt-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/partner-page">Partners</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="'/partner-page/' + partner.id ">{{ partner.name }}</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-5">
                    <input type="file" class="d-none" @change="setNewImage" ref="fileImage">
                    <img v-if="imageData!=null" :src="imgView" alt="" class="img-fluid shadow">
                    <img v-else :src="partner.store_image" alt="" class="img-fluid shadow">
                    <button @click="chooseImage" class="btn btn-info text-light mt-2 rounded-pill">Change Image</button>
                </div>
                <div class="col-md-7">
                    <h1 class="mb-4">Edit <strong class="text-success">Partner</strong></h1>
                    <div class="form-group">
                        <label for="">partner Name</label>
                        <input type="text" class="form-control font-weight-bold" v-model="partnerEdit.name"
                            :placeholder="partnerEdit.name">
                    </div>
                    <div class="form-group my-2">
                        <label for="">Email</label>
                        <input type="text" class="form-control font-weight-bold" v-model="partnerEdit.email"
                            :placeholder="partnerEdit.email">
                    </div>
                    <div class="form-group my-2 mb-3 d-flex flex-column">
                        <label for="" class="mr-3">Location</label>
                        <select class="my-2 " v-model="partnerEdit.location.province" name="" id="">
                            <option value="Jawa Timur">Jawa Timur</option>
                            <option :value="partnerEdit.location.province">{{ partnerEdit.location.province }}</option>
                            <option value="Jawa Tengah">Jawa Tengah</option>
                        </select>
                        <select class="" v-model="partnerEdit.location.city" name="" id="">
                            <option value="Surabaya">Surabaya</option>
                            <option :value="partnerEdit.location.city">{{ partnerEdit.location.city }}</option>
                            <option value="Yogyakarta">Yogyakarta</option>
                        </select>
                    </div>
                    <div class="form-group my-2">
                        <label for="">Street Name</label>
                        <input type="text" class="form-control font-weight-bold"
                            v-model="partnerEdit.location.street_name" :placeholder="partnerEdit.location.street_name">
                    </div>
                    <div class="form-group my-2">
                        <label for="">Post Code</label>
                        <input type="number" class="form-control font-weight-bold"
                            v-model="partnerEdit.location.post_code" :placeholder="partnerEdit.location.post_code">
                    </div>
                    <ul class="list-group mb-5 pt-3">
                        Product
                        <li class="list-group-item px-3" v-for="item in products" :key="item.id">
                            <div class="form-check d-flex align-items-center">
                                <input class="form-check-input" type="checkbox" v-model="checkedProducts"
                                    :value="item.id" :id="item.id">
                                <label class="form-check-label w-100 d-flex ml-3 justify-content-between"
                                    :for="item.id">
                                    <span>{{ item.name }}</span>
                                    <span
                                        class="badge badge-pill align-self-center p-2 badge-success d-block ml-2 px-3">Rp{{ item.price }}</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <ul class="list-group mb-5 pt-2">
                        <label class="mb-3">Promo</label>
                        <li class="list-group-item px-3" v-for="item in promos" :key="item.id">
                            <div class="form-check d-flex align-items-center">
                                <input class="form-check-input" type="radio" v-model="checkedPromo" name="promo"
                                    :value="item.id" :id="'promo' + item.id" />
                                <label class="form-check-label w-100 d-flex ml-3 justify-content-between"
                                    :for="'promo' + item.id">
                                    <span>{{ item.name }} <span
                                            class="badge badge-pill p-2 badge-success ml-2 px-3">{{ item.amount }}%</span></span>
                                    <span
                                        class="badge badge-pill align-self-center p-2 badge-info d-block ml-2 px-3">{{ item.from }}
                                        - {{ item.to }}</span>
                                </label>
                            </div>
                        </li>
                        <li class="list-group-item mt-2 border-0">
                            <button class="btn btn-danger w-100" @click="resetPromo">Reset Promo</button>
                        </li>
                    </ul>
                    <button class="btn btn-success mt-3 rounded-pill px-4 py-2" @click="confirmEdits">Confirm
                        Edit</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import firebase from 'firebase'
    import axios from 'axios'

    export default {
        name: 'EditPartner',
        data() {
            return {
                partnerEdit: {},
                checkedProducts: [],
                checkedPromo: null,
                product: [],
                imgView: null,
                imageData: null
            }
        },
        computed: {
            ...mapGetters(['partner', 'products', 'promos'])
        },
        methods: {
            ...mapActions(['getPartners', 'getPartner', 'getProducts', 'getPromos']),
            create() {
                const post = {
                    image: this.imgview
                }
                firebase.database().ref('PartnerImage').push(post)
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            chooseImage() {
                this.$refs.fileImage.click()
            },
            setNewImage(event) {
                this.uploadValue = 0;
                this.imgView = this.partner.image;
                this.imageData = event.target.files[0];

                const storageRef = firebase
                    .storage()
                    .ref(`${this.imageData.name}`)
                    .put(this.imageData);
                storageRef.on(
                    `state_changed`,
                    (snapshot) => {
                        this.uploadValue =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error) => {
                        console.log(error.message);
                    },
                    () => {
                        this.uploadValue = 100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.imgView = url;
                        });
                    }
                );

            },
            resetPromo() {
                var ele = document.getElementsByName('promo');
                for (var i = 0; i < ele.length; i++){
                    ele[i].checked = false;
                }
                this.checkedPromo = false
            },
            confirmEdits() {
                this.partnerEdit.store_image = this.imgView
                this.partnerEdit.product = this.checkedProducts
                this.partnerEdit.store_promo = this.checkedPromo
                axios
                    .put('http://localhost:3000/partners/' + this.$route.params.id, this.partnerEdit)
                    .then(() => {
                        console.log("Oke")
                    })
                    .catch((error) => console.log(error))
            },
        },
        created() {
            this.getProducts()
            this.getPromos()
            this.getPartners()
            this.getPartner(this.$route.params.id)
            this.partnerEdit = {
                ...this.partner
            }
            this.imgView = this.partner.store_image
            this.checkedProducts = [...this.partner.product]
            this.checkedPromo = this.partner.store_promo
        },
    }
</script>

<style>

</style>