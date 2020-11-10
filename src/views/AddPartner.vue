<template>
   <div class="container">
      <div class="form-group mb-5 d-flex">
         <label class="insert-partner-image shadow" @click="chooseImage"
            >ADD STORE IMAGE</label
         >
         <input
            type="file"
            ref="inputfile"
            name="file"
            @change="setImage"
            class="form-control-file d-none"
            id="product-image"
         />
         <div class="image-viewer ml-4">
            <img
               v-if="imageData != null"
               :src="imgview"
               alt=""
               class="img-fluid"
               srcset=""
               id="show-image"
            />
         </div>
      </div>
      <div class="form-group">
         <label for="partner-name">Partner Name</label>
         <input
            type="text"
            v-model="addpartner.name"
            class="form-control"
            id="partner-name"
            placeholder="Bintang Store"
         />
      </div>
      <div class="form-group">
         <label for="partner-email">Partner Email</label>
         <input
            type="email"
            v-model="addpartner.email"
            class="form-control"
            id="partner-email"
            placeholder="example@email.com"
         />
      </div>
      <div class="form-group">
         <label for="street_name">Street Name</label>
         <input
            type="email"
            v-model="location.street_name"
            class="form-control"
            id="street_name"
            placeholder="Jl. Babakan Sari..."
         />
      </div>
      <div class="form-group d-flex align-items-center">
         <label for="partner-email" class="mr-3">Partner Location</label>
         <select v-model="location.province" class="d-block" name="" id="">
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="Jawa Timur">Jawa Timur</option>
            <option value="Jawa Tengah">Jawa Tengah</option>
         </select>
         <select v-model="location.city" class="d-block mx-2" name="" id="">
            <option value="Bandung">Bandung</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Yogyakarta">Yogyakarta</option>
         </select>
      </div>
      <div class="form-group">
         <label for="postcode">Pos Code</label>
         <input
            type="email"
            v-model="location.post_code"
            class="form-control"
            id="postcode"
            placeholder="75436"
         />
      </div>
      <ul class="list-group mb-5 pt-3">
         Product
         <li
            class="list-group-item px-3"
            v-for="item in products"
            :key="item.id"
         >
            <div class="form-check d-flex align-items-center">
               <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="checkedProducts"
                  :value="item.id"
                  :id="item.id"
               />
               <label
                  class="form-check-label w-100 d-flex ml-3 justify-content-between"
                  :for="item.id"
               >
                  <span>{{ item.name }}</span>
                  <span
                     class="badge badge-pill align-self-center p-2 badge-primary d-block ml-2 px-3"
                     >Rp. {{ numeralFormating(item.price) }}</span
                  >
               </label>
            </div>
         </li>
      </ul>
      <button class="btn btn-success" @click="addPartner">Confirm</button>
   </div>
</template>

<script>
import numeral from "numeral";
import axios from "axios";
import firebase from "firebase";

export default {
   name: "AddPartner",
   data() {
      return {
         imgview: null,
         imageData: null,
         addpartner: {
            name: "",
            email: "",
            store_image: "",
         },
         checkedProducts: [],
         products: [],
         location: {},
      };
   },
   methods: {
      getProduct(data) {
         this.products = data;
      },
      numeralFormating(num) {
         return numeral(num).format("0,0");
      },
      create() {
         const post = {
            image: this.imgview,
         };
         firebase
            .database()
            .ref("FoodsImage")
            .push(post)
            .then((response) => {
               console.log(response);
            })
            .catch((err) => {
               console.log(err);
            });
      },
      chooseImage() {
         this.$refs.inputfile.click();
      },
      setImage(event) {
         this.uploadValue = 0;
         this.imgview = null;
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
                  this.imgview = url;
               });
            }
         );
      },
      addPartner() {
         this.addpartner.product = this.checkedProducts;
         this.addpartner.location = this.location;
         this.addpartner.store_image = this.imgview;

         axios
            .post(
               "https://franchise-backend.herokuapp.com/partners",
               this.addpartner
            )
            .then(() => {
               this.$router.push({
                  path: "/partner-page",
               });
               this.$toast.success(
                  "Berhasil menambahkan partner " + this.addpartner.name + "!",
                  {
                     type: "success",
                     position: "top-right",
                     duration: 3000,
                     dismissible: true,
                  }
               );
               this.$router.push({
                  path: "/partner-page",
               });
               location.reload();
            })
            .catch((error) => console.log(error));
      },
   },
   mounted() {
      axios
         .get("https://franchise-backend.herokuapp.com/products")
         .then((response) => this.getProduct(response.data))
         .catch((error) => console.log(error));
   },
};
</script>

<style>
.list-group-item {
   display: flex;
   padding: 0 !important;
   width: 25em;
   cursor: pointer;
}
.list-group-item:hover {
   background: rgba(163, 241, 163, 0.39);
}
.list-group-item label {
   cursor: pointer;
   display: block;
   padding: 0.75rem;
}
.form-check input {
   margin: 0;
}
</style>
