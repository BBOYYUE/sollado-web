import { useAppStore } from "@/stores/app";
import createForm from "./createForm.vue"
import dashboard from "./dashboard.vue"
import editForm from "./editForm.vue"
import groupCreateForm from "./groupCreateForm.vue"
import groupEditForm from "./groupEditForm.vue"
import groupInfo from "./groupInfo.vue"
import icon from "./icon.vue"
import info from "./info.vue"
import { v4 as uuid } from "uuid";

export default class plugin {

  activeGroupData = () => { }

  dataType = "";
  alias = "";
  name = "";
  domElementId = "";

  groupUpdateField = {};
  groupStoreField = {};
  updateField = {};
  storeField = {};



  showGroupCreateForm = false;
  showGroupUpdateForm = false;
  showGroupInfo = false;

  showCreateForm = false;
  showUpdateForm = false;
  showInfo = false;

  click = () => { }
  create = () => { }
  edit = () => { }
  update = () => { }
  store = () => { }

  groupClick = () => { }
  createGroup = () => { }
  editGroup = () => { }
  updateGroup = () => { }
  storeGroup = () => { }

  builder = (option) => {
    let impl = new plugin()

    impl.click = (activeItem) => { option.click(activeItem); impl.click(activeItem); }
    impl.create = () => { option.create(); impl.create(); }
    impl.edit = (activeItem) => { option.edit(activeItem); impl.edit(activeItem); }
    impl.update = (data) => { option.update(data); impl.update(data); }
    impl.store = (data) => { option.store(data); impl.store(data); }

    impl.groupClick = (activeGroup) => { option.groupClick(activeGroup); impl.groupClick(activeGroup); }
    impl.createGroup = () => { option.createGroup(); impl.createGroup(); }
    impl.editGroup = (activeGroup) => { option.editGroup(activeGroup); impl.editGroup(activeGroup); }
    impl.updateGroup = (data) => { option.updateGroup(data); impl.updateGroup(data); }
    impl.storeGroup = (data) => { option.storeGroup(data); impl.storeGroup(data); }

    impl.component = Object.assign({}, impl.component, option.component);

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
