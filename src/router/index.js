import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        pagetype: 'auth',
        alias: '登录页'
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        pagetype: 'auth',
        alias: "登录页"
      }
    },
    {
      path: '/material-library',
      name: 'material-library',
      component: () => import("@/views/material-library/Index.vue"),
      children: [
        {
          path: 'manage',
          name: 'materialLibraryManage',
          component: () => import("@/views/material-library/manage/Index.vue"),
          children: [
            {
              path: "folder/:id",
              name: "materialLibraryManageFolder",
              component: () => import("@/views/material-library/manage/FolderView.vue"),
              props: true

            },
            {
              path: 'storehouse',
              name: 'materialLibraryManageStorehouse',
              component: () => import("@/views/material-library/manage/StorehouseView.vue"),
            },
            {
              path: "panorama-list/:id?",
              name: 'materialLibraryManagePanoramaList',
              component: () => import("@/views/material-library/manage/PanoramaListView.vue"),
              props: true
            },
            {
              path: "three-dimensional-list/:id?",
              name: "materialLibraryManageThreeDimensionalList",
              component: () => import("@/views/material-library/manage/ThreeDimensionalListView.vue"),
              props: true
            }
          ]
        },
        {
          path: 'show',
          name: 'materialLibraryShow',
          component: () => import("@/views/material-library/show/Index.vue"),
          children: [
            {
              path: "panorama/:id?",
              name: "materialLibraryManagePanorama",
              component: () => import("@/views/material-library/show/panoramaShowView.vue"),
              props: true,
            },
            {
              path: "three-dimensional/:id?",
              name: "materialLibraryManageThreeDimensional",
              component: () => import("@/views/material-library/show/threeDimensionalShowView.vue"),
              props: true,
            },
          ],
          meta: {
            isAuth: false
          }
        },
      ]
    },
    {
      path: "/work",
      name: "work",
      component: () => import("@/views/works/Index.vue"),
      children: [
        {
          path: 'manage',
          name: 'workManage',
          component: () => import("@/views/works/manage/Index.vue"),
          children: [
            {
              path: "panorama-work",
              name: "panoramaWork",
              component: () => import("@/views/works/manage/PanoramaWorkView.vue"),
              meta: {
                pagetype: 'manage',
                alias: '全景作品'
              }
            },
          ]
        },
        {
          path: 'editor',
          name: 'workEditor',
          component: () => import("@/views/works/editor/Index.vue"),
          children: [
            {
              path: "panorama/:workid",
              name: 'workEditorPanorama',
              component: () => import('@/views/works/editor/panorama/index.vue'),
              props: true,
              children: [
                {
                  path: "assets",
                  name: 'workEditorAsset',
                  component: () => import("@/views/works/editor/panorama/assets/index.vue"),
                },
                {
                  path: "editor/:sceneid?",
                  name: 'workEditorEditor',
                  props: true,
                  component: () => import("@/views/works/editor/panorama/editor/index.vue"),
                },
                {
                  path: "plugin",
                  name: 'workEditorPlugin',
                  component: () => import("@/views/works/editor/panorama/plugin/index.vue"),
                },
                {
                  path: "scene",
                  name: 'workEditorScene',
                  component: () => import("@/views/works/editor/panorama/scene/index.vue"),
                },
                {
                  path: "work-info",
                  name: 'workEditorWorkInfo',
                  component: () => import("@/views/works/editor/panorama/work-info/index.vue"),
                }
              ]
            },

            // {
            //   path: "panorama-work-edit/:id?",
            //   name: "panoramaWorkEdit",
            //   component: () => import("@/views/works/editor/PanoramaWorkEditView.vue"),
            //   props: true,
            // },
          ]
        },
        {
          path: 'show',
          name: 'workShow',
          component: () => import("@/views/works/show/Index.vue"),
          children: [
            {
              path: "panorama/:workid",
              name: 'workShowPanorama',
              component: () => import('@/views/works/show/PanoramaWorkShowView.vue'),
              props: true,
              meta: {
                isAuth: false
              }
            }
          ]
        }
      ],
    },
  ],
});

export default router;
