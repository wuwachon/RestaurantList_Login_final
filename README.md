# Restaurant List - v2

_CRUD & MongoDB Practice_
![image](./localhost3000_screenshot.png)

## 軟體及模組版本

```
"express": "V4.18.1"
"express-handlebars": "V4.0.2"
"mongoose": "V6.3.3"
"body-parser": "V1.20.0"
"bootstrap": "V5.1.3"
"popper": "V2.9.1"
"font awesome": V6.1.1"
"dotenv": "V16.0.1"
```

## 安裝及執行

- 下載至本地

```
git clone https://github.com/wuwachon/RestaurantList_CRUD_v2
```

- 安裝相關套件

```
cd RestaurantList_CRUD_v2
npm install
```

- 本地 MongoDB 資料庫

  1. 修改`.env.example`檔案內 MONGODB_URI 使用者名稱及密碼等參數並移除`.example`副檔名

  2. 匯入 seeder 檔案

```
npm run seed
```

- 執行專案

```
npm run dev
```

Terminal 顯示 http://localhost:3000 即表示啟動完成，可至此網址網頁觀看畫面測試功能

## 專案功能描述

- 使用者可以瀏覽資料庫儲存的餐廳清單
- 使用者可以以餐廳名稱或類別關鍵字搜尋特定餐廳
- 使用者可以新增、瀏覽、修改、刪除一家餐廳

## 練習技巧

- MongoDB 的種子資料設定
- 練習 Express 與 mongoose 如何完成 CRUD 及 搜尋功能 的語法
- 合理的 handlebars 檔案撰寫
- git commit message 的粒度
