<template>
  <div class="title-conatiner">
    <div class="upper">ホーム</div>
    <div class="lower"></div>
  </div>

  <div class="body-conatiner">

  </div>
</template>

<script>
export default {
  name: "BingoLayout",
};
</script>

<style scoped>
html {
  padding: 0;
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
  height: 600px;
  flex-grow: 1;
  /*サガン鳥栖*/
  background-color: #CAE3EC;
  margin: 0;
  /*ヴィッセル神戸*/
  /* background-color: #D9D9D9; */
}
</style>