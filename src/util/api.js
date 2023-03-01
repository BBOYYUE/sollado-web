// const host = "http://dev-cn.laravel.com/";
const host = "https://api.sollado.com/";
const filesystem = "api/v1/filesystem/";
const auth = "api/v1/authorizations/";
const panorama = "api/v1/panorama/";
const threeDimensional = "api/v1/three-dimensional/";
const panoramaWork = "api/v1/panorama-work/";
const broadcaster = "api/v1/broadcasting/auth";
const ossSignatureVerification = "api/v1/ossSignatureVerification"
// const assetUrl = "http://127.0.0.1:9000/sollado-api/";
const assetUrl = "https://oss.sollado.com/";
const getUrl = function (url) {
  let arr = url.split("/");
  if (assetUrl == "https://oss.sollado.com/") {
    return assetUrl + arr[3] + "/" + arr[4];
  } else {
    return assetUrl + arr[4] + "/" + arr[5];
  }
}
export {
  host,
  filesystem,
  auth,
  panorama,
  broadcaster,
  assetUrl,
  threeDimensional,
  panoramaWork,
  ossSignatureVerification,
  getUrl
};
