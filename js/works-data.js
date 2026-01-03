// js/works-data.js
// 作品資料庫（前端版）— 不用連資料庫，直接用 JS 陣列維護

window.WORKS = [
  {
    id: "work-001",
    title: "作品名稱 A",
    artist: "姓名 A",
    year: "2025",
    medium: "複合媒材／影像",
    size: "60 × 90 cm",
    cover: "images/works/sample-1.jpg",   // 清單卡片圖
    hero:  "images/works/sample-1.jpg",   // 詳細頁 16:9 圖
    desc: [
      "這件作品在談……（可用多段文字）",
      "第二段：補充作品概念、觀看方式或製作方法。"
    ]
  },
  {
    id: "work-002",
    title: "作品名稱 B",
    artist: "姓名 B",
    year: "2025",
    medium: "攝影／輸出",
    size: "A2",
    cover: "images/works/sample-2.jpg",
    hero:  "images/works/sample-2.jpg",
    desc: [
      "作品敘述……"
    ]
  },
  {
    id: "work-003",
    title: "作品名稱 C",
    artist: "姓名 C",
    year: "2025",
    medium: "裝置／聲音",
    size: "可變尺寸",
    cover: "images/works/sample-3.jpg",
    hero:  "images/works/sample-3.jpg",
    desc: [
      "作品敘述……"
    ]
  }
];
