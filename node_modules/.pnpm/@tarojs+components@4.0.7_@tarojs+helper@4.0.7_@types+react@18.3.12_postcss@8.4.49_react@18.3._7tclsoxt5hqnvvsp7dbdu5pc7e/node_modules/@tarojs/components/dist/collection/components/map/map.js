import { h, Host } from '@stencil/core';
import Hammer from 'hammerjs';
export class Map {
  constructor() {
    this.currentRotation = 0;
    /* 获取当前地图中心的经纬度 */
    this._getCenterLocation = (option) => {
      // 遍历当前的覆盖物，找到之前添加的中心点图标并删除它
      this.map.getOverlays().forEach((overlay) => {
        if (overlay instanceof BMapGL.Marker && overlay.isCenterMarker) {
          this.map.removeOverlay(overlay);
        }
      });
      // 创建自定义图标并设置图标位置
      option.iconPath = 'https://img0.baidu.com/it/u=2604176863,3349829508&fm=253&fmt=auto&app=138&f=PNG?w=243&h=243';
      const icon = new BMapGL.Icon(option.iconPath, new BMapGL.Size(20, 30));
      // 将经纬度从BD09转换为GCJ02
      const gcj02Point = [this.longitude, this.latitude];
      const marker = new BMapGL.Marker(new BMapGL.Point(this.longitude, this.latitude), { icon });
      marker.isCenterMarker = true; // 标记该覆盖物是中心点图标
      // 添加新的图标
      this.map.addOverlay(marker);
      return gcj02Point;
    };
    /* 设置定位点图标，支持网络路径、本地路径、代码包路径 */
    this._setLocMarkerIcon = (option) => {
      // 创建自定义图标
      const icon = new BMapGL.Icon(option.iconPath, new BMapGL.Size(20, 30));
      // 创建定位点并设置图标
      const point = new BMapGL.Point(116.404, 39.915);
      const marker = new BMapGL.Marker(point, { icon });
      this.map.addOverlay(marker);
    };
    /* 平移marker，带动画 */
    this._translateMarker = (option) => {
      let latitude = option.destination.latitude;
      const longitude = option.destination.longitude;
      if (latitude < -80 && latitude >= -90) {
        latitude = option.destination.latitude + 10;
      }
      const destinationPoint = new BMapGL.Point(longitude, latitude);
      const obj = {
        flagId: true,
        flagCoordinate: true // 标记是否有有效经纬度
      };
      const animationEndResult = {
        errMsg: 'animationEnd:ok',
      };
      // 获取所有覆盖物
      const overlays = this.map.getOverlays();
      // 查找指定 id 的 Marker 对象
      const targetMarker = overlays.find((overlay) => overlay instanceof BMapGL.Marker && overlay.id === option.markerId);
      if (!targetMarker) {
        console.error(`Marker "${option.markerId}" not found.`);
        obj.flagId = false;
        return obj;
      }
      if (latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180 || isNaN(latitude) || isNaN(longitude)) {
        obj.flagCoordinate = false;
        return obj;
      }
      // 计算平移步长
      const startLngLat = targetMarker.getPosition();
      const step = {
        lng: (destinationPoint.lng - startLngLat.lng) / (option.duration / 16),
        lat: (destinationPoint.lat - startLngLat.lat) / (option.duration / 16), // 每帧移动的纬度增量
      };
      // 计算旋转角度的步长
      const startRotation = targetMarker.getRotation(); // 获取起始旋转角度
      const targetRotation = option.rotate; // 设置目标旋转角度
      if (!this.currentRotation) {
        this.currentRotation = targetRotation;
      }
      else {
        this.currentRotation += targetRotation;
      }
      const rotationStep = (this.currentRotation - startRotation) / (option.duration / 16);
      // 执行平移动画
      let currentLngLat = startLngLat;
      let currentRotation = startRotation;
      if (!option.moveWithRotate && option.autoRotate) {
        let currentFrame = 0; // 用于平移动画的计数器
        // 执行平移动画
        const animationInterval = setInterval(() => {
          currentLngLat = new BMapGL.Point(currentLngLat.lng + step.lng, currentLngLat.lat + step.lat);
          targetMarker.setPosition(currentLngLat);
          currentFrame++;
          if (currentFrame >= option.duration / 16) {
            clearInterval(animationInterval);
            let rotationFrame = 0; // 用于旋转动画的计数器
            // 在到达目的地后执行旋转动画
            const rotationInterval = setInterval(() => {
              currentRotation += rotationStep;
              targetMarker.setRotation(currentRotation);
              rotationFrame++;
              if (rotationFrame >= option.duration / 16) {
                clearInterval(rotationInterval); // 清除旋转动画的定时器
                option === null || option === void 0 ? void 0 : option.animationEnd(animationEndResult);
              }
            }, 16);
          }
        }, 16);
      }
      else if (option.moveWithRotate && option.autoRotate) {
        let currentFrame = 0; // 定义局部变量
        const animationInterval = setInterval(() => {
          currentLngLat = new BMapGL.Point(currentLngLat.lng + step.lng, currentLngLat.lat + step.lat);
          targetMarker.setPosition(currentLngLat);
          currentRotation += rotationStep;
          targetMarker.setRotation(currentRotation);
          currentFrame++;
          if (currentFrame >= option.duration / 16) {
            clearInterval(animationInterval);
            option === null || option === void 0 ? void 0 : option.animationEnd(animationEndResult);
          }
        }, 16);
      }
      else if (option.moveWithRotate && !option.autoRotate) {
        let currentFrame = 0; // 定义局部变量
        const animationInterval = setInterval(() => {
          currentLngLat = new BMapGL.Point(currentLngLat.lng + step.lng, currentLngLat.lat + step.lat);
          targetMarker.setPosition(currentLngLat);
          currentFrame++;
          if (currentFrame >= option.duration / 16) {
            clearInterval(animationInterval);
            option === null || option === void 0 ? void 0 : option.animationEnd(animationEndResult);
          }
        }, 16);
      }
      return obj;
    };
    /* 缩放视野展示所有经纬度 */
    this._includePoints = (option) => {
      const bPoints = option.points.map((point) => new BMapGL.Point(point.longitude, point.latitude));
      const originalZoom = this.map.getZoom();
      const originalCenter = this.map.getCenter();
      const view = this.map.getViewport(bPoints);
      // 地图缩放后
      this.map.centerAndZoom(view.center, view.zoom);
      const bounds = this.map.getBounds();
      let flag = true;
      for (let i = 0; i < bPoints.length; i++) {
        if (!bounds.containsPoint(bPoints[i])) {
          this.map.centerAndZoom(originalCenter, originalZoom);
          flag = false;
          break;
        }
      }
      return flag;
    };
    /* 获取当前地图的视野范围 */
    this._getRegion = () => {
      // 获取地图当前视野范围
      const bounds = this.map.getBounds();
      const sw = bounds.getSouthWest(); // 西南角坐标
      const ne = bounds.getNorthEast(); // 东北角坐标
      return {
        southwest: { lat: sw.lat, lng: sw.lng },
        northeast: { lat: ne.lat, lng: ne.lng },
      };
    };
    /* 获取当前地图的旋转角 */
    this._getRotate = () => {
      // 获取地图当前旋转角度
      let rotation = this.rotate;
      if (rotation < 0 || rotation > 360) {
        rotation = 0;
      }
      return rotation;
    };
    /* 获取当前地图的倾斜角 */
    this._getSkew = () => {
      let Skew = this.skew;
      if (Skew < 0 || Skew > 40) {
        Skew = 0;
      }
      return Skew;
    };
    /* 获取当前地图的缩放级别 */
    this._getScale = () => {
      const Scale = this.scale;
      return Scale;
    };
    /* 设置地图中心点偏移，向后向下为增长 */
    this._setCenterOffset = (option) => {
      // 解构获取偏移量参数
      const [x, y] = option.offset;
      // 获取地图尺寸
      const mapSize = this.map.getSize();
      // 计算水平偏移量
      const offsetX = Math.max(0.25 * mapSize.width, Math.min(0.75 * mapSize.width, x * mapSize.width));
      // 计算垂直偏移量
      const offsetY = Math.max(0.25 * mapSize.height, Math.min(0.75 * mapSize.height, y * mapSize.height));
      // 创建像素坐标对象
      const pixel = new BMapGL.Pixel(offsetX, offsetY);
      // 将像素坐标转换为地理坐标
      const center = this.map.pixelToPoint(pixel);
      // 平移地图至指定中心点
      this.map.panTo(center);
    };
    /* 添加 marker */
    this._addMarkers = (option) => {
      if (option.clear) {
        // 清除地图上所有marker
        this.map.clearOverlays(this.markers);
      }
      option.markers.forEach((marker) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (marker.latitude && marker.longitude && marker.iconPath) {
          const pt = new BMapGL.Point(marker.longitude, marker.latitude);
          const markerObj = new BMapGL.Marker(pt, { enableClicking: true });
          this.map.addOverlay(markerObj);
          markerObj.id = marker.id; // 设置标记点的唯一标识符
          markerObj.alpha = marker.alpha;
          if (marker.zIndex) {
            markerObj.setZIndex(marker.zIndex);
          }
          if (marker.width && marker.height && marker.iconPath) {
            const icon = new BMapGL.Icon(marker.iconPath, new BMapGL.Size(marker.width, marker.height));
            markerObj.setIcon(icon);
          }
          else if (marker.iconPath) {
            const img = new Image();
            img.src = marker.iconPath;
            img.style.opacity = String(marker.alpha);
            img.onload = () => {
              const iconSize = new BMapGL.Size(img.width, img.height);
              const icon = new BMapGL.Icon(img.src, iconSize);
              icon.imageOffset = new BMapGL.Size(0, 0, marker.alpha || 1);
              markerObj.setIcon(icon);
            };
          }
          else {
            console.error('没有找到iconPath图片路径');
            return;
          }
          const rotate = marker.rotate ? marker.rotate : 0;
          if (rotate) {
            markerObj.setRotation(rotate);
          }
          if (marker.anchor) {
            const offsetX = ((_b = (_a = marker.anchor) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0) * (marker.width || 0);
            const offsetY = ((_d = (_c = marker.anchor) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0) * (marker.height || 0);
            markerObj.setOffset(new BMapGL.Size(offsetX, offsetY));
          }
          // 创建title
          if (!marker.callout && marker.title) {
            const hammer = new Hammer(this.mapRef); // 创建Hammer对象，绑定到地图容器
            hammer.on('tap', (e) => {
              // 使用tap事件替代click事件
              const touch = e.center;
              const x = touch.x;
              const y = touch.y;
              // 假设阈值为 10，表示点击距离小于 10 个像素时认为是点击到了标记点
              const threshold = 15;
              // 遍历标记点数组，计算触摸位置与每个标记点的距离
              option.markers.forEach((marker) => {
                // 通过class名获取地图容器
                const mapContainer = document.getElementsByClassName('bmap-container')[0];
                // 获取地图容器在屏幕上的偏移量
                const mapContainerRect = mapContainer.getBoundingClientRect();
                const mapOffsetX = mapContainerRect.left;
                const mapOffsetY = mapContainerRect.top;
                const point = new BMapGL.Point(marker.longitude, marker.latitude);
                const pixel = this.map.pointToPixel(point);
                const markerX = pixel.x + mapOffsetX;
                const markerY = pixel.y + mapOffsetY;
                // 计算触摸位置与标记点的距离
                const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2));
                if (distance < threshold && marker.id === markerObj.id) {
                  // 最近的标记点距离小于阈值，表示用户点击到了标记点
                  const content = `<div style="text-align:center">${marker.title}</div>`;
                  const infoWindow = new BMapGL.InfoWindow(content);
                  this.map.openInfoWindow(infoWindow, pt);
                }
              });
            });
          }
          if (marker.callout) {
            const offsetX = ((_e = marker.callout) === null || _e === void 0 ? void 0 : _e.anchorX) ? (_f = marker.callout) === null || _f === void 0 ? void 0 : _f.anchorX : 0; // 横向偏移量
            const offsetY = ((_g = marker.callout) === null || _g === void 0 ? void 0 : _g.anchorY) ? (_h = marker.callout) === null || _h === void 0 ? void 0 : _h.anchorY : 0; // 纵向偏移量
            // 创建气泡(callout)对象
            const callout = new BMapGL.InfoWindow(`<div style="
              padding: ${(_j = marker.callout) === null || _j === void 0 ? void 0 : _j.padding}px;
              color:${(_k = marker.callout) === null || _k === void 0 ? void 0 : _k.color};
              text-align:${(_l = marker.callout) === null || _l === void 0 ? void 0 : _l.textAlign};"
              >
             <p style="font-size:${(_m = marker.callout) === null || _m === void 0 ? void 0 : _m.fontSize}px">${((_o = marker.callout) === null || _o === void 0 ? void 0 : _o.content) || ''}</p>
             </div>`, {
              width: 200,
              height: 100,
              offset: new BMapGL.Size(offsetX - 24, offsetY - 20), // 设置偏移量
            });
            // 自定义属性存储气泡(callout)对象
            markerObj.callout = callout;
            // 将气泡(callout)对象绑定到标记(marker)对象上
            this.map.addOverlay(markerObj);
            if (((_p = marker.callout) === null || _p === void 0 ? void 0 : _p.display) === 'ALWAYS') {
              markerObj.callout.disableCloseOnClick();
              const point = markerObj.getPosition(); // 获取marker标记点的位置
              markerObj.callout.addEventListener('open', function () {
                var _a, _b, _c, _d;
                console.log(markerObj.callout);
                const infoWindowElement = document.querySelector('.BMap_bubble_pop');
                if (infoWindowElement) {
                  let triangle = infoWindowElement.querySelector('.triangle');
                  if (!triangle) {
                    // 如果不存在，则创建并添加新的三角形 div
                    triangle = document.createElement('div');
                    triangle.className = 'triangle'; // 添加一个类名以便日后查找
                    infoWindowElement.appendChild(triangle);
                  }
                  const img = document.querySelector('.BMap_bubble_pop>img');
                  if (img) {
                    img.setAttribute('style', `position: absolute;transform: translate(-50%, 0); top: ${point.lat - 100}px; left: ${point.lng - 20}px;display:none`);
                  }
                  const backgroundcolor = (_a = marker.callout) === null || _a === void 0 ? void 0 : _a.bgColor;
                  let borderWidth = ((_b = marker.callout) === null || _b === void 0 ? void 0 : _b.borderWidth) || 5;
                  const borderColor = (_c = marker.callout) === null || _c === void 0 ? void 0 : _c.borderColor;
                  const borderRadius = (_d = marker.callout) === null || _d === void 0 ? void 0 : _d.borderRadius;
                  // 确保边框大小不超过15
                  borderWidth = Math.min(borderWidth, 15);
                  triangle.setAttribute('style', `width:0;height:0;border-left:${borderWidth}px solid transparent;border-right:${borderWidth}px solid transparent;border-top:${borderWidth}px solid ${borderColor};position:absolute;left:83px;bottom:-${2 * borderWidth}px`);
                  infoWindowElement.setAttribute('style', `background-color:${backgroundcolor};top:${point.lat - 120}px; left:${point.lng - 100}px;position: absolute;border: ${borderWidth}px solid ${borderColor};border-radius:${borderRadius}px; `);
                }
              });
              this.map.openInfoWindow(markerObj.callout, pt);
            }
            else {
              const hammer = new Hammer(this.mapRef); // 创建Hammer对象，绑定到地图容器
              hammer.on('tap', (e) => {
                // 使用tap事件替代click事件
                const touch = e.center;
                const x = touch.x;
                const y = touch.y;
                // 假设阈值为 10，表示点击距离小于 10 个像素时认为是点击到了标记点
                const threshold = 15;
                // 遍历标记点数组，计算触摸位置与每个标记点的距离
                option.markers.forEach((marker) => {
                  // 通过class名获取地图容器
                  const mapContainer = document.getElementsByClassName('bmap-container')[0];
                  // 获取地图容器在屏幕上的偏移量
                  const mapContainerRect = mapContainer.getBoundingClientRect();
                  const mapOffsetX = mapContainerRect.left;
                  const mapOffsetY = mapContainerRect.top;
                  const point = new BMapGL.Point(marker.longitude, marker.latitude);
                  const pixel = this.map.pointToPixel(point);
                  const markerX = pixel.x + mapOffsetX;
                  const markerY = pixel.y + mapOffsetY;
                  // 计算触摸位置与标记点的距离
                  const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2));
                  if (distance < threshold && marker.id === markerObj.id) {
                    const point = markerObj.getPosition(); // 获取marker标记点的位置
                    markerObj.callout.addEventListener('open', function () {
                      var _a, _b, _c, _d;
                      console.log(markerObj.callout);
                      const infoWindowElement = document.querySelector('.BMap_bubble_pop');
                      if (infoWindowElement) {
                        let triangle = infoWindowElement.querySelector('.triangle');
                        if (!triangle) {
                          // 如果不存在，则创建并添加新的三角形 div
                          triangle = document.createElement('div');
                          triangle.className = 'triangle'; // 添加一个类名以便日后查找
                          infoWindowElement.appendChild(triangle);
                        }
                        const img = document.querySelector('.BMap_bubble_pop>img');
                        if (img) {
                          img.setAttribute('style', `position: absolute;transform: translate(-50%, 0); top: ${point.lat - 100}px; left: ${point.lng - 20}px;display:none`);
                        }
                        const backgroundcolor = (_a = marker.callout) === null || _a === void 0 ? void 0 : _a.bgColor;
                        let borderWidth = ((_b = marker.callout) === null || _b === void 0 ? void 0 : _b.borderWidth) || 5;
                        const borderColor = (_c = marker.callout) === null || _c === void 0 ? void 0 : _c.borderColor;
                        const borderRadius = (_d = marker.callout) === null || _d === void 0 ? void 0 : _d.borderRadius;
                        // 确保边框大小不超过15
                        borderWidth = Math.min(borderWidth, 15);
                        triangle.setAttribute('style', `width:0;height:0;border-left:${borderWidth}px solid transparent;border-right:${borderWidth}px solid transparent;border-top:${borderWidth}px solid ${borderColor};position:absolute;left:83px;bottom:-${2 * borderWidth}px`);
                        infoWindowElement.setAttribute('style', `background-color:${backgroundcolor};top:${point.lat - 120}px; left:${point.lng - 100}px;position: absolute;border: ${borderWidth}px solid ${borderColor};border-radius:${borderRadius}px; `);
                      }
                    });
                    // 最近的标记点距离小于阈值，表示用户点击到了标记点
                    this.map.openInfoWindow(markerObj.callout, pt);
                  }
                  else {
                    markerObj.callout.enableCloseOnClick();
                    // 用户点击到了地图上的其他位置，不是标记点
                  }
                });
              });
            }
          }
          // 判断是否有label属性
          if (marker.label) {
            const labelContent = marker.label.content || '';
            const labelOpts = {
              position: pt,
              offset: new BMapGL.Size(marker.label.anchorX || 0, marker.label.anchorY || 0),
            };
            const label = new BMapGL.Label(labelContent, labelOpts);
            // 设置标签样式
            label.setStyle({
              color: marker.label.color,
              fontSize: marker.label.fontSize + 'px',
              borderWidth: marker.label.borderWidth + 'px',
              borderColor: marker.label.borderColor,
              borderRadius: marker.label.borderRadius + 'px',
              background: marker.label.bgColor,
              padding: marker.label.padding + 'px',
            });
            markerObj.setLabel(label);
          }
        }
      });
    };
    /* 移除 marker */
    this._removeMarkers = (option) => {
      // 获取所有覆盖物
      const overlays = this.map.getOverlays();
      let newTargetMarker = {};
      option.markerIds.forEach((id) => {
        // 查找指定 id 的 Marker 对象
        const targetMarker = overlays.find((overlay) => overlay instanceof BMapGL.Marker && String(overlay.id) === id);
        newTargetMarker = targetMarker;
        this.map.removeOverlay(targetMarker);
      });
      return newTargetMarker;
    };
    /* 沿指定路径移动 marker，用于轨迹回放等场景。动画完成时触发回调事件，若动画进行中，对同一 marker 再次调用 moveAlong 方法，前一次的动画将被打断 */
    this._moveAlong = (object) => {
      const path = object.path;
      const targetMarkerId = object.markerId;
      const duration = object.duration;
      const autoRotate = object.autoRotate;
      const targetMarker = this.map.getOverlays().find((overlay) => overlay instanceof BMapGL.Marker && overlay.id === targetMarkerId);
      const points = path.map((p) => new BMapGL.Point(p.longitude, p.latitude));
      const obj = {
        flagId: true,
        flagCoordinate: true // 标记是否有有效经纬度
      };
      if (!targetMarker) {
        console.error(`Marker "${targetMarkerId}" not found.`);
        obj.flagId = false;
        return obj;
      }
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point.lat < -80 && point.lat >= -90) {
          point.lat += 10;
        }
        if (point.lng < -180 || point.lng > 180 || point.lat < -90 || point.lat > 90 || isNaN(point.lng) || isNaN(point.lat)) {
          obj.flagCoordinate = false;
          return obj;
        }
      }
      if (obj.flagId && obj.flagCoordinate) {
        const startTime = performance.now();
        const animate = (timestamp) => {
          const elapsedTime = timestamp - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const currentPoint = this.getPointOnPath(points, progress);
          targetMarker.setPosition(currentPoint);
          if (autoRotate && progress < 1) {
            const nextPoint = this.getPointOnPath(points, Math.min(progress + 0.01, 1)); // 获取前进一点的点
            const rotation = this.calculateRotation(currentPoint, nextPoint);
            targetMarker.setRotation(rotation);
          }
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
          else {
            // 动画结束
            targetMarker.setPosition(points[points.length - 1]); // 设置 marker 位置为路径的最后一个点
            targetMarker.setRotation(0); // 恢复旋转角度为0
          }
        };
        requestAnimationFrame(animate);
      }
      return obj;
    };
    this.getPointOnPath = (points, progress) => {
      const totalLength = this.calculateTotalLength(points);
      const targetLength = totalLength * progress;
      let currentLength = 0;
      for (let i = 0; i < points.length - 1; i++) {
        const segmentLength = this.map.getDistance(points[i], points[i + 1]);
        if (currentLength + segmentLength >= targetLength) {
          const ratio = (targetLength - currentLength) / segmentLength;
          const deltaX = points[i + 1].lng - points[i].lng;
          const deltaY = points[i + 1].lat - points[i].lat;
          const newLng = points[i].lng + deltaX * ratio;
          const newLat = points[i].lat + deltaY * ratio;
          return new BMapGL.Point(newLng, newLat);
        }
        currentLength += segmentLength;
      }
      // 如果进度超出路径长度，返回路径的最后一个点
      return points[points.length - 1];
    };
    this.calculateTotalLength = (points) => {
      let totalLength = 0;
      for (let i = 0; i < points.length - 1; i++) {
        totalLength += this.map.getDistance(points[i], points[i + 1]);
      }
      return totalLength;
    };
    this.calculateRotation = (currentPoint, nextPoint) => {
      const dx = nextPoint.lng - currentPoint.lng;
      const dy = nextPoint.lat - currentPoint.lat;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      angle = 90 - angle;
      return angle;
    };
    /* 创建自定义图片图层，图片会随着地图缩放而缩放 */
    this._addGroundOverlay = (option) => {
      const { src, opacity, bounds, visible, id, zIndex } = option;
      let flag = true;
      if (bounds.southwest.longitude >= bounds.northeast.longitude || bounds.southwest.latitude >= bounds.northeast.latitude) {
        flag = false;
        return;
      }
      if (bounds.southwest.latitude > 90 || bounds.southwest.latitude < -90 || bounds.southwest.longitude > 180 || bounds.southwest.longitude < -180 || isNaN(bounds.southwest.latitude) || isNaN(bounds.southwest.longitude)) {
        flag = false;
        return;
      }
      if (bounds.northeast.latitude > 90 || bounds.northeast.latitude < -90 || bounds.northeast.longitude > 180 || bounds.northeast.longitude < -180 || isNaN(bounds.northeast.latitude) || isNaN(bounds.northeast.longitude)) {
        flag = false;
        return;
      }
      // 创建覆盖物边界对象
      const overlayBounds = new BMapGL.Bounds(new BMapGL.Point(bounds.southwest.longitude, bounds.southwest.latitude), new BMapGL.Point(bounds.northeast.longitude, bounds.northeast.latitude));
      // 定义 GroundOverlay类
      function GroundOverlay(bounds, imageUrl, map, visible, opacity, zIndex, id) {
        this._bounds = bounds;
        this._imageUrl = imageUrl;
        this._map = map;
        this._visible = visible;
        this._opacity = opacity;
        this._zIndex = zIndex;
        this._id = id;
      }
      // 继承 BMapGL.Overlay
      GroundOverlay.prototype = new BMapGL.Overlay();
      // 初始化方法
      GroundOverlay.prototype.initialize = function (map) {
        // 移除已存在的元素
        if (document.getElementById(this._id)) {
          const element = document.getElementById(this._id);
          element === null || element === void 0 ? void 0 : element.remove();
        }
        this._map = map;
        if (!this._div) {
          // 创建 div 元素并设置样式
          const div = document.createElement('div');
          div.id = this._id;
          div.style.position = 'absolute';
          div.style.border = 'none';
          div.style.zIndex = this._zIndex;
          // 创建 img 元素并设置样式
          const img = document.createElement('img');
          img.src = this._imageUrl;
          // 确保opacity值在0到1之间
          const validOpacity = (this._opacity < 0) ? '1' : this._opacity;
          img.style.opacity = validOpacity;
          div.appendChild(img);
          this._div = div;
        }
        // 监听地图缩放事件，调整覆盖物尺寸
        map.addEventListener('zoomend', () => {
          const swPixel = map.pointToOverlayPixel(this._bounds.getSouthWest());
          const nePixel = map.pointToOverlayPixel(this._bounds.getNorthEast());
          const width = nePixel.x - swPixel.x;
          const height = swPixel.y - nePixel.y;
          this._div.style.width = width + 'px';
          this._div.style.height = height + 'px';
          const img = this._div.querySelector('img');
          img.style.width = width + 'px';
          img.style.height = height + 'px';
        });
        // 将 div 元素添加到地图覆盖物层
        map.getPanes().labelPane.appendChild(this._div);
        return this._div;
      };
      // 绘制方法
      GroundOverlay.prototype.draw = function () {
        // 设置 div 元素位置和尺寸
        const _northeast = {
          lat: option.bounds.northeast.latitude,
          lng: option.bounds.southwest.longitude
        };
        const position = this._map.pointToOverlayPixel(_northeast);
        this._div.style.left = position.x + 'px';
        this._div.style.top = position.y + 'px';
        const bounds = this._map.getBounds();
        const sw = this._map.pointToPixel(bounds.getSouthWest());
        const ne = this._map.pointToPixel(bounds.getNorthEast());
        const width = ne.x - sw.x;
        const height = ne.y - sw.y;
        const zoom = this._map.getZoom();
        const imageWidth = width * Math.pow(2, 18 - zoom);
        const imageHeight = height * Math.pow(2, 18 - zoom);
        this._div.style.width = imageWidth + 'px';
        this._div.style.height = imageHeight + 'px';
        this._div.style.display = this._visible ? 'block' : 'none';
        const validOpacity = (this._opacity < 0) ? '1' : this._opacity;
        this._div.getElementsByTagName('img')[0].style.opacity = validOpacity;
      };
      // 创建 GroundOverlay 实例
      const overlay = new GroundOverlay(overlayBounds, src, this.map, visible, opacity, zIndex, id);
      this.map.addOverlay(overlay);
      // 对所有覆盖物进行排序
      const overlays = this.map.getOverlays().sort((a, b) => a._zIndex - b._zIndex);
      this.groundOverlay = overlay;
      // 将所有覆盖物重新绘制
      overlays.forEach((overlay) => overlay.draw());
      const zoom = this.map.getZoom();
      if (zoom < 20) {
        this.map.setZoom(zoom + 1);
        this.map.setZoom(zoom);
      }
      else {
        this.map.setZoom(zoom - 1);
        this.map.setZoom(zoom);
      }
      return flag;
    };
    /* 更新自定义图片图层 */
    this._updateGroundOverlay = (option) => {
      const { src, opacity, bounds, visible, id, zIndex } = option;
      let obj;
      let flagId = true; // 标记是否有id
      let flagCoordinate = true; // 标记是否有有效经纬度
      let flagObj = {};
      // 获取所有图层
      const overlays = this.map.getOverlays();
      // 找到要更新的图层
      const targetOverlay = overlays.find((overlay) => overlay._id === id);
      if (!targetOverlay) {
        flagId = false;
        flagObj = {
          flagId: flagId,
          flagCoordinate: flagCoordinate
        };
        obj = Object.assign({}, flagObj);
        return obj;
      }
      if (bounds.southwest.longitude >= bounds.northeast.longitude || bounds.southwest.latitude >= bounds.northeast.latitude) {
        flagCoordinate = false;
        flagObj = {
          flagId: flagId,
          flagCoordinate: flagCoordinate
        };
        obj = Object.assign({}, flagObj);
      }
      if (bounds.southwest.latitude > 90 || bounds.southwest.latitude < -90 || bounds.southwest.longitude > 180 || bounds.southwest.longitude < -180 || isNaN(bounds.southwest.latitude) || isNaN(bounds.southwest.longitude)) {
        flagCoordinate = false;
        flagObj = {
          flagId: flagId,
          flagCoordinate: flagCoordinate
        };
        obj = Object.assign({}, flagObj);
      }
      if (bounds.northeast.latitude > 90 || bounds.northeast.latitude < -90 || bounds.northeast.longitude > 180 || bounds.northeast.longitude < -180 || isNaN(bounds.northeast.latitude) || isNaN(bounds.northeast.longitude)) {
        flagCoordinate = false;
        flagObj = {
          flagId: flagId,
          flagCoordinate: flagCoordinate
        };
        obj = Object.assign({}, flagObj);
      }
      if (flagId && flagCoordinate) {
        const targetBounds = new BMapGL.Bounds(new BMapGL.Point(bounds.southwest.longitude, bounds.southwest.latitude), new BMapGL.Point(bounds.northeast.longitude, bounds.northeast.latitude));
        const zoom = this.map.getZoom();
        if (targetOverlay) {
          // 更新DOM元素
          const element = document.getElementById(id);
          if (element) {
            const imgElement = element.querySelector('img');
            if (imgElement) {
              // 找到了对应的元素
              const validOpacity = (opacity < 0) ? '1' : opacity;
              element.style.opacity = validOpacity;
              imgElement.style.display = visible ? 'block' : 'none';
              element.style.zIndex = zIndex;
              // 加载图片
              const image = new Image();
              image.onload = () => {
                // 图片加载完成后执行
                imgElement.src = src; // 设置图片的src
                // 根据当前缩放级别设置图片宽高
                const lngSpan = targetBounds.getNorthEast().lng - targetBounds.getSouthWest().lng;
                const mapWidth = this.map.getSize().width; // 获取地图容器的宽度
                const updatedImageWidth = (mapWidth / Math.pow(2, 18 - zoom)) * lngSpan;
                const imageAspectRatio = image.naturalHeight / image.naturalWidth;
                const updatedImageHeight = updatedImageWidth * imageAspectRatio;
                imgElement.style.width = `${updatedImageWidth}px`;
                imgElement.style.height = `${updatedImageHeight}px`;
                // 重新绘制图层
                targetOverlay._bounds = targetBounds;
                targetOverlay.draw();
                // 更新完图片后，立即重绘地图
                this.map.panTo(this.map.getCenter());
                targetOverlay.draw();
              };
              image.src = src;
            }
          }
        }
        else {
          // 没有找到对应的元素
          console.error(`未找到id为${id}的元素`);
        }
        flagObj = {
          flagId: flagId,
          flagCoordinate: flagCoordinate
        };
        obj = Object.assign({}, flagObj);
        return obj;
      }
      else {
        return obj;
      }
    };
    /* 移除自定义图片图层 */
    this._removeGroundOverlay = (option) => {
      // 获取所有图层
      const overlays = this.map.getOverlays();
      let newTargetOverlay = '';
      // 找到要更新的图层
      const targetOverlay = overlays.find((overlay) => overlay._id === option.id);
      newTargetOverlay = targetOverlay;
      if (targetOverlay) {
        // 如果找到了对应的图层，执行删除操作
        this.map.removeOverlay(targetOverlay);
      }
      return newTargetOverlay;
    };
    /* 限制地图的显示范围。此接口同时会限制地图的最小缩放整数级别。 */
    this._setBoundary = (option) => {
      let nth = option.northeast.latitude;
      let sth = option.southwest.latitude;
      let flag = true;
      if (option.northeast.latitude <= -80 && option.northeast.latitude >= -90) {
        nth = option.northeast.latitude + 10;
      }
      if (option.southwest.latitude <= -80 && option.southwest.latitude >= -90) {
        sth = option.southwest.latitude + 10;
      }
      if (option.northeast.latitude < -90 || option.northeast.latitude > 90 || option.northeast.longitude < -180 || option.northeast.longitude > 180 || isNaN(option.northeast.latitude) || isNaN(option.northeast.longitude) || option.northeast.longitude < option.southwest.longitude || option.northeast.latitude < option.southwest.latitude) {
        flag = false;
        return;
      }
      if (option.southwest.latitude < -90 || option.southwest.latitude > 90 || option.southwest.longitude < -180 || option.southwest.longitude > 180 || isNaN(option.southwest.latitude) || isNaN(option.southwest.longitude)) {
        flag = false;
        return;
      }
      const ne = new BMapGL.Point(option.northeast.longitude, nth);
      const sw = new BMapGL.Point(option.southwest.longitude, sth);
      const bounds = new BMapGL.Bounds(sw, ne);
      const viewport = this.map.getViewport([ne, sw]);
      this.map.centerAndZoom(new BMapGL.Point(viewport.center.lng, viewport.center.lat), viewport.zoom + 2);
      this.map.addOverlay(new BMapGL.Polygon([
        new BMapGL.Point(bounds.sw.lng, bounds.sw.lat),
        new BMapGL.Point(bounds.sw.lng, bounds.ne.lat),
        new BMapGL.Point(bounds.ne.lng, bounds.ne.lat),
        new BMapGL.Point(bounds.ne.lng, bounds.sw.lat)
      ], {
        fillOpacity: 0
      }));
      BMapGLLib.AreaRestriction.setBounds(this.map, bounds);
      return flag;
    };
    this.latitude = undefined;
    this.longitude = undefined;
    this.scale = undefined;
    this.minScale = undefined;
    this.maxScale = undefined;
    this.markers = undefined;
    this.polyline = undefined;
    this.circles = undefined;
    this.polygons = undefined;
    this.subkey = undefined;
    this.layerStyle = undefined;
    this.rotate = undefined;
    this.skew = undefined;
    this.showCompass = undefined;
    this.showScale = undefined;
    this.enableOverlooking = undefined;
    this.enableZoom = undefined;
    this.enableScroll = undefined;
    this.enableRotate = undefined;
    this.enableSatellite = undefined;
    this.enableTraffic = undefined;
    this.enableBuilding = undefined;
    this.enableAutoMaxOverlooking = undefined;
    this.enable3D = undefined;
    this.width = '100%';
    this.height = '100%';
  }
  async componentDidLoad() {
    // 加载地图脚本
    await this.loadMapScript();
    // 记载BmapLib工具库
    await this.LoadBmapLibScript();
    // 如果容器元素存在
    if (this.mapRef) {
      this.mapRef.addEventListener('touchmove', (e) => {
        if (e.cancelable) {
          e.preventDefault();
        }
      });
      // 创建地图对象
      this.map = new BMapGL.Map(this.mapRef);
      // 移除百度地图版权信息
      this.map.removeControl(this.map.getMapType());
      // 创建中心点坐标对象
      // 中心经纬度为必填值
      if (this.latitude < -90 || this.latitude > 90 || this.longitude < -180 || this.longitude > 180 || isNaN(this.latitude) || isNaN(this.longitude)) {
        console.error('请正确设置中心经纬度');
        return;
      }
      let scale = isNaN(this.scale) ? 16 : this.scale;
      let minScale = isNaN(this.minScale) ? 3 : this.minScale;
      let maxScale = isNaN(this.maxScale) ? 16 : this.maxScale;
      const point = new BMapGL.Point(this.longitude, this.latitude);
      if (minScale < 3 || minScale > 20) {
        minScale = 3;
        this.map.setMinZoom(3);
      }
      else {
        // 设置最小缩放级别
        this.map.setMinZoom(minScale);
      }
      if (maxScale > 20 || maxScale < 3) {
        maxScale = 20;
        this.map.setMaxZoom(20);
      }
      else {
        // 设置最大缩放级别
        this.map.setMaxZoom(maxScale);
      }
      if (minScale > maxScale) {
        minScale = 3;
        this.map.setMinZoom(3);
        maxScale = 20;
        this.map.setMaxZoom(20);
      }
      // 设置地图中心和缩放级别
      if (minScale <= 16 && maxScale >= 16) {
        if (scale >= minScale && scale <= maxScale) {
          // 使用this.scale来设置缩放级别
          this.map.centerAndZoom(point, scale);
        }
        else {
          scale = 16;
          this.map.centerAndZoom(point, scale);
        }
      }
      else {
        if (scale >= minScale && scale <= maxScale) {
          // 使用this.scale来设置缩放级别
          this.map.centerAndZoom(point, scale);
        }
        else if (scale < minScale) {
          scale = minScale;
          this.map.centerAndZoom(point, minScale);
        }
        else {
          scale = maxScale;
          this.map.centerAndZoom(point, maxScale);
        }
      }
      // 添加标记点markers
      if (Array.isArray(this.markers)) {
        this.addMarkers(this.markers);
      }
      // 创建polyline路线
      if (Array.isArray(this.polyline)) {
        this.polyline.forEach((line) => {
          if (line.points) {
            const points = line.points.map((point) => new BMapGL.Point(point.longitude, point.latitude));
            const polyline = new BMapGL.Polyline(points, {
              strokeColor: line.color,
              strokeWeight: line.width,
              strokeStyle: line.dottedLine ? 'dashed' : 'solid',
              strokeOpacity: 1,
            });
            // 将polyline路线添加到地图上
            this.map.addOverlay(polyline);
          }
        });
      }
      // 添加圆形覆盖物circles
      if (Array.isArray(this.circles)) {
        this.circles.forEach((circle) => {
          if (circle.latitude && circle.longitude && circle.radius) {
            const point = new BMapGL.Point(circle.longitude, circle.latitude);
            const circleObj = new BMapGL.Circle(point, circle.radius, {
              strokeColor: circle.color,
              fillColor: circle.fillColor,
              strokeWeight: circle.strokeWidth,
            });
            this.map.addOverlay(circleObj);
          }
        });
      }
      //  多边形
      if (Array.isArray(this.polygons)) {
        this.polygons.forEach((polygon) => {
          // 创建多边形的点坐标数组
          const points = polygon.points.map((point) => new BMapGL.Point(point.longitude, point.latitude));
          // 创建多边形对象
          const polygonObj = new BMapGL.Polygon(points, {
            strokeColor: polygon.strokeColor,
            fillColor: polygon.fillColor,
            strokeWeight: polygon.strokeWidth,
          });
          // 将多边形添加到地图上
          this.map.addOverlay(polygonObj);
        });
      }
      if (this.layerStyle === 0) {
        const layerStyle = this.layerStyle;
        if (layerStyle) {
          // 使用个性化地图样式
          this.map.setMapStyleV2({ styleId: this.subkey });
        }
      }
      else {
        const layerStyle = this.layerStyle ? this.layerStyle : 1;
        if (layerStyle === 1) {
          // 使用个性化地图样式
          this.map.setMapStyleV2({ styleId: this.subkey });
        }
      }
      const enable3D = this.enable3D === true ? this.enable3D : false;
      const enableOverlooking = this.enableOverlooking === true ? this.enableOverlooking : false;
      const enableAutoMaxOverlooking = this.enableAutoMaxOverlooking === true ? this.enableAutoMaxOverlooking : false;
      const skew = this.skew ? this.skew : 0;
      if (enable3D === true) {
        if (enableOverlooking === true) {
          // /开启最大俯视角
          if (enableAutoMaxOverlooking === true) {
            this.map.setTilt(75);
          }
          else {
            // 开启俯视角度
            this.map.setTilt(45);
          }
        }
        else if (skew >= 0 && skew <= 40) {
          // 设置倾斜角度
          this.map.setTilt(skew);
        }
        else {
          this.map.setTilt(0);
        }
      }
      else {
        this.map.setTilt(0);
      }
      // 显示指南针
      const showCompass = this.showCompass === true ? this.showCompass : false;
      if (showCompass === true) {
        const compassControl = new BMapGL.NavigationControl3D({
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          type: 3, // 3代表显示指南针
        });
        this.map.addControl(compassControl);
      }
      // 显示比例尺
      const showScale = this.showScale === true ? this.showScale : false;
      if (showScale === true) {
        const scaleControl = new BMapGL.ScaleControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        });
        this.map.addControl(scaleControl);
      }
      const enableZoom = this.enableZoom === false ? this.enableZoom : true;
      if (enableZoom === true) {
        // 启用缩放
        this.map.enableScrollWheelZoom(this.enableZoom);
      }
      // 启用缩放
      if (this.enableZoom === true && this.mapRef) {
        this.map.enablePinchToZoom();
      }
      else {
        this.map.disablePinchToZoom();
      }
      // 拖拽
      const enableScroll = this.enableScroll === false ? this.enableScroll : true;
      if (enableScroll === true) {
        this.map.enableDragging();
      }
      else {
        this.map.disableDragging();
      }
      const rotate = this.rotate ? this.rotate : 0;
      if (rotate >= 0 && this.rotate <= 360) {
        this.map.setHeading(this.rotate);
      }
      else {
        this.map.setHeading(0);
      }
      // 设置旋转角度
      if (this.enableRotate === true) {
        this.map.enableRotateGestures();
      }
      // 启用卫星图
      const enableSatellite = this.enableSatellite === true ? this.enableSatellite : false;
      if (enableSatellite === true && this.mapRef) {
        const mapTypeControl = new BMapGL.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP],
        });
        this.map.addControl(mapTypeControl);
      }
      const enableTraffic = this.enableTraffic === true ? this.enableTraffic : false;
      if (enableTraffic === true && this.mapRef) {
        this.map.setTrafficOn();
      }
      // 是否开启建筑物
      const enableBuilding = this.enableBuilding === false ? this.enableBuilding : true;
      if (enableBuilding === false) {
        this.map.setDisplayOptions({ building: false });
      }
    }
    if (this.map) {
      // 创建Hammer对象，绑定到地图容器
      const hammer = new Hammer(this.mapRef);
      hammer.on('tap', (e) => {
        // 将Hammer事件对象中的坐标转换为百度地图坐标
        const point = this.map.pixelToPoint({ x: e.center.x, y: e.center.y });
        this.onTap.emit({
          longitude: point.lng,
          latitude: point.lat,
        });
      });
    }
  }
  disconnectedCallback() {
    if (this.map) {
      this.map.destroy();
    }
  }
  addMarkers(markers) {
    // 维护已存在的marker id 列表
    const existingIds = [];
    markers.forEach((marker) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
      if (existingIds.includes(marker.id)) {
        // 如果id已存在，直接返回，不执行后续操作
        console.error('请输入不同的marker的id');
        return;
      }
      existingIds.push(marker.id);
      if (marker.latitude && marker.longitude && marker.iconPath && marker.id) {
        if (marker.latitude < -90 || marker.latitude > 90 || marker.longitude < -180 || marker.longitude > 180) {
          console.error('请正确设置marker的经纬度');
          return;
        }
        const pt = new BMapGL.Point(marker.longitude, marker.latitude);
        const markerObj = new BMapGL.Marker(pt, { enableClicking: true });
        markerObj.id = marker.id; // 设置标记点的唯一标识符
        markerObj.alpha = marker.alpha;
        if (marker.zIndex) {
          markerObj.setZIndex(marker.zIndex);
        }
        if (marker.width && marker.height) {
          const canvas = document.createElement('canvas');
          canvas.width = marker.width * 2;
          canvas.height = marker.height * 2;
          // 获取 Canvas 上下文
          const ctx = canvas.getContext('2d');
          // 创建一个新的图片对象
          const img = new Image();
          // 设置图片的跨域属性
          img.crossOrigin = 'Anonymous';
          img.src = marker.iconPath;
          // 当图片加载完成后，将其绘制到Canvas上
          img.onload = function () {
            ctx.drawImage(img, 0, 0, marker.width * 2, marker.height * 2);
            // 创建 BMapGL.Icon 对象，并将 Canvas 元素作为图标的内容
            // 设置锚点偏移量为(0, 0)，表示图标的左上角将与经纬度对齐
            const icon = new BMapGL.Icon(canvas.toDataURL(), new BMapGL.Size(marker.width, marker.height), {
              anchor: new BMapGL.Size(0, 0)
            });
            markerObj.setIcon(icon);
          };
        }
        else {
          const img = new Image();
          img.src = marker.iconPath;
          img.style.opacity = String(marker.alpha);
          img.onload = () => {
            const iconSize = new BMapGL.Size(img.width, img.height);
            const icon = new BMapGL.Icon(img.src, iconSize);
            icon.imageOffset = new BMapGL.Size(0, 0, marker.alpha || 1);
            markerObj.setIcon(icon);
          };
        }
        const rotate = marker.rotate ? marker.rotate : 0;
        if (rotate >= 0 && rotate <= 360) {
          markerObj.setRotation(rotate);
        }
        // 如果anchor.x和anchor.y被定义，则使用它们的值，否则使用默认值
        const anchorX = (_b = (_a = marker.anchor) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0.5;
        const anchorY = (_d = (_c = marker.anchor) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 1;
        if (anchorX >= 0 && anchorX <= 1 && anchorY >= 0 && anchorY <= 1) {
          // 锚点设置为图标宽度的负值乘以x，以向左移动
          const offsetX = -(anchorX) * (marker.width || 0);
          // 锚点设置为图标高度的负值乘以y，以向上移动
          const offsetY = -(anchorY) * (marker.height || 0);
          // 使用计算出的偏移量设置标注对象的偏移
          markerObj.setOffset(new BMapGL.Size(offsetX, offsetY));
        }
        else {
          const offsetX = -0.5 * (marker.width || 0);
          const offsetY = -1 * (marker.height || 0);
          markerObj.setOffset(new BMapGL.Size(offsetX, offsetY));
        }
        // 创建title
        if (!marker.callout && marker.title) {
          const hammer = new Hammer(this.mapRef); // 创建Hammer对象，绑定到地图容器
          hammer.on('tap', (e) => {
            // 使用tap事件替代click事件
            const touch = e.center;
            const x = touch.x;
            const y = touch.y;
            // 假设阈值为 10，表示点击距离小于 10 个像素时认为是点击到了标记点
            const threshold = 15;
            // 遍历标记点数组，计算触摸位置与每个标记点的距离
            this.markers.forEach((marker) => {
              // 通过class名获取地图容器
              const mapContainer = document.getElementsByClassName('bmap-container')[0];
              // 获取地图容器在屏幕上的偏移量
              const mapContainerRect = mapContainer.getBoundingClientRect();
              const mapOffsetX = mapContainerRect.left;
              const mapOffsetY = mapContainerRect.top;
              const point = new BMapGL.Point(marker.longitude, marker.latitude);
              const pixel = this.map.pointToPixel(point);
              const markerX = pixel.x + mapOffsetX;
              const markerY = pixel.y + mapOffsetY;
              // 计算触摸位置与标记点的距离
              const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2));
              if (distance < threshold && marker.id === markerObj.id) {
                // 最近的标记点距离小于阈值，表示用户点击到了标记点
                const content = `<div style="text-align:center">${marker.title}</div>`;
                const infoWindow = new BMapGL.InfoWindow(content);
                this.map.openInfoWindow(infoWindow, pt);
              }
            });
          });
        }
        if (marker.callout) {
          const offsetX = ((_e = marker.callout) === null || _e === void 0 ? void 0 : _e.anchorX) ? (_f = marker.callout) === null || _f === void 0 ? void 0 : _f.anchorX : 0; // 横向偏移量
          const offsetY = ((_g = marker.callout) === null || _g === void 0 ? void 0 : _g.anchorY) ? (_h = marker.callout) === null || _h === void 0 ? void 0 : _h.anchorY : 0; // 纵向偏移量
          // 创建气泡(callout)对象
          const callout = new BMapGL.InfoWindow(`<div style="
              padding: ${(_j = marker.callout) === null || _j === void 0 ? void 0 : _j.padding}px;
              color:${(_k = marker.callout) === null || _k === void 0 ? void 0 : _k.color};
              text-align:${(_l = marker.callout) === null || _l === void 0 ? void 0 : _l.textAlign};"
              >
             <p style="font-size:${(_m = marker.callout) === null || _m === void 0 ? void 0 : _m.fontSize}px">${((_o = marker.callout) === null || _o === void 0 ? void 0 : _o.content) || ''}</p>
             </div>`, {
            width: 200,
            height: 100,
            offset: new BMapGL.Size(offsetX - 24, offsetY - 20), // 设置偏移量
          });
          // 自定义属性存储气泡(callout)对象
          markerObj.callout = callout;
          // 将气泡(callout)对象绑定到标记(marker)对象上
          this.map.addOverlay(markerObj);
          if (((_p = marker.callout) === null || _p === void 0 ? void 0 : _p.display) === 'ALWAYS') {
            markerObj.callout.disableCloseOnClick();
            const point = markerObj.getPosition(); // 获取marker标记点的位置
            markerObj.callout.addEventListener('open', function () {
              var _a, _b, _c, _d;
              const infoWindowElement = document.querySelector('.BMap_bubble_pop');
              if (infoWindowElement) {
                let triangle = infoWindowElement.querySelector('.triangle');
                if (!triangle) {
                  // 如果不存在，则创建并添加新的三角形 div
                  triangle = document.createElement('div');
                  triangle.className = 'triangle'; // 添加一个类名以便日后查找
                  infoWindowElement.appendChild(triangle);
                }
                const img = document.querySelector('.BMap_bubble_pop>img');
                if (img) {
                  img.setAttribute('style', `position: absolute;transform: translate(-50%, 0); top: ${point.lat - 100}px; left: ${point.lng - 20}px;display:none`);
                }
                const backgroundcolor = (_a = marker.callout) === null || _a === void 0 ? void 0 : _a.bgColor;
                let borderWidth = ((_b = marker.callout) === null || _b === void 0 ? void 0 : _b.borderWidth) || 5;
                const borderColor = (_c = marker.callout) === null || _c === void 0 ? void 0 : _c.borderColor;
                const borderRadius = (_d = marker.callout) === null || _d === void 0 ? void 0 : _d.borderRadius;
                // 确保边框大小不超过15
                borderWidth = Math.min(borderWidth, 15);
                triangle.setAttribute('style', `width:0;height:0;borderLeft:${borderWidth}px solid transparent;borderRight:${borderWidth}px solid transparent;borderTop:${borderWidth}px solid ${borderColor};position:absolute;left:83px;bottom:-${2 * borderWidth}px`);
                infoWindowElement.setAttribute('style', `background-color:${backgroundcolor};top:${point.lat - 120}px; left:${point.lng - 100}px;position: absolute;border: ${borderWidth}px solid ${borderColor};border-radius:${borderRadius}px; `);
              }
            });
            this.map.openInfoWindow(markerObj.callout, pt);
          }
          else {
            const hammer = new Hammer(this.mapRef); // 创建Hammer对象，绑定到地图容器
            hammer.on('tap', (e) => {
              // 使用tap事件替代click事件
              const touch = e.center;
              const x = touch.x;
              const y = touch.y;
              // 假设阈值为 10，表示点击距离小于 10 个像素时认为是点击到了标记点
              const threshold = 15;
              // 遍历标记点数组，计算触摸位置与每个标记点的距离
              this.markers.forEach((marker) => {
                // 通过class名获取地图容器
                const mapContainer = document.getElementsByClassName('bmap-container')[0];
                // 获取地图容器在屏幕上的偏移量
                const mapContainerRect = mapContainer.getBoundingClientRect();
                const mapOffsetX = mapContainerRect.left;
                const mapOffsetY = mapContainerRect.top;
                const point = new BMapGL.Point(marker.longitude, marker.latitude);
                const pixel = this.map.pointToPixel(point);
                const markerX = pixel.x + mapOffsetX;
                const markerY = pixel.y + mapOffsetY;
                // 计算触摸位置与标记点的距离
                const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2));
                if (distance < threshold && marker.id === markerObj.id) {
                  const point = markerObj.getPosition(); // 获取marker标记点的位置
                  markerObj.callout.addEventListener('open', function () {
                    var _a, _b, _c, _d;
                    const infoWindowElement = document.querySelector('.BMap_bubble_pop');
                    if (infoWindowElement) {
                      let triangle = infoWindowElement.querySelector('.triangle');
                      if (!triangle) {
                        // 如果不存在，则创建并添加新的三角形 div
                        triangle = document.createElement('div');
                        triangle.className = 'triangle'; // 添加一个类名以便日后查找
                        infoWindowElement.appendChild(triangle);
                      }
                      const img = document.querySelector('.BMap_bubble_pop>img');
                      if (img) {
                        img.setAttribute('style', `position: absolute;transform: translate(-50%, 0); top: ${point.lat - 100}px; left: ${point.lng - 20}px;display:none`);
                      }
                      const backgroundcolor = (_a = marker.callout) === null || _a === void 0 ? void 0 : _a.bgColor;
                      let borderWidth = ((_b = marker.callout) === null || _b === void 0 ? void 0 : _b.borderWidth) || 5;
                      const borderColor = (_c = marker.callout) === null || _c === void 0 ? void 0 : _c.borderColor;
                      const borderRadius = (_d = marker.callout) === null || _d === void 0 ? void 0 : _d.borderRadius;
                      // 确保边框大小不超过15
                      borderWidth = Math.min(borderWidth, 15);
                      triangle.setAttribute('style', `width:0;height:0;border-left:${borderWidth}px solid transparent;border-right:${borderWidth}px solid transparent;border-top:${borderWidth}px solid ${borderColor};position:absolute;left:83px;bottom:-${2 * borderWidth}px`);
                      infoWindowElement.setAttribute('style', `background-color:${backgroundcolor};top:${point.lat - 120}px; left:${point.lng - 100}px;position: absolute;border: ${borderWidth}px solid ${borderColor};border-radius:${borderRadius}px; `);
                    }
                  });
                  // 最近的标记点距离小于阈值，表示用户点击到了标记点
                  this.map.openInfoWindow(markerObj.callout, pt);
                }
                else {
                  markerObj.callout.enableCloseOnClick();
                  // 用户点击到了地图上的其他位置，不是标记点
                }
              });
            });
          }
        }
        // 判断是否有label属性
        if (marker.label) {
          const labelContent = marker.label.content || '';
          const labelOpts = {
            position: pt,
            offset: new BMapGL.Size(marker.label.anchorX || 0, marker.label.anchorY || 0),
          };
          const label = new BMapGL.Label(labelContent, labelOpts);
          const borderColor = marker.label.borderColor ? marker.label.borderColor : 'white';
          // 设置标签样式
          label.setStyle({
            color: marker.label.color,
            fontSize: marker.label.fontSize + 'px',
            borderWidth: marker.label.borderWidth + 'px',
            borderColor: borderColor,
            borderRadius: marker.label.borderRadius + 'px',
            background: marker.label.bgColor,
            padding: marker.label.padding + 'px',
          });
          markerObj.setLabel(label);
        }
        this.map.addOverlay(markerObj);
      }
      else {
        console.error('请检查marker经纬度和marker自定义图标路径和id值');
      }
    });
  }
  loadMapScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://api.map.baidu.com/getscript?v=3.0&type=webgl&ak=Mb1FLBD3gfnY6bup4v6zEWh6MXwsZ9eo';
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = reject;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    });
  }
  async LoadBmapLibScript() {
    return new Promise((resolve, reject) => {
      // 地图加载完成后再加载BMapGLLib
      const bmapLibScript = document.createElement('script');
      bmapLibScript.src = '//mapopen.bj.bcebos.com/github/BMapGLLib/AreaRestriction/src/AreaRestriction.min.js';
      bmapLibScript.defer = true;
      bmapLibScript.type = 'text/javascript';
      bmapLibScript.onload = () => {
        resolve();
      };
      bmapLibScript.onerror = reject;
      document.head.appendChild(bmapLibScript);
    });
  }
  render() {
    return (h(Host, null, h("div", { id: "mapContainer", ref: (dom) => {
        if (dom) {
          this.mapRef = dom;
        }
      }, style: { width: this.width, height: this.height } })));
  }
  static get is() { return "taro-map-core"; }
  static get originalStyleUrls() {
    return {
      "$": ["./style/map.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["./style/map.css"]
    };
  }
  static get properties() {
    return {
      "latitude": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u7EAC\u5EA6"
        },
        "attribute": "latitude",
        "reflect": false
      },
      "longitude": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u7ECF\u5EA6"
        },
        "attribute": "longitude",
        "reflect": false
      },
      "scale": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u7F29\u653E\u7EA7\u522B"
        },
        "attribute": "scale",
        "reflect": false
      },
      "minScale": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6700\u5C0F\u7F29\u653E\u7EA7\u522B"
        },
        "attribute": "min-scale",
        "reflect": false
      },
      "maxScale": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6700\u5927\u7F29\u653E\u7EA7\u522B"
        },
        "attribute": "max-scale",
        "reflect": false
      },
      "markers": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MapProps.marker[]",
          "resolved": "marker[]",
          "references": {
            "MapProps": {
              "location": "import",
              "path": "types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6807\u8BB0\u70B9"
        }
      },
      "polyline": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MapProps.polyline[]",
          "resolved": "polyline[]",
          "references": {
            "MapProps": {
              "location": "import",
              "path": "types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u8DEF\u7EBF(\u95EE\u9898)"
        }
      },
      "circles": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MapProps.circle[]",
          "resolved": "circle[]",
          "references": {
            "MapProps": {
              "location": "import",
              "path": "types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5706(\u95EE\u9898)"
        }
      },
      "polygons": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MapProps.polygon[]",
          "resolved": "polygon[]",
          "references": {
            "MapProps": {
              "location": "import",
              "path": "types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u591A\u8FB9\u5F62\uFF08\u53C2\u6570\u95EE\u9898\uFF09"
        }
      },
      "subkey": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u4E2A\u6027\u5316\u5730\u56FE\u3011\u4F7F\u7528\u7684key"
        },
        "attribute": "subkey",
        "reflect": false
      },
      "layerStyle": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u3010\u4E2A\u6027\u5316\u5730\u56FE\u3011\u914D\u7F6E\u7684 style"
        },
        "attribute": "layer-style",
        "reflect": false
      },
      "rotate": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u65CB\u8F6C"
        },
        "attribute": "rotate",
        "reflect": false
      },
      "skew": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u503E\u659C"
        },
        "attribute": "skew",
        "reflect": false
      },
      "showCompass": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6307\u5357\u9488"
        },
        "attribute": "show-compass",
        "reflect": false
      },
      "showScale": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6BD4\u4F8B\u5C3A"
        },
        "attribute": "show-scale",
        "reflect": false
      },
      "enableOverlooking": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5F00\u542F\u4FEF\u89C6"
        },
        "attribute": "enable-overlooking",
        "reflect": false
      },
      "enableZoom": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u652F\u6301\u7F29\u653E"
        },
        "attribute": "enable-zoom",
        "reflect": false
      },
      "enableScroll": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u652F\u6301\u62D6\u52A8"
        },
        "attribute": "enable-scroll",
        "reflect": false
      },
      "enableRotate": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u652F\u6301\u65CB\u8F6C"
        },
        "attribute": "enable-rotate",
        "reflect": false
      },
      "enableSatellite": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5F00\u542F\u536B\u661F\u56FE"
        },
        "attribute": "enable-satellite",
        "reflect": false
      },
      "enableTraffic": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5F00\u542F\u5B9E\u65F6\u8DEF\u51B5"
        },
        "attribute": "enable-traffic",
        "reflect": false
      },
      "enableBuilding": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5C55\u793A\u5EFA\u7B51"
        },
        "attribute": "enable-building",
        "reflect": false
      },
      "enableAutoMaxOverlooking": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u5F00\u542F\u6700\u5927\u4FEF\u89C6\u89D2"
        },
        "attribute": "enable-auto-max-overlooking",
        "reflect": false
      },
      "enable3D": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "3D\u697C\u5757"
        },
        "attribute": "enable-3-d",
        "reflect": false
      },
      "width": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6DFB\u52A0\u5BBD\u5EA6\u5C5E\u6027"
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "'100%'"
      },
      "height": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6DFB\u52A0\u9AD8\u5EA6\u5C5E\u6027"
        },
        "attribute": "height",
        "reflect": false,
        "defaultValue": "'100%'"
      }
    };
  }
  static get events() {
    return [{
        "method": "onTap",
        "name": "tap",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
}
