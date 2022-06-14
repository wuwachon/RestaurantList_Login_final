# Restaurant List - final

![image](./localhost3000_screenshot.png)

## 軟體及模組版本

```
"bcryptjs": "^2.4.3"
"body-parser": "^1.20.0"
"connect-flash": "^0.1.1"
"dotenv": "^16.0.1"
"express": "^4.18.1"
"express-handlebars": "^4.0.2"
"express-session": "^1.17.3"
"method-override": "^3.0.0"
"mongoose": "^6.3.3"
"passport": "^0.6.0"
"passport-facebook": "^3.0.0"
"passport-google-oauth20": "^2.0.0"
"passport-local": "^1.0.0"
```

## 安裝及執行

- 下載至本地

```
git clone https://github.com/wuwachon/RestaurantList_Login_final.git
```

- 安裝相關套件

```
cd RestaurantList_Login_final
npm install
```

- 環境變數設定(`.env.example`檔案修改)

  1. 移除`.example`副檔名
  2. 修改 MONGODB_URI、FACEBOOK_ID、FACEBOOK_SECRET、GOOGLE_ID、GOOGLE_SECRET

- 匯入 seeder 檔案

```
npm run seed
```

- 執行專案

```
npm run dev
```

- 功能測試

1. Terminal 顯示 http://localhost:3000 即表示啟動完成，可至此網址網頁觀看畫面測試功能
2. 可自行註冊使用者或由 Facebook、Google 方式登入
3. 測試帳號可參考[users.json](./users.json)

## 專案功能描述

- 使用者可以手動註冊並登入新帳號
- 使用者註冊時，若已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
- 使用者登入時，若帳號為註冊過或密碼輸入錯誤，就登入失敗，並回應給使用者錯誤訊息
- 使用者可以直接由 Facebook 或 Google 帳號登入
- 使用者的密碼使用 bcrypt 來處理
- 使用者必須登入才能使用餐廳清單，建立並管理專屬他的一個餐廳清單
- 使用者未登入或登出時，會被導向登入頁面

- 使用者可以瀏覽資料庫儲存的餐廳清單
- 使用者可以以餐廳名稱或類別關鍵字搜尋特定餐廳
- 使用者可依餐廳名稱、類別、地區排序瀏覽畫面
- 使用者可以新增、瀏覽、修改、刪除一家餐廳

## 練習技巧

- express-session 與 passport strategies 管理本地及第三方網頁登入登出狀態
- connect-flash 與 middleware 處理暫存訊息
- Schema.Types.ObjectId 與 ref 設定兩個 collection 之間的關聯性
- bcrypt.js 密碼加密處理
- process.env 變數應用
