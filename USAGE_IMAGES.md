# 真实图片功能使用指南

## 快速开始

### 1. 测试图片资源
打开 `TEST_IMAGES.html` 文件可以快速测试所有图片是否正确加载：

```bash
# 启动本地服务器
python3 -m http.server 8000

# 在浏览器中打开
http://localhost:8000/TEST_IMAGES.html
```

测试页面会显示：
- ✓ 所有图片的加载状态
- ✓ 图片的实际分辨率
- ✓ 加载成功/失败统计

### 2. 使用主系统

打开 `index.html` 即可体验真实图片功能：

```bash
http://localhost:8000/index.html
```

## 功能展示

### 📋 部件列表（系统分类视图）

在"部件认知"模块中，点击"系统分类"，你会看到：
- 每个电梯部件都配有真实图片
- 图片尺寸：150x180px
- 鼠标悬停时卡片会上浮，显示动画效果

**效果示例：**
```
┌─────────────────┐
│  [部件图片]      │  <- 真实照片
├─────────────────┤
│ 曳引机           │
│ 提供电梯运行的.. │
└─────────────────┘
```

### 🔍 部件详情（点击查看）

点击任意部件卡片，会弹出详情窗口：
- 显示部件的高清大图
- 图片尺寸：最大500x300px
- 包含完整的功能说明和维护要点

**效果示例：**
```
┌──────────────────────────┐
│                          │
│    [部件高清大图]          │
│                          │
├──────────────────────────┤
│  曳引机                   │
│  所属系统：曳引系统         │
│                          │
│  部件功能：               │
│  提供电梯运行的动力...     │
└──────────────────────────┘
```

### 🚨 应急场景展示

在"应急救援"模块中：
- 每个应急场景卡片顶部显示场景图片
- 图片尺寸：100%宽x200px高
- 点击"查看详情"显示更大的场景图

**效果示例：**
```
┌─────────────────────────┐
│  [应急场景图片]          │  <- 全宽显示
├─────────────────────────┤
│  乘客困梯救援             │
│  类型：困人救援           │
│  电梯在运行中突然停止...  │
│                         │
│  [开始演练] [查看详情]    │
└─────────────────────────┘
```

## 图片显示逻辑

系统采用智能回退机制：

```javascript
// 如果有图片，显示图片
${component.image ? 
    `<img src="${component.image}" ...>` : 
    `<span>${component.icon}</span>`  // 否则显示emoji
}
```

这意味着：
- ✅ 有图片时：显示真实照片
- ✅ 无图片时：显示emoji图标（向后兼容）
- ✅ 图片加载失败时：浏览器会显示alt文本

## 自定义和替换图片

### 添加新图片

1. **准备图片**
   - 格式：JPG 或 PNG
   - 建议尺寸：
     - 部件图：800x600px 或更大
     - 场景图：1200x800px 或更大
     - 工具图：600x600px 或更大

2. **放置图片**
   ```bash
   # 部件图片
   cp your-image.jpg images/components/new-component.jpg
   
   # 场景图片
   cp your-image.jpg images/scenarios/new-scenario.jpg
   ```

3. **更新代码**
   编辑 `script.js`，在相应的数组中添加/修改：
   
   ```javascript
   // 添加新部件
   const elevatorComponents = [
       // ... 其他部件
       {
           id: 21,
           name: '新部件名称',
           system: '所属系统',
           icon: '🔧',
           image: 'images/components/new-component.jpg',  // 图片路径
           position: { top: '100px', left: '50px' },
           description: '部件功能说明'
       }
   ];
   
   // 添加新场景
   const emergencyScenarios = [
       // ... 其他场景
       {
           id: 'new-scenario',
           name: '新场景名称',
           type: '场景类型',
           image: 'images/scenarios/new-scenario.jpg',  // 图片路径
           description: '场景描述',
           steps: [/* ... */],
           safetyNotes: [/* ... */]
       }
   ];
   ```

### 替换现有图片

只需用新图片覆盖旧文件，保持文件名不变：

```bash
# 例如：替换曳引机图片
cp new-traction-machine.jpg images/components/traction-machine.jpg
```

刷新浏览器即可看到新图片。

## 图片优化建议

### 1. 压缩图片

使用在线工具或命令行工具压缩图片：

```bash
# 使用 ImageMagick 压缩
convert input.jpg -quality 85 -resize 800x600 output.jpg

# 使用 jpegoptim
jpegoptim --max=85 --strip-all images/components/*.jpg
```

### 2. 使用 WebP 格式

WebP 格式比 JPEG 更小且质量更好：

```bash
# 转换为 WebP
cwebp -q 85 input.jpg -o output.webp
```

然后在代码中支持 WebP：

```javascript
image: 'images/components/component.webp'
```

### 3. 统一图片风格

为了更好的视觉效果，建议：
- 使用统一的图片背景（白色或浅灰色）
- 保持一致的拍摄角度
- 统一的光照条件
- 相似的构图方式

## 故障排除

### 图片不显示？

1. **检查文件路径**
   ```bash
   ls -l images/components/your-image.jpg
   ```

2. **检查文件权限**
   ```bash
   chmod 644 images/components/*.jpg
   ```

3. **检查浏览器控制台**
   打开浏览器开发者工具（F12），查看 Console 和 Network 标签

4. **检查图片格式**
   确保图片是有效的 JPG/PNG 格式

### 图片加载很慢？

1. **压缩图片**（见上方优化建议）

2. **使用 CDN**（可选）
   如果有条件，可以将图片托管到 CDN

3. **启用浏览器缓存**
   在 HTTP 服务器配置中启用缓存

### 图片比例不对？

CSS 使用 `object-fit: cover` 自动裁剪，如果比例不理想：

1. 调整原图比例
2. 或修改 CSS：
   ```css
   .component-image img {
       object-fit: contain;  /* 改为 contain 保持完整 */
   }
   ```

## 性能监控

使用测试页面监控图片加载：

```bash
# 打开测试页面
http://localhost:8000/TEST_IMAGES.html

# 查看统计信息
- 总图片数
- 加载成功数
- 加载失败数
- 图片分辨率
```

## 最佳实践

1. ✅ **定期备份原图**：保留高分辨率原图备份
2. ✅ **使用有意义的文件名**：如 `traction-machine.jpg` 而不是 `img001.jpg`
3. ✅ **保持目录结构**：不要随意移动或重命名目录
4. ✅ **测试后部署**：使用 TEST_IMAGES.html 测试后再发布
5. ✅ **版本控制**：使用 git 管理图片更新
6. ✅ **文档更新**：更新图片时同步更新 images/README.md

## 进阶技巧

### 1. 添加图片懒加载

```javascript
<img src="${component.image}" loading="lazy" alt="${component.name}">
```

### 2. 添加图片预览功能

可以集成 lightbox 库实现图片点击放大。

### 3. 支持多图展示

为每个部件添加多张图片（不同角度）：

```javascript
{
    id: 1,
    name: '曳引机',
    images: [
        'images/components/traction-machine-1.jpg',
        'images/components/traction-machine-2.jpg',
        'images/components/traction-machine-3.jpg'
    ]
}
```

## 技术支持

- 📧 查看 `images/README.md` 了解图片要求
- 📧 查看 `CHANGELOG_IMAGES.md` 了解更新历史
- 📧 使用 `TEST_IMAGES.html` 测试图片加载

---

**享受真实图片带来的更好教学体验！** 🎓
