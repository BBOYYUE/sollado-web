/**
 * 未定义
 */
export const UNDEFINED = 0;
/**
 * 全景图
 */
export const PANORAMA_IMAGE = 1;

/**
 * 全景图的磁贴文件
 */
export const PANORAMA_TILE = 2;



/**
 * 3d模型文件
 */
export const THREE_DIMENSIONAL_MODEL = 3;

/**
 * 3d模型材质
 */
export const THREE_DIMENSIONAL_MTL = 4;

/**
 * 3d模型纹理贴图
 */
export const THREE_DIMENSIONAL_MAP = 5;

/**
 * 平面切图
 */
export const DESIGN_IMAGE = 6;

/**
 * 切图的缩略图
 */
export const THUMB_IMAGE = 7;

/**
 * 位图图标
 */
export const DESIGN_ICON = 8;

/**
 * SVG图标
 */
export const SVG_ICON = 9;


/**
 * 展示类视频
 */
export const DESIGN_VIDEO = 10;


/**
 * 文件夹
 */
export const DIR = 11;


/**
 * 全景图的xml文件
 */
export const PANORAMA_XML = 12;

/**
 * 全景图的缩略图
 */
export const PANORAMA_THUMB = 13;

/**
 * 系统文件
 */
export const SYSTEM_FILE = 14;


/**
 * .obj 文件
 */
export const THREE_DIMENSIONAL_OBJ = 15;


/**
 * .gltf 文件
 */
export const THREE_DIMENSIONAL_GLTF = 16;

/**
 * .psd 文件
 */
export const PSD = 17;


export function getPurpose(val){
    switch(val){
        case UNDEFINED:
            return "未定义"
        case PANORAMA_IMAGE:
            return "全景图"
        case PANORAMA_TILE:
            return "全景图磁帖文件夹"
        case THREE_DIMENSIONAL_MODEL:
            return "3D模型"
        case THREE_DIMENSIONAL_MTL:
            return "3D模型材质"
        case THREE_DIMENSIONAL_MAP:
            return "3D模型材质"
        case DESIGN_IMAGE:
            return "Ui切图"
        case THUMB_IMAGE:
            return "全景缩略图"
        case DESIGN_ICON:
            return "图标"
        case SVG_ICON:
            return "svg图标"
        case DESIGN_VIDEO:
            return "视频文件"
        case DIR:
            return "文件夹"
        case PANORAMA_XML:
            return "全景图xml文件"
        case PANORAMA_THUMB:
            return "全景缩略图"
        case SYSTEM_FILE:
            return "系统文件"
        case THREE_DIMENSIONAL_OBJ:
        case THREE_DIMENSIONAL_GLTF:
            return "3d模型文件"
        case PSD:
            return "psd文件"
    }
}