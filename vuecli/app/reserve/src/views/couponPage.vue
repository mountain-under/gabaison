<template>
  <div class="coupon-container">
    <!-- Header -->
        <header class="header">
      <!-- ヘッダー画像を追加 -->
      <img :src="headerImageUrl" alt="Coupon Header" class="header-image">
    </header>
    

    <!-- Coupon Information -->
    <div class="coupon-info">
      <h2>クーポン取得が完了しました</h2>
      <p>佐賀でのお食事やお買い物をお楽しみください。</p>
      <div class="gray-background">
        <div class="points">
          <span class="points-amount">10%</span><span class="points-label">OFF 取得</span>
        </div>      
        <p class="expiry">使用期限：2024年9月5日 15:29まで</p>
      </div>
    </div>

    <!-- Button -->
    <a
      :href="googleMapsUrl"
      target="_blank"  
      rel="noopener noreferrer"  
    >
      <button class="coupon-button">対象店舗はこちら</button>
    </a>
    <!-- Notice -->
    <div class="notice">
      <ul>
        <li>キャンペーンポイントは、取得から72時間有効です。</li>
        <li>一部、ポイントが利用できない商品もございます。</li>
        <li>キャンペーンポイントをご利用いただけるコスメ取り扱いショップは
          <a href="#">こちら</a>よりご確認ください。</li>
        <li>本キャンペーンは、バナーが表示されたお客様のみ対象です。</li>
        <li>本企画のクーポン付与は、バナーが表示された当日中のみお一人様一回です。なお、ポイントのご利用はお一人様一回までと増します。</li>
        <li>本ページを閉じるもしくは、本ページよりほかのページへ遷移された場合、クーポン取得が出来なくなる場合がございます。</li>
        <!-- その他の注意書き... -->
      </ul>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <nav>
        <ul>
          <li>ホーム</li>
          <li>お気に入り</li>
          <li>探す</li>
          <li>ランキング</li>
          <li>計測・その他</li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'CouponPage',
  props: {
    couponId: String,  // couponIdをpropsとして受け取る
  },
  computed: {
    // couponIdに基づいてGoogle MapsのURLを動的に設定
    googleMapsUrl() {
      if (this.couponId === '1') {
        return 'http://maps.google.com/maps?q=佐賀牛レストラン季楽本店'; // couponIdが1の場合のURL
      } 
      if (this.couponId === '2') {
        return 'http://maps.google.com/maps?q=佐賀麦キッチン'; // その他のデフォルトのURL
      }
      else{
        return 'http://maps.google.com/maps?q=佐賀GRILLTAKESHITA';
      }
    },
    // couponIdに基づいてヘッダー画像のURLを動的に設定
    headerImageUrl() {
      //return require('@/assets/coupon-kira.png');
      if (this.couponId === '1') {
        return require('@/assets/header/kira.png'); // couponIdが1の場合の画像
      } 
      if (this.couponId === '2') {
        return require('@/assets/header/mugi.png'); // couponIdが2の場合の画像
      } 
      else {
        return require('@/assets/header/takeshita.png'); // デフォルトの画像
      }
    }
  },
  created() {
    console.log(this.couponId);
  },
};
</script>

<style scoped>
.coupon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0; /* コンテナのパディングを削除 */
  margin: 0; /* コンテナのマージンを削除 */
  background-color: #fff;
}

.notice ul {
  text-align: left; /* リスト全体を左揃えに設定 */
  padding-left: 20px; /* インデントを追加 */
  list-style: disc; /* デフォルトのリストスタイルにする（必要なら） */
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0;
}

.header-image {
  width: 100%;
  max-height: 200px;
}

.coupon-info {
  text-align: center;
  margin: 0px 0;
  margin-bottom: 15px;
}

.coupon-info h2 { /*クーポン取得が完了しました。*/
  margin: 29px 0; /* 上下のマージンを設定 */
  font-size: 16px; /* 必要に応じてフォントサイズを設定 */
}

.coupon-info p { /*佐賀でのお食事やお買い物をお楽しみください*/
  margin-bottom: 14.5px;
  font-size: 13px; /* 必要に応じてフォントサイズを設定 */
}

span.points-label {
  font-weight: bold; /* 太文字に設定 */
}


.points-amount {
  font-size: 36px;
  font-weight: bold;
  color: #000;
}

.coupon-button {/*対象店舗はこちら*/
  background-color: #00AEEF ;
  color: #fff;
  padding: 10px 100px;
  border: none;
  border-radius: 50px;
  margin: 0px 0;
  margin-bottom: 23px;
}

.notice { /*注意事項*/
  margin: 19px;
  color: #929292;
  font-size: 10px;
}

.footer {
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
}

.footer nav ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
}

.gray-background {
  background-color: #f5f5f5; /* 薄い灰色の背景色 */
  padding: 40px 49px; /* 内側の余白を追加 */
  border-radius: 10px; /* 角を少し丸める */
  text-align: center; /* テキストを中央揃えにする */
  margin: 0px 0px; /* 上下にマージンを追加 */
}

p.expiry {
  margin-bottom: 0; /* ボトムマージンを削除 */
}


</style>