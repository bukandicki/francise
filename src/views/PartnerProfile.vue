<template>
   <section class="partner-profile pb-5">
      <div class="container pt-5">
         <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
               <li class="breadcrumb-item">
                  <router-link to="/">Home</router-link>
               </li>
               <li class="breadcrumb-item">
                  <router-link to="/partner-page">Partners</router-link>
               </li>
               <li class="breadcrumb-item active" aria-current="page">
                  {{ partner.name }}
               </li>
            </ol>
         </nav>

         <div
            class="jumbotron jumbotron-fluid p-0 jumbotron-store-image shadow"
         >
            <div class="action-partner position-absolute">
               <button
                  class="btn btn-danger btn-sm px-2 shadow small rounded-pill mr-2"
                  @click="deletePartner"
               >
                  <strong>Delete Partner</strong>
               </button>
               <routerLink
                  class="btn btn-success btn-sm px-2 shadow small rounded-pill"
                  :to="'/edit-partner/' + partner.id"
                  ><strong>Edit Profile</strong></routerLink
               >
            </div>
            <div class="store-name">
               <h1 class="m-0">{{ partner.name }}</h1>
               <h6 class="m-0 text-success">
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
            Partner <strong class="text-success">Product</strong>
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
               Toko ini <strong class="text-success">belum</strong> menjual
               produk apapun
            </h1>
         </div>
      </div>
   </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert";
import axios from "axios";
import CardProducts from "@/components/CardProducts.vue";

export default {
   name: "PartnerProfile",
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
      deletePartner() {
         swal({
            title: "Apakah anda yakin?",
            text: "Partner ini akan di hapus secara permanen!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
         }).then((willDelete) => {
            if (willDelete) {
               axios
                  .delete(
                     "https://franchise-backend.herokuapp.com/partners/" +
                        this.$route.params.id
                  )
                  .then(() => {
                     swal("Partner berhasil dihapus!", {
                        icon: "success",
                     });
                     this.$router.push({
                        path: "/partner-page",
                     });
                  })
                  .catch((error) => console.log(error));
            }
         });
      },
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
