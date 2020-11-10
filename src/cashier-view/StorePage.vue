<template>
   <section class="store-page pb-5">
      <div class="container pt-5">
         <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
               <li class="breadcrumb-item">
                  <router-link to="/cashier-page">Store</router-link>
               </li>
               <li class="breadcrumb-item active" aria-current="page">
                  {{ partner.name }}
               </li>
            </ol>
         </nav>

         <div
            class="jumbotron jumbotron-fluid p-0 jumbotron-store-image shadow"
         >
            <div class="store-name">
               <h1 class="m-0">{{ partner.name }}</h1>
               <h6 class="m-0 text-warning">
                  {{ partner.location.street_name }},
                  {{ partner.location.city }}, {{ partner.location.province }},
                  {{ partner.location.post_code }}
               </h6>
            </div>
            <div class="store-image-wide">
               <img
                  class="img-fluid"
                  :src="partner.store_image"
                  alt=""
                  srcset=""
               />
            </div>
         </div>

         <h1 class="mt-5">
            Partner <strong class="text-warning">Product</strong>
         </h1>

         <div v-if="partner.product.length" class="row mt-5">
            <div
               class="col-lg-4 col-md-4 col-sm-6 col"
               v-for="item in product"
               :key="item.id"
            >
               <CardProducts
                  :products="item"
                  :promo_partner="partner.store_promo"
                  :partner_id="partner.id"
               />
            </div>
         </div>
         <div v-else class="text-center my-5 py-5">
            <h1>
               Toko ini <strong class="text-primary">belum</strong> menjual
               produk apapun
            </h1>
         </div>
      </div>
   </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardProducts from "@/cashier-components/CardProducts.vue";

export default {
   name: "StorePage",
   components: {
      CardProducts,
   },
   computed: {
      ...mapGetters(["partner", "product"]),
   },
   methods: {
      ...mapActions([
         "getPartners",
         "getPartner",
         "getProducts",
         "getProductProfile",
      ]),
   },
   created() {
      this.getPartners();
      this.getProducts();
      this.getPartner(this.$route.params.id);
      this.getProductProfile(this.partner.product);
   },
};
</script>

<style>
.action-partner {
   top: 20px;
   right: 20px;
   z-index: 2;
}
</style>
