# Performance Optimization TODO

## High Priority
- [x] Remove artificial 3-second loader delay in App.jsx
- [x] Add lazy loading for Hero images
- [x] Add lazy loading for Gallery videos
- [x] Preload critical assets in index.html
- [x] Optimize images (convert to WebP, compress)
- [x] Optimize videos (compress, lazy load)

## Medium Priority
- [x] Remove or async load Bootstrap JS
- [x] Optimize CSS (remove unused styles)
- [x] Add service worker for caching
- [x] Update Vite config for better chunking

## Low Priority
- [ ] Tree shake dependencies
- [ ] Add image optimization plugin to Vite
- [ ] Test load times after optimizations

## New Performance Optimizations
- [x] Convert images to WebP and compress using imagemin-cli
- [x] Add lazy loading to all images in components
- [x] Load Bootstrap CSS asynchronously
- [x] Implement lazy loading for Hero slideshow (first 3 images preloaded, others lazy loaded)
- [ ] Compress videos (consider using WebM or MP4 compression tools)
- [x] Remove CLS-causing scroll behavior in App.jsx
- [x] Update preloads in index.html
- [x] Build and check bundle sizes (ui: 150KB, firebase: 153KB, main: 197KB - could be optimized further)
