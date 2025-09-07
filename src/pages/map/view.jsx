import { mapState } from 'vuex'

import BMMap from 'vue-baidu-map/components/map/Map.vue'
import BMScale from 'vue-baidu-map/components/controls/Scale.vue'
import BMControl from 'vue-baidu-map/components/controls/Control.vue'
import BMCityList from 'vue-baidu-map/components/controls/CityList.vue'
import BMmarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BMPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
import BMCircle from 'vue-baidu-map/components/overlays/Circle.vue'
import BMContextMenu from 'vue-baidu-map/components/context-menu/Menu.vue'
import BMContextMenuItem from 'vue-baidu-map/components/context-menu/Item.vue'
import BMAutoComplete from 'vue-baidu-map/components/others/AutoComplete.vue'
import BMlocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmMapType from 'vue-baidu-map/components/controls/MapType.vue'

import style from 'style/spacing.styl'

console.log(style)

import './style.styl'

export default {
  name: 'baidu-map',
  data() {
    return {
      keyword: '',
      center: { lng: 0, lat: 0 },
      zoom: 15,
      polygonPaths: [],
      circlePaths: []
    }
  },
  computed: {
    ...mapState({ AK: 'ak' })
  },
  render() {
    return (
      <section class='map-container'>
        <section class='map-tools'>
          <span class='flex1' />
          <nav class='map-tools-menu'>
            <a href='javascript:;' class='map-tools-menu__name primary' onClick={this.addPolygon}>
              矩形
            </a>
            <a href='javascript:;' class='map-tools-menu__name primary' onClick={this.addCircle}>
              圆形
            </a>
          </nav>
        </section>
        <BMMap
          center={this.center}
          scroll-wheel-zoom={true}
          zoom={this.zoom}
          ak={this.AK}
          onReady={this.handler}
          class='map-view'>
          <BmMapType
            map-types={['BMAP_HYBRID_MAP', 'BMAP_NORMAL_MAP']}
            anchor='BMAP_ANCHOR_TOP_RIGHT'
            offset={{ width: 100, height: 10 }}
          />
          <BMControl>
            <BMAutoComplete v-model={this.keyword} sugStyle={{ zIndex: 1 }}>
              <input type='text' placeholder='请输入地名关键字' />
            </BMAutoComplete>
          </BMControl>
          <BMlocalSearch keyword={this.keyword} auto-viewport={true} />

          <BMScale anchor='BMAP_ANCHOR_TOP_LEFT' />
          <BMCityList anchor='BMAP_ANCHOR_TOP_RIGHT' />

          <BMmarker position={{ lng: 116.393005, lat: 39.916107 }} dragging={true} />

          <BMContextMenu>
            <BMContextMenuItem callback={this.getPosition} text='获取坐标' />
            <BMContextMenuItem seperator />
            <BMContextMenuItem text='去上海' />
          </BMContextMenu>

          {this.renderPolygons()}
          {this.renderCircle()}
        </BMMap>
      </section>
    )
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
    getPosition({ point }) {
      console.log(point)
    },
    updatePolygonPath(e) {
      console.log(e)
      this.polygonPath = e.target.getPath()
    },
    addPolygon() {
      this.polygonPaths.push([
        { lng: 116.412732, lat: 39.911707 },
        { lng: 116.39455, lat: 39.910932 },
        { lng: 116.403461, lat: 39.921336 }
      ])
    },
    addCircle() {
      this.circlePaths.push({
        center: {
          lng: 116.404,
          lat: 39.915
        },
        radius: 500
      })
    },
    /**
     * @returns {JSX.Element[]}
     */
    renderPolygons() {
      return this.polygonPaths.map((polygonPath, index) => {
        return (
          <BMPolygon
            path={polygonPath}
            stroke-color='blue'
            stroke-opacity={0.5}
            stroke-weight={2}
            editing={true}
            key={index}
            onLineupdate={e => {
              console.log(e.target.getPath())
              this.polygonPaths[index] = e.target.getPath()
            }}
          />
        )
      })
    },
    renderCircle() {
      return this.circlePaths.map((circlePath, index) => {
        return (
          <BMmarker
            position={circlePath.center}
            dragging={true}
            onDragging={({ point }) => {
              console.log(point)
              this.circlePaths[index].center = point
            }}>
            <BMCircle
              center={circlePath.center}
              radius={circlePath.radius}
              stroke-color='blue'
              stroke-opacity={0.5}
              stroke-weight={2}
              editing={true}
              key={index}
              onLineupdate={e => {
                console.log(e.target)
                this.circlePaths[index].center = e.target.getCenter()
                this.circlePaths[index].radius = e.target.getRadius()
              }}
            />
          </BMmarker>
        )
      })
    }
  }
}
