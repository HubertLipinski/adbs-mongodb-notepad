<script setup lang="ts">
import L from 'leaflet'

const coordinatesModel = defineModel<[number, number] | []>('coordinates')

const map = useTemplateRef('map')
const open = ref(false)

const selectedPoint = ref<[number, number] | []>()

const onMapReady = () => {
  const leaflet = map.value.leafletObject

  let marker: L.Marker | null = null

  if (coordinatesModel.value?.length === 2) {
    // marker = L.marker([...coordinatesModel.value]).addTo(leaflet)
    const [lng, lat] = coordinatesModel.value
    marker = L.marker([lat, lng]).addTo(leaflet)
  }

  leaflet.on('click', (e) => {
    const { lat, lng } = e.latlng

    if (marker) {
      marker.setLatLng([lat, lng])
    }
    else {
      marker = L.marker([lat, lng]).addTo(leaflet)
    }

    selectedPoint.value = [lat, lng]
  })
}

function updateSelectedPoint(): void {
  if (selectedPoint.value.length !== 2) {
    console.warn('[updateSelectedPoint] error')
    return
  }

  open.value = false

  const [lat, lng] = selectedPoint.value
  coordinatesModel.value = [lng, lat]
}

const getMapCenter = computed(() => {
  if (coordinatesModel.value.length !== 2)
    return [51.558904, 19.0843786]

  const [lng, lat] = coordinatesModel.value
  return [lat, lng]
})
</script>

<template>
  <UModal
    v-model:open="open"
    fullscreen
    title="Select Location"
    :ui="{ footer: 'justify-end' }"
  >
    <UButton
      label="Open map"
      color="neutral"
      variant="subtle"
    />

    <template #body>
      <LMap
        ref="map"
        :zoom="5"
        :center="getMapCenter"
        :use-global-leaflet="false"
        @ready="onMapReady"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />
      </LMap>
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        variant="outline"
        size="xl"
        @click="() => open = false"
      />
      <UButton
        label="Update"
        size="xl"
        @click="updateSelectedPoint"
      />
    </template>
  </UModal>
</template>

<style scoped>

</style>
