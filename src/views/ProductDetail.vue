<template>
   <section class="product-detail">
      <div class="container pt-5">
         <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
               <li class="breadcrumb-item" v-if="!partner">
                  <router-link to="/">Home</router-link>
               </li>
               <li class="breadcrumb-item" v-if="partner">
                  <router-link to="/partner-page">Partner</router-link>
               </li>
               <li class="breadcrumb-item" v-if="partner && partner.id">
                  <router-link :to="'/partner-page/' + partner.id">{{
                     partner.name
                  }}</router-link>
               </li>
               <li class="breadcrumb-item" v-if="!partner">
                  <router-link to="/products-page">Products</router-link>
               </li>
               <li class="breadcrumb-item active" aria-current="page">
                  {{ product.name }}
               </li>
            </ol>
         </nav>
         <div class="row">
            <div class="col-md-5">
               <img
                  :src="product.image"
                  alt=""
                  class="img-fluid shadow"
                  style="border-radius: 1.5em"
               />
            </div>
            <div class="col-md-7">
               <h2 class="m-0">
                  <strong>{{ product.name }}</strong>
               </h2>
               <span
                  v-if="partner && partner.store_promo"
                  class="badge badge-warning mr-2 p-2 mb-4 mt-1"
                  >{{ promo_partner.name }}</span
               >
               <span
                  v-else-if="product.promo != false"
                  class="badge badge-primary p-2 mb-4 mt-1"
                  >{{ promo_id.name }}</span
               >
               <h4 class="d-block mb-5">
                  Harga : Rp{{ product.price }} / item
               </h4>
               <router-link
                  class="btn btn-primary"
                  :to="'/edit-product/' + product.id"
                  >Edit Product</router-link
               >
               <button class="btn btn-danger ml-2" @click="deleteProduct">
                  Hapus Produk
               </button>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
   name: "ProductDetail",
   props: ["idp"],
   data() {
      return {
         promo_id: [],
         promo_partner: [],
      };
   },
   computed: {
      ...mapGetters(["product", "promos", "promo", "partner"]),
   },
   methods: {
      ...mapActions([
         "getProducts",
         "getProduct",
         "getPromos",
         "getPartners",
         "getPartner",
      ]),
      getPromoId(id) {
         this.promo_id = this.$store.getters.promo(id);
      },
      getPromoPartner(id) {
         this.promo_partner = this.$store.getters.promo(id);
      },
      deleteProduct() {
         swal({
            title: "Apakah anda yakin?",
            text: "Produk yang dihapus tidak dapat di kembalikan!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
         }).then((Delete) => {
            if (Delete) {
               axios
                  .delete(
                     "https://franchise-backend.herokuapp.com/products/" +
                        this.$route.params.id
                  )
                  .then(() => {
                     swal("Produk berhasil dihapus!", {
                        icon: "success",
                     });
                     this.$router.push({
                        path: "/products-page",
                     });
                  })
                  .catch((error) => console.log(error));
            }
         });
      },
   },
   mounted() {},
   created() {
      this.getPartners();
      this.getProducts();
      this.getPromos();
      this.getPartner(this.idp);
      this.getProduct(this.$route.params.id);
      this.getPromoId(this.product.promo);

      if (this.partner) {
         this.getPromoPartner(this.partner.store_promo);
      }
   },
};
</script>

<style></style>
