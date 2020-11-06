<template>
    <section class="home-pages">
        <div class="jumbotron jumbotron-fluid py-0">
            <img class="img-fluid" src="https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80" alt="">
            <div class="container-fluid text-center">
                <h1 class="text-success display-4"><strong>Bergabung bersama kami</strong></h1>
                <p class="text-white">Kami menyediakan berbagai kebutuhan produk anda</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Home'
    }
</script>
<style scoped>
    .jumbotron
    {
        height: 70vh;
        position: relative;
    }
    .jumbotron::after
    {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        backdrop-filter: brightness(35%);
        z-index: 2;
    }
    .jumbotron img
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .container-fluid
    {
        position: absolute;
        top: 40%;
        left: 0;
        z-index: 3;
    }
</style>