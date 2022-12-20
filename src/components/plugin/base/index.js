import { useAppStore } from "@/stores/app";
import { computed, watch, ref, onMounted, defineProps } from "vue";
import createForm from "./createForm.vue"
import dashboard from "./dashboard.vue"
import editForm from "./editForm.vue"
import groupCreateForm from "./groupCreateForm.vue"
import groupEditForm from "./groupEditForm.vue"
import groupInfo from "./groupInfo.vue"
import icon from "./icon.vue"
import info from "./info.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import * as str from "@/common/str.js"


const editorStore = useEditorStore()
export default class plugin {

  dataOption = {
    activeDataType: "",
    activeDataGroupType: "",
    dataType: "",
    dataGroupType: ""
  }
  fieldOption = {
    groupUpdateField: [],
    groupStoreField: [],
    updateField: [],
    storeField: []
  }
  alias = "";
  name = "";
  domElementId = "";

  groupUpdateField = {};
  groupStoreField = {};
  updateField = {};
  storeField = {};

  click = () => { }
  create = () => { }
  edit = () => { }
  update = () => { }
  store = () => { }
  del = () => { }


  groupClick = () => { }
  createGroup = () => { }
  editGroup = () => { }
  updateGroup = () => { }
  storeGroup = () => { }
  delGroup = () => { }




  builder = (option) => {
    let impl = new plugin()
    impl.click = (activeItem) => {
      editorStore['set' + str.title(impl.dataOption.activeDataType)](activeItem)
      editorStore.showInfo()
      if (option.click) option.click(activeItem);
    }

    impl.create = () => {
      if (option.create) option.create();
      editorStore.showCreate()
    }

    impl.edit = (activeItem) => {
      if (option.edit) option.edit(activeItem);
      editorStore.showEdit()
    }
    impl.update = (newData, oldData) => {
      if (option.update) option.update(newData, oldData);
    }
    impl.store = (formData) => {
      if (option.store) option.store(formData);
    }
    impl.del = (formData) => {
      if (option.store) option.del(formData);
    }

    impl.groupClick = (activeGroup) => {
      if (option.groupClick) option.groupClick(activeGroup);
      console.log(impl.dataOption.activeDataGroupType)
      editorStore['set' + str.title(impl.dataOption.activeDataGroupType)](activeGroup)
      editorStore.showInfoGroup()
    }
    impl.createGroup = () => {
      if (option.createGroup) option.createGroup();
      editorStore.showCreateGroup()
    }
    impl.editGroup = (activeGroup) => {
      if (option.editGroup) option.editGroup(activeGroup);
      editorStore.showEditGroup()
    }
    impl.updateGroup = (data) => {
      if (option.updateGroup) option.updateGroup(data);
    }
    impl.storeGroup = (formData) => {
      if (option.storeGroup) option.storeGroup(formData);
    }
    impl.delGroup = (formData) => {
      if (option.store) option.delGroup(formData);
    }

    impl.dataOption.activeDataType = option.activeDataType ?? ''
    impl.dataOption.activeDataGroupType = option.activeDataGroupType ?? ''
    impl.dataOption.dataType = option.dataType ?? '';
    impl.dataOption.dataGroupType = option.dataGroupType ?? '';
    impl.alias = option.alias ?? '';
    impl.name = option.name ?? '';
    impl.domElementId = option.domElementId ?? '';

    impl.component = Object.assign({}, impl.component, option.component);
    let editorStore = useEditorStore();

    return impl;
  }

  component = {
    createForm: createForm,
    dashboard: dashboard,
    editForm: editForm,
    groupCreateForm: groupCreateForm,
    groupEditForm: groupEditForm,
    groupInfo: groupInfo,
    icon: icon,
    info: info
  }
}
