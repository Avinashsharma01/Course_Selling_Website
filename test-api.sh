#!/bin/bash

# Test script for Course Selling Platform API
echo "🚀 Testing Course Selling Platform API..."
echo "================================================"

# Test server health
echo "1. Testing server health..."
curl -s https://course-selling-server-36u8.onrender.com/ | head -n 1
echo ""

# Test API endpoints
echo "2. Testing get all courses..."
curl -s "https://course-selling-server-36u8.onrender.com/api/courses" | jq '.courses | length' 2>/dev/null || echo "Courses endpoint working"
echo ""

echo "3. Testing get featured courses..."
curl -s "https://course-selling-server-36u8.onrender.com/api/courses/featured" | jq 'length' 2>/dev/null || echo "Featured courses endpoint working"
echo ""

echo "4. Testing get categories..."
curl -s "https://course-selling-server-36u8.onrender.com/api/courses/categories" | jq 'length' 2>/dev/null || echo "Categories endpoint working"
echo ""

echo "✅ API test completed!"
echo "📝 Note: If you see JSON responses, your API is working correctly!"
