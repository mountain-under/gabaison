<template>
    <div id="app">
      <h1>ビンゴゲーム</h1>
      <div class="bingo-grid">
        <div
          v-for="(cell, index) in bingoCells"
          :key="index"
          :class="['bingo-cell']"
          @click="selectNumber(index, cell)"
          :style="{ backgroundImage: `url(${getImageForType(cell.type)})` }"
        >
          <span class="cell-number">{{ cell.number }}</span>
        </div>
      </div>
  
      <div v-if="showPopup" class="popup-overlay" @click="closePopup">
        <div class="popup">
          <p>番号 {{ selectedNumber.number }} が選択されました！</p>
          <p>タイプ {{ selectedNumber.type }} が選択されました！</p>
          <button @click="closePopup">OK</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bingoCells: this.generateBingoCells(),
        showPopup: false,
        selectedNumber: null
      };
    },
    methods: {
      generateBingoCells() {
        const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
        const shuffledNumbers = this.shuffleArray(numbers);
        const types = [1, 2, 3];
        return shuffledNumbers.map(number => ({
          number,
          type: types[Math.floor(Math.random() * types.length)]
        }));
      },
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      selectNumber(index, cell) {
        this.selectedNumber = cell;
        this.showPopup = true;
      },
      closePopup() {
        this.showPopup = false;
      },
      getImageForType(type) {
        // タイプに応じた画像パスを返す
        switch (type) {
          case 1:
            return require('@/assets/bingo-saganT.png');
          case 2:
            return require('@/assets/bingo-visselT.png');
        //   case 'C':
        //     return require('@/assets/typeC.png');
          default:
            return '';
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
    background-size: cover; /* 背景画像をセルのサイズに合わせる */
    background-position: center;
    border: 2px solid #ccc;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    transition: background-color 0.3s, transform 0.3s;
    color: white; /* 数字の色を白に設定 */
    text-shadow: 1px 1px 2px black; /* 数字の視認性を高めるための影 */
  }
  
  .bingo-cell:hover {
    background-color: rgba(0, 0, 0, 0.2); /* 画像の上にホバー効果を適用 */
    transform: scale(1.1);
  }
  
  .bingo-cell.selected {
    background-color: rgba(255, 204, 0, 0.6); /* 画像の上に選択時の背景色を適用 */
    border-color: #ff9900;
  }
  
  .cell-number {
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px black; /* 数字の視認性を高めるための影 */
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 300px;
    animation: popup-show 0.3s ease-out;
  }
  
  .popup p {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .popup button {
    background-color: #ffcc00;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .popup button:hover {
    background-color: #ff9900;
  }
  
  @keyframes popup-show {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  </style>
  