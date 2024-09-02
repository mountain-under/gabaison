<template>
  <div class="bottom-navigation">
    <div class="nav-item">
      <router-link to="/" class="nav-link">
        <img src="@/assets/icons/home-icon.png" alt="ホーム" />
        <span>ホーム</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/user-info" class="nav-link">
        <img src="@/assets/icons/user-info-icon.png" alt="ユーザ情報" />
        <span>ユーザ情報</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/couponlist" class="nav-link">
        <img src="@/assets/icons/coupon-icon.png" alt="クーポン" />
        <span>クーポン</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/team-data" class="nav-link">
        <img src="@/assets/icons/team-data-icon.png" alt="チームデータ" />
        <span>チームデータ</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/settings" class="nav-link">
        <img src="@/assets/icons/settings-icon.png" alt="アプリ設定" />
        <span>アプリ設定</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomNavigation"
};
</script>

<style scoped>
.bottom-navigation {
  position: fixed;
  margin: auto;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #f0f0f0;
  border-top: 1px solid #ccc;
  padding: 10px 0;
}

.nav-item {
  width: 25%;
  text-align: center;
  font-size: 9.5pt;
  display: inline
}

.nav-link {
  display: grid;
  place-items: center;
  height: 100%;
}

.nav-item a {
  color: rgb(75, 75, 75);
  text-decoration: none;
}

.nav-item img {
  width: 30%;
  margin-bottom: 10px;
}

.nav-item.active {
  color: #1e90ff;
}

.nav-item.active img {
  filter: hue-rotate(200deg);
}
</style>
