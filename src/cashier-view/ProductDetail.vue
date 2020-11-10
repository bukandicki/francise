<template>
   <section class="product-detail">
      <div class="container pt-5">
         <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
               <li class="breadcrumb-item" v-if="partner && partner.id">
                  <router-link :to="'/store-profile/' + partner.id">{{
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
               <div class="d-flex align-items-center mb-3">
                  <h2 class="m-0 d-inline p-0">
                     <strong>{{ product.name }}</strong>
                  </h2>
                  <span
                     v-if="partner && partner.store_promo"
                     class="badge badge-warning mr-2 p-2 ml-2 align-self-center"
                     >{{ promo_partner.name }}</span
                  >
                  <span
                     v-else-if="product.promo != false"
                     class="badge badge-primary p-2 ml-2 align-self-center"
                     >{{ promo_id.name }}</span
                  >
               </div>
               <h3 class="d-block mb-5" v-if="partner && partner.store_promo">
                  <strike class="text-danger small"
                     >Rp{{ product.price }}</strike
                  >
                  Rp{{
                     product.price -
                        product.price * (parseInt(promo_partner.amount) / 100)
                  }}
               </h3>
               <h2 class="d-block mb-5" v-else>
                  <strike class="text-danger small"
                     >Rp{{ product.price }}</strike
                  >
                  <strong class="ml-2"
                     >Rp{{
                        product.price -
                           product.price * (parseInt(promo_id.amount) / 100)
                     }}</strong
                  >
               </h2>
               <div class="form-group d-flex">
                  <button @click="reduceQty" class="btn btn-success">
                     <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-dash-circle"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                           fill-rule="evenodd"
                           d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                        />
                     </svg>
                  </button>
                  <input
                     type="text"
                     v-model="qty"
                     class="form-control w-25 mx-2 text-center"
                  />
                  <button @click="addQty" class="btn btn-success">
                     <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-plus-circle"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                           fill-rule="evenodd"
                           d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                        />
                     </svg>
                  </button>
               </div>
               <button
                  class="btn btn-primary rounded-pill mt-2"
                  @click="addToCart"
               >
                  Add To Cart
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
   name: "ProductDetailStore",
   props: ["idp"],
   data() {
      return {
         promo_id: [],
         promo_partner: [],
         isCartItems: false,
         products: {
            cart_items: [],
         },
         qty: 1,
      };
   },
   computed: {
      ...mapGetters(["product", "promos", "promo", "partner", "cart"]),
      cartCondition() {
         return this.cart.cart_items;
      },
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
      addToCart() {
         let checkCart = {
            ...this.cart,
         };

         const selected = this.cartCondition.find(
            (cart) => cart.product.id == this.$route.params.id
         );

         if (this.cartCondition !== 0 && selected != undefined) {
            selected.qty += this.qty;
            checkCart.cart_items.map((product) => {
               if (product.id == selected.product.id) {
                  product = selected.qty;
               }

               return product;
            });

            axios
               .put("https://franchise-backend.herokuapp.com/cart/", checkCart)
               .then(() => {
                  swal(
                     "Jumlah produk " +
                        this.product.name +
                        " di tambah " +
                        this.qty +
                        " pcs",
                     {
                        icon: "success",
                     }
                  );
               })
               .catch((error) => console.log(error));
         } else {
            const date = new Date()
               .toString()
               .split(" ")
               .splice(1, 4)
               .join(" ");
            this.products = {
               ...this.cart,
            };
            this.products.cart_items.push({
               product: {
                  ...this.product,
                  promo: this.promo_id,
               },
               qty: this.qty,
            });
            this.products.store = {
               ...this.partner,
               store_promo: this.promo_partner,
            };
            this.products.date = date;

            axios
               .post(
                  "https://franchise-backend.herokuapp.com/cart/",
                  this.products
               )
               .then(() => {
                  swal(this.product.name + " Ditambahkan ke keranjang anda!", {
                     icon: "success",
                  });
               })
               .catch((error) => console.log(error));
         }
      },
      addQty() {
         if (this.qty < this.product.stock) {
            return this.qty++;
         } else {
            this.$toast.success(
               "Maaf stock " + this.product.name + " terbatas ",
               {
                  type: "error",
                  position: "top-right",
                  duration: 3000,
                  dismissible: true,
               }
            );
         }
      },
      reduceQty() {
         if (this.qty != 1) {
            return this.qty--;
         } else {
            this.$toast.success("Minimal pembelian 1 Pcs", {
               type: "error",
               position: "top-right",
               duration: 3000,
               dismissible: true,
            });
         }
      },
   },
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
