import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { cloneFnJSON } from "@vueuse/core";
class SceneUtil {
  constructor(el) {
    let that = this;
    let u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.container = typeof el === 'string'
      ? document.getElementById(el)
      : el
    this.renderer = undefined
    this.camera = undefined
    this.scene = undefined
    this.ctrl = undefined
    this.focusPointMesh = undefined
    this.assetList = []
    this.assetLoading = true
    this.assetShowStep = 25
    this.materialTransparent = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    })
    this.materialTransparentFull = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0
    })
    this.loadManager = new THREE.LoadingManager();
    this.loadManager.onStart = function (url, itemsLoaded, itemsTotal) {
      document.getElementById('status').innerHTML = "正在获取场景信息: "
      that.__showAsset()
    }
    this.loadManager.onLoad = function () {
      that.assetLoading = false
      document.getElementById('status').innerHTML = "加载完成!"
    };
    this.loadManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      document.getElementById('status').innerHTML = "正在加载模型文件, 一共" + itemsTotal + "个模型文件, 已加载" + itemsLoaded + "个模型文件;"
    };
    this.loadManager.onError = function (url) {
      console.log('There was an error loading ' + url);
    };

  }
  createSkyBox (option) {
    const skyBoxGeometry = new THREE.SphereGeometry(option.geometry.size[0], option.geometry.size[1], option.geometry.size[2])
    const skyBoxMaterial = new THREE.MeshBasicMaterial({
      color: option.material.color,
      side: THREE.BackSide
    });
    let skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    skyBox.position.set(option.geometry.position[0], option.geometry.position[1], option.geometry.position[2])
    skyBox.name = "skyBox"
    this.scene.add(skyBox)

  }
  createAmbientLight (option) {
    let linghtPoint = new THREE.SphereGeometry(1);
    let linghtPointMaterial = new THREE.MeshBasicMaterial({
      color: 0xac6c25,
    });
    let linghtPointMesh = new THREE.Mesh(
      linghtPoint,
      linghtPointMaterial
    );
    linghtPointMesh.position.set(option.position[0], option.position[1], option.position[2]);
    let ambientLight = new THREE.AmbientLight(option.color);
    ambientLight.intensity = option.intensity;
    ambientLight.position.set(linghtPointMesh)
    this.scene.add(ambientLight);
  }

  createGroundBox (option) {
    var circleGeometry = new THREE.CircleGeometry(option.geometry.size[0], option.geometry.size[1]);
    var circleMaterial = new THREE.MeshPhongMaterial({
      color: option.material.color,
    });
    // var circle = SceneUtils.createMultiMaterialObject(circleGeometry, [cubeMaterial, circleMaterial])
    var circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.receiveShadow = true;
    // rotate and position the plane
    circle.rotation.x = option.geometry.rotation[0];
    circle.position.set(option.geometry.position[0], option.geometry.position[1], option.geometry.position[2]);
    circle.name = "groundBox"
    // add the plane to the scene
    this.scene.add(circle);
  }

  __setAssetUrl (assetUrl) {
    this.assetUrl = assetUrl
    this.materialList = []
    this.materialHashSet = {}
  }

  __loadMap (mapList) {
    for (let item in mapList) {
      let texture = new THREE.TextureLoader().load(this.assetUrl + mapList[item]);
      let material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: texture,
      })
      let arr = mapList[item].split('.')[0].split('/');
      material.name = arr[arr.length - 1];
      this.materialList.push(material)
      this.materialHashSet[material.name] = material
    }
  }

  __showAsset () {
    let loadding = false
    let that = this
    let index = 0
    let times = 0;
    const group = new THREE.Group();
    group.position.x = 0
    group.position.y = 10
    group.position.z = 0
    group.scale.x = group.scale.y = group.scale.z = 0.03
    that.scene.add(group)
    let intervaID = setInterval(function () {
      if (that.assetList[index] && !loadding && times % that.assetShowStep == 0) {
        loadding = true
        group.add(that.assetList[index])
        index++;
        loadding = false
        document.getElementById('status').innerHTML = "正在渲染物体, 一共" + that.assetList.length + "个物体, 已渲染" + index + "个物体;"
      } else if (index == that.assetList.length && !that.assetLoading) {
        clearInterval(intervaID)
        document.getElementById('status').innerHTML = "渲染完成!"
      } else if (!that.assetLoading) {
        document.getElementById('status').innerHTML = "正在渲染物体, 一共" + that.assetList.length + "个物体, 已渲染" + index + "个物体;"
      }
      times = times + 25;
      document.getElementById('tiems').innerHTML = "总用时" + times + "毫秒"
    }, 25)
  }

  __loadGltf (gltfList) {
    let that = this;
    const gltfLoader = new GLTFLoader(this.loadManager)
    gltfList.map(function (gltfPath) {
      gltfLoader.load(that.assetUrl + gltfPath, function (gltf) {
        gltf.scene.traverse(function (mesh) {
          if (mesh instanceof THREE.Mesh) {
            if (mesh.name.includes('trans_half')) {
              mesh.material = that.materialTransparent
            } else if (mesh.name.includes('trans_condition')) {
              mesh.material = that.materialTransparentFull
            } else if (mesh.name.includes('trans')) {
              mesh.material = that.materialTransparent
            } else {
              mesh.material.emissive = new THREE.Color('#ffffff')
              mesh.material.emissiveIntensity = .25
            }
            that.assetList.push(mesh)
          }
        })
        document.getElementById('progress').innerHTML = ""
      }, function (xhr) {
        if (xhr.loaded < xhr.total) {
          document.getElementById('progress').innerHTML = Math.floor((xhr.loaded / xhr.total * 100)) + "%;"
        }
      }, function (error) {
        document.getElementById('progress').innerHTML = "加载异常"
      })
    })
  }
  __loadObj (objList) {
    let that = this;
    const objLoader = new OBJLoader(this.loadManager)
    objList.map(function (objPath) {
      objLoader.load(that.assetUrl + objPath, function (obj) {
        obj.scale.x = obj.scale.y = obj.scale.z = .03;
        obj.position.y = 0;
        obj.position.x = 0;
        obj.position.z = 0;
        let material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: .7
        })
        let materialTransparent = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: .1
        })

        obj.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            if (child.name == 'trans') {
              child.material = materialTransparent
              child.castShadow = true
              child.receiveShadow = true
            }
            else if (that.materialHashSet[child.name]) {
              child.material = that.materialHashSet[child.name]
              child.castShadow = true
              child.receiveShadow = true
            } else {
              child.material = material
              child.castShadow = true
              child.receiveShadow = true
            }
          }
          that.assetList.push(child)
        })
        document.getElementById('progress').innerHTML = ""
      }, function (xhr) {
        if (xhr.loaded < xhr.total) {
          document.getElementById('progress').innerHTML = Math.floor((xhr.loaded / xhr.total * 100)) + "%;"
        }
      }, function (error) {
        document.getElementById('progress').innerHTML = "加载异常"
      })
    })
  }

  __createGround () {
    const geometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({
      color: 0xdfdfdf,
      wireframe: true,
    });
    let mesh = new THREE.Mesh(geometry, skyBoxMaterial)
    mesh.position.set(0, 0, 0)
    mesh.rotation.x = .5 * Math.PI
    // mesh.rotation.y = .25 * Math.PI
    this.scene.add(mesh);
  }
  __createAxes () {
    /**
     * x 轴为红色
     * y 轴为绿色
     * z 轴为紫色
     */
    let axes = new THREE.AxesHelper(20);
    axes.position.set(0, 15, 0)
    this.scene.add(axes)
  }
  __init () {
    this.__createScene()
    this.__createCamera()
    this.__createRenderer()
    this.__createGround()
    this.__createAxes()
    this.__createController()
    this.renderer.render(this.scene, this.camera)
  }
  __createScene () {
    this.scene = new THREE.Scene();
    this.scene.name = 'scene'
  }


  __createCamera () {

    let focusPoint = new THREE.SphereGeometry(.1);
    let focusPointMaterial = new THREE.MeshBasicMaterial({
      color: 0xac6c25,
    });
    let focusPointMesh = new THREE.Mesh(
      focusPoint,
      focusPointMaterial
    );
    this.focusPointMesh = focusPointMesh
    this.scene.add(focusPointMesh)
    focusPointMesh.position.set(0, 0, 0)
    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    /**
     * 相机位置可以自己设置
     */
    camera.position.set(0, 1000, 1000);
    camera.lookAt(focusPointMesh);

    this.camera = camera;
    this.scene.add(camera)
    camera.name = 'camera'
  }
  __createController () {
    let Orbit = new OrbitControls(this.camera, this.renderer.domElement);
    /**
     * 移动相机的时候加一点阻尼, 这样有真实感
     */
    Orbit.enableDamping = true;
    Orbit.dampingFactor = 1;
    /**
     * 禁止缩放
     */
    // Orbit.enableZoom = false;

    /**
     * 禁止平移
     */
    Orbit.enablePan = false;
    /**
     * 限制了围绕Z轴旋转的角度
     */
    Orbit.minPolarAngle = .25 * Math.PI;
    Orbit.maxPolarAngle = .48 * Math.PI;
    Orbit.minPolarAngle = -.5 * Math.PI;
    Orbit.maxPolarAngle = 0.49 * Math.PI;

    Orbit.target = this.focusPointMesh.position
    this.ctrl = Orbit;
  }
  __createRenderer () {
    let renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    // let el = document.documentElement
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.container.appendChild(renderer.domElement)
    this.renderer = renderer
  }
}

export default SceneUtil