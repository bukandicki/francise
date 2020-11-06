<template>
   <section class="sales-page">
      <div class="container-fluid pt-5">
         <h2 class="mb-4">Riwayat Penjualan</h2>
         <table class="table table-bordered">
            <thead>
               <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Pembeli</th>
                  <th scope="col">No Meja</th>
                  <th scope="col">Tanggal Order</th>
                  <th scope="col">Nama Toko</th>
                  <th scope="col">Nama Produk</th>
                  <th scope="col">Total</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(items, index) in dataSales" :key="items.id">
                  <th scope="row">{{ index +1 }}</th>
                  <td>{{ items.name }}</td>
                  <td>{{ items.tableCode }}</td>
                  <td>{{ items.dateOrder }}</td>
                  <td>{{ items.store.name }}</td>
                  <td>
                     <ul>
                        <li>{{ items.product.map((product) => {return product.name}).join(', ') }}</li>
                     </ul>
                  </td>
                  <td>{{ items.total }}</td>
               </tr>
            </tbody>
               <tr class="border-0">
                  <td colspan="5" class="border-0"></td>
                  <td class="font-weight-bold border-0">Total Penjualan</td>
                  <td class="font-weight-bold border-0">{{ grandTotaling() }}</td>
               </tr>
         </table>
      </div>
   </section>
</template>

<script>
   import axios from 'axios'
   export default {
      name: 'SellingPage',
      data() {
         return {
            dataSales: []
         }
      },
      methods: {
         getSalesData(data) {
            this.dataSales = data
         },
         grandTotaling() {
            let totaling = this.dataSales.reduce((index, pricetotal) => {
               return index + pricetotal.total
            })

            return totaling
         }
      },
      created() {
         axios
            .get('http://localhost:3000/penjualan')
            .then((response) => this.getSalesData(response.data))
            .catch((error) => console.log(error))
      },
   }
</script>

<style>
   ul {
      list-style: none;
      padding: 0;
   }
</style>