<template>
  <div id="app">
    <h1>ビンゴゲーム</h1>
    <div class="bingo-grid">
      <div
        v-for="(cell, index) in bingoNumbers"
        :key="index"
        :class="['bingo-cell', { selected: selectedNumbers.includes(index) }]"
        @click="selectNumber(index)"
      >
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bingoNumbers: this.generateBingoNumbers(),
      selectedNumbers: []
    };
  },
  methods: {
    generateBingoNumbers() {
      const numbers = [];
      for (let i = 1; i <= 25; i++) {
        numbers.push(i);
      }
      return this.shuffleArray(numbers);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    selectNumber(index) {
      if (!this.selectedNumbers.includes(index)) {
        this.selectedNumbers.push(index);
      }
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-gap: 10px;
  justify-content: center;
}

.bingo-cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

.bingo-cell.selected {
  background-color: #ffcc00;
  border-color: #ff9900;
}
</style>
