<template>
    <section class="product-detail">
        <div class="container pt-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="'/detail-product/' + product.id">{{ product.name }}</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-5">
                    <input type="file" class="d-none" @change="setNewImage" ref="fileImage">
                    <img v-if="imageData!=null" :src="imgView" alt="" class="img-fluid shadow">
                    <img v-else :src="product.image" alt="" class="img-fluid shadow">
                    <button @click="chooseImage" class="btn btn-info text-light mt-2 rounded-pill">Change Image</button>
                </div>
                <div class="col-md-7">
                    <h1 class="mb-4">Edit <strong class="text-success">Product</strong></h1>
                    <div class="form-group">
                        <label for="">Product Name</label>
                        <input type="text" class="form-control font-weight-bold" v-model="productEdit.name"
                            :placeholder="productEdit.name">
                    </div>
                    <div class="form-group my-2">
                        <label for="">Product Price</label>
                        <input type="number" class="form-control font-weight-bold" v-model="productEdit.price"
                            :placeholder="productEdit.price">
                    </div>
                    <div class="form-group my-2">
                        <label for="">Product Stock</label>
                        <input type="number" class="form-control font-weight-bold" v-model="productEdit.stock"
                            :placeholder="productEdit.stock">
                    </div>
                    <ul class="list-group mb-5 pt-2">
                        <label class="mb-3">Promo</label>
                        <li class="list-group-item px-3" v-for="item in promos" :key="item.id">
                            <div class="form-check d-flex align-items-center">
                                <input class="form-check-input" type="radio" v-model="checkedPromo" name="promo"
                                    :value="item.id" :id="item.id" />
                                <label class="form-check-label w-100 d-flex ml-3 justify-content-between"
                                    :for="item.id">
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
        <!-- <h1>Detail Page {{ $route.params.id }}</h1> -->
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
        name: 'EditProduct',
        data() {
            return {
                productEdit: {},
                checkedPromo: null,
                imgView: null,
                imageData: null
            }
        },
        computed: {
            ...mapGetters(['product', 'promos'])
        },
        methods: {
            ...mapActions(['getProducts', 'getProduct', 'getPromos']),
            create() {
                const post = {
                    image: this.imgview
                }
                firebase.database().ref('FoodsImage').push(post)
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
                this.imgView = this.product.image;
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
                this.productEdit.image = this.imgView
                this.productEdit.promo = this.checkedPromo
                axios
                    .put('http://localhost:3000/products/' + this.$route.params.id, this.productEdit)
                    .then(() => {
                    })
                    .catch((error) => console.log(error))
            }
        },
        created() {
            this.getProducts()
            this.getPromos()
            this.getProduct(this.$route.params.id)
            this.productEdit = {
                ...this.product
            }
            this.imgView = this.product.image
            this.checkedPromo = this.product.promo
        },
    }
</script>

<style>
</style>