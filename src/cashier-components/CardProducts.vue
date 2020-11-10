<template>
   <div class="card shadow mb-4">
      <div class="promo position-absolute">
         <span v-if="promo_partner" class="badge badge-warning rounded-0 p-2">{{
            promo_store.name
         }}</span>
         <span
            v-else-if="products.promo != false"
            class="badge badge-primary rounded-0 p-2"
            >{{ promo_id.name }}</span
         >
      </div>
      <div class="card-img-top">
         <img :src="products.image" class="product" alt="" />
      </div>
      <div class="card-body">
         <h5 class="card-title">
            {{ products.name }}
         </h5>
         <p class="card-text">IDR {{ getNumeral(products.price) }}</p>
         <routerLink
            v-if="partner_id"
            class="btn btn-warning font-weight-bold rounded-pill px-3 shadow mr-2"
            :to="'/detail-store-product/' + products.id + '/' + partner_id"
            >Check Product</routerLink
         >
         <button
            @click="addToCart"
            class="btn btn-primary font-weight-bold rounded-pill px-3 shadow"
         >
            <svg
               width="1em"
               height="1em"
               viewBox="0 0 16 16"
               class="bi bi-bag-fill"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fill-rule="evenodd"
                  d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
               />
            </svg>
         </button>
      </div>
   </div>
</template>

<script>
import numeral from "numeral";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import swal from "sweetalert";
export default {
   name: "CardProducts",
   props: ["products", "promo_partner", "partner_id"],
   computed: {
      ...mapGetters(["promos", "promo", "cart", "partner"]),
      cartCondition() {
         return this.cart.cart_items;
      },
   },
   data() {
      return {
         promo_id: {},
         promo_store: [],
         addProduct: {
            cart_items: [],
         },
      };
   },
   methods: {
      ...mapActions(["getPromos", "getPartners", "getPartner"]),
      fetchPromoProduct(id) {
         this.promo_id = this.$store.getters.promo(id);
      },
      fetchPromoStore(id) {
         this.promo_store = this.$store.getters.promo(id);
      },
      getNumeral(num) {
         return numeral(num).format("0,0");
      },
      addToCart() {
         let checkCart = {
            ...this.cart,
         };

         const selected = this.cartCondition.find(
            (cart) => cart.product.id == this.products.id
         );

         if (this.cartCondition.length !== 0 && selected != undefined) {
            selected.qty += 1;
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
                     "Jumlah produk " + this.products.name + " di tambah 1 pcs",
                     {
                        icon: "success",
                     }
                  );
                  this.$router.push({
                     path: "/cart-page",
                  });
               })
               .catch((error) => console.log(error));
         } else {
            const date = new Date()
               .toString()
               .split(" ")
               .splice(1, 4)
               .join(" ");
            this.addProduct = {
               ...this.cart,
            };
            this.addProduct.cart_items.push({
               ...{
                  product: {
                     ...this.products,
                     promo: this.promo_id,
                  },
                  qty: +1,
               },
            });
            this.addProduct.store = {
               ...this.partner,
               store_promo: this.promo_store,
            };
            this.addProduct.date = date;
            axios
               .post(
                  "https://franchise-backend.herokuapp.com/cart/",
                  this.addProduct
               )
               .then(() => {
                  swal(this.products.name + " Ditambahkan ke keranjang anda!", {
                     icon: "success",
                  });
                  this.$router.push({
                     path: "/cart-page/",
                  });
                  window.location.reload();
               })
               .catch((error) => console.log(error));
         }
      },
   },
   created() {
      this.getPromos();
      this.getPartners();
      this.getPartner(this.partner_id);
      this.fetchPromoProduct(this.products.promo);
      this.fetchPromoStore(this.promo_partner);
   },
};
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
   content: "";
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
