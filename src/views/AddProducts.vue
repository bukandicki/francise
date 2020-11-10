<template>
   <section class="add-products py-5">
      <div class="container">
         <div class="form-group mb-5 d-flex">
            <label
               for="insert-product-image shadow"
               @click="chooseImage"
               class="insert-product-image"
               >Insert Product Image</label
            >
            <input
               type="file"
               ref="inputimage"
               name="file"
               @change="inputImage"
               class="form-control-file d-none"
            />
            <div class="image-viewer ml-4 shadow">
               <img
                  v-if="imageData != null"
                  :src="imgView"
                  alt=""
                  srcset=""
                  id="show-image"
               />
            </div>
         </div>
         <div class="form-group">
            <label for="product-name">Product Name</label>
            <input
               type="text"
               v-model="addproduct.name"
               class="form-control"
               id="product-name"
               placeholder="Nasi goreng..."
            />
         </div>
         <div class="form-group">
            <label for="product-price">Product Price</label>
            <input
               type="number"
               v-model="addproduct.price"
               class="form-control"
               id="product-price"
               placeholder="150000"
            />
         </div>
         <div class="form-group">
            <label for="product-stock">Product Stock</label>
            <input
               type="number"
               v-model="addproduct.stock"
               class="form-control"
               id="product-stock"
               placeholder="3"
            />
         </div>
         <ul class="list-group mb-5 pt-2">
            <label class="mb-3">Promo</label>
            <li
               class="list-group-item px-3"
               v-for="item in promos"
               :key="item.id"
            >
               <div class="form-check d-flex align-items-center">
                  <input
                     class="form-check-input"
                     type="radio"
                     v-model="checkedPromo"
                     name="promo"
                     :value="item.id"
                     :id="item.id"
                  />
                  <label
                     class="form-check-label w-100 d-flex ml-3 justify-content-between"
                     :for="item.id"
                  >
                     <span
                        >{{ item.name }}
                        <span
                           class="badge badge-pill p-2 badge-success ml-2 px-3"
                           >{{ item.amount }}%</span
                        ></span
                     >
                     <span
                        class="badge badge-pill align-self-center p-2 badge-info d-block ml-2 px-3"
                        >{{ item.from }} - {{ item.to }}</span
                     >
                  </label>
               </div>
            </li>
         </ul>
         <button
            class="btn btn-success"
            :disabled="
               addproduct.name == '' ||
                  addproduct.price == '' ||
                  addproduct.stock == '' ||
                  imageData == null
            "
            type="button"
            @click="addProduct"
         >
            Input Product
         </button>
      </div>
   </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import axios from "axios";
import firebase from "firebase";

export default {
   name: "AddProducts",
   data() {
      return {
         addproduct: {},
         checkedPromo: false,
         imgView: null,
         imageData: null,
      };
   },
   computed: {
      ...mapGetters(["promos"]),
   },
   methods: {
      ...mapActions(["getPromos"]),
      chooseImage() {
         this.$refs.inputimage.click();
      },
      inputImage(event) {
         this.uploadValue = 0;
         this.imgView = null;
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
      addProduct() {
         this.addproduct.image = this.imgView;
         this.addproduct.promo = this.checkedPromo;

         axios
            .post(
               "https://franchise-backend.herokuapp.com/products",
               this.addproduct
            )
            .then(() => {
               this.$router.push({
                  path: "/products-page",
               });
               this.$toast.success(
                  this.addproduct.name + " Berhasil ditambahkan ke Products!",
                  {
                     type: "success",
                     position: "top-right",
                     duration: 3000,
                     dismissible: true,
                  }
               );
            })
            .catch((error) => console.log(error));
      },
   },
   created() {
      this.getPromos();
   },
};
</script>

<style>
.list-group-item {
   display: block;
   min-width: 620px;
   cursor: pointer;
}

.list-group-item:hover {
   background: rgba(163, 241, 163, 0.39);
}
</style>
