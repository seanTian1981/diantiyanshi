#!/bin/bash

# 电梯教学演示系统 - 快速演示脚本

echo "======================================"
echo "  电梯教学演示系统 - 演示模式"
echo "======================================"
echo ""
echo "系统信息："
echo "- 纯前端技术（HTML + CSS + JavaScript）"
echo "- 零依赖，无需安装"
echo "- 响应式设计，支持所有设备"
echo ""

# 检查Python是否安装
if command -v python3 &> /dev/null; then
    echo "✓ 检测到 Python 3"
    echo ""
    echo "正在启动本地Web服务器..."
    echo "服务器地址: http://localhost:8000"
    echo ""
    echo "按 Ctrl+C 停止服务器"
    echo ""
    echo "======================================"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✓ 检测到 Python 2"
    echo ""
    echo "正在启动本地Web服务器..."
    echo "服务器地址: http://localhost:8000"
    echo ""
    echo "按 Ctrl+C 停止服务器"
    echo ""
    echo "======================================"
    python -m SimpleHTTPServer 8000
else
    echo "❌ 未检测到 Python"
    echo ""
    echo "请使用以下方式之一打开系统："
    echo "1. 直接双击 index.html 文件"
    echo "2. 安装 Python 后运行此脚本"
    echo "3. 使用其他 Web 服务器（如 Node.js http-server）"
    echo ""
    echo "或者直接在浏览器中打开 index.html 文件"
    echo ""
fi
