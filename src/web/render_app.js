import {  APP_NAME, APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'

const renderApp = () =>
`
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- http://colorhunt.co/c/70716 -->
    <meta name="robots" content="noindex">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <title>${APP_NAME}</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="${STATIC_PATH}/css/materialize.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />
    <style>
    .leaflet-container {
        height: 500px;
    }
</style>
  </head>
  <body>
    <div class="${APP_CONTAINER_CLASS}"></div>
    <!--  Scripts-->
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
    <script src="${STATIC_PATH}/js/libs/jquery-2.1.1.min.js"></script>
    <script src="${STATIC_PATH}/js/libs/materialize.min.js"></script>
  </body>
</html>
`

export default renderApp
