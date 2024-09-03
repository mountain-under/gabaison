<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div class="title-conatiner">
    <div class="upper">ホーム</div>
    <div class="lower"></div>
  </div>

  <div class="body-conatiner">
    <img loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a735cab541df0a2ebb0694177468ec5832da1c6e573c68524985aa4fcd7d7fdf?"
      class="QRbutton" @click="goToQrpage" />
  </div>

</template>

<script>
export default {
  name: "BingoLayout",
  methods: {
    goToQrpage() {
      this.$router.push("/qrcode");
    },
  },
};
</script>

<style scoped>
html {
  padding: 0;
}


.img {
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 213px;
  height: 213px;
  margin-top: 30px;
  max-width: 100%;
  border-radius: 5px;
}

.title-conatiner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upper {
  width: 100%;
  /*サガン鳥栖*/
  background-color: #00A0D2;
  color: white;
  /*ヴィッセル神戸*/
  /* background-color: #FFFFFF; */
  /* color: #A40931; */

  text-align: center;
  font-size: 24px;
  padding: 10px 0;
}

.lower {
  width: 100%;
  height: 20px;

  /*サガン鳥栖*/
  background-color: #EC80B4;
  /*ヴィッセル神戸*/
  /* background-color: #000000; */
}

.body-conatiner {
  width: 100%;
  height: 1000px;
  flex-grow: 1;
  /*サガン鳥栖*/
  background-color: #CAE3EC;
  margin: 0;
  /*ヴィッセル神戸*/
  /* background-color: #D9D9D9; */
}

.QRbutton {
  height: 100px;
  width: 100px;
  position: absolute;
  bottom: 100px;
  right: 10px;
  border-radius: 50%;
  z-index: 10;
}
</style>