'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { MAP_CONFIG } from '@/config/mapConfig'
import { createMemory, getMemories } from '@/lib/utils/memories'

/**
 * @typedef {Object} MarkerData
 * @property {string} id
 * @property {number} lat
 * @property {number} lng
 * @property {string} comment
 * @property {number} timestamp
 * @property {boolean} [saved]
 */

export default function InteractiveMap() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const [markers, setMarkers] = useState([])
  const [currentZoom, setCurrentZoom] = useState(MAP_CONFIG.zoom)

  const attachRemoveOnClose = (leafletMarker, _textarea, markerId) => {
    const handler = () => {
      mapInstanceRef.current?.removeLayer(leafletMarker)
      markersRef.current = markersRef.current.filter(m => m !== leafletMarker)
      const updatedMarkers = markers.filter(m => m.id !== markerId)
      setMarkers(updatedMarkers)
    }
    leafletMarker.on('popupclose', handler)
    return () => leafletMarker.off('popupclose', handler)
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      zoomControl: false,
      maxBounds: [
        [MAP_CONFIG.bounds.south, MAP_CONFIG.bounds.west],
        [MAP_CONFIG.bounds.north, MAP_CONFIG.bounds.east]
      ],
      maxBoundsViscosity: 1.0,
      minZoom: 16,
      maxZoom: 19
    })

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Source: Esri',
        maxZoom: 19
      }
    ).addTo(map)

    L.control.zoom({ position: 'topright' }).addTo(map)

    const polygonCoords = MAP_CONFIG.polygonBounds.map(coord => [
      coord[1],
      coord[0]
    ])

    const maskCoords = [
      [[-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180]],
      polygonCoords
    ]

    L.polygon(maskCoords, {
      color: 'white',
      fillColor: 'white',
      fillOpacity: 0.9,
      weight: 0,
      interactive: false,
      className: 'blurred-overlay'
    }).addTo(map)

    L.polygon(polygonCoords, {
      color: 'white',
      weight: 3,
      fillOpacity: 0,
      interactive: false
    }).addTo(map)

    mapInstanceRef.current = map
    setCurrentZoom(map.getZoom())

    map.on('zoomend', () => setCurrentZoom(map.getZoom()))

    loadMarkersFromSupabase()
    map.on('click', handleMapClick)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const loadMarkersFromSupabase = async () => {
    try {
      const memories = await getMemories()
      const markerData = memories.map(memory => ({
        id: memory.id || Date.now().toString(),
        lat: memory.lat,
        lng: memory.lng,
        comment: memory.comment,
        timestamp: memory.created_at
          ? new Date(memory.created_at).getTime()
          : Date.now(),
        saved: true
      }))
      setMarkers(markerData)
      addMarkersToMap(markerData)
    } catch (error) {
      console.error('Error loading markers from Supabase:', error)
    }
  }

  const addMarkersToMap = (markerData, openPopup = false) => {
    if (!mapInstanceRef.current) return

    markerData.forEach(marker => {
      const leafletMarker = L.marker([marker.lat, marker.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#e0c724" viewBox="0 0 256 256"><path d="M128,24a80,80,0,0,0-80,80c0,72,80,128,80,128s80-56,80-128A80,80,0,0,0,128,24Zm0,112a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z" opacity="0.2"></path><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path></svg>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        })
      }).addTo(mapInstanceRef.current)

      const popupContent = createPopupContent(marker, leafletMarker)
      leafletMarker.bindPopup(popupContent, {
        maxWidth: 420,
        minWidth: 220,
        className: 'custom-popup',
        offset: L.point(0, -20)
      })

      if (openPopup) leafletMarker.openPopup()

      markersRef.current.push(leafletMarker)
    })
  }

  const isPointInPolygon = (lat, lng) => {
    const polygon = MAP_CONFIG.polygonBounds
    let inside = false

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0],
        yi = polygon[i][1]
      const xj = polygon[j][0],
        yj = polygon[j][1]

      if (
        (yi > lat !== yj > lat) &&
        lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
      ) {
        inside = !inside
      }
    }

    return inside
  }

  const handleMapClick = e => {
    const { lat, lng } = e.latlng

    if (!isPointInPolygon(lat, lng)) return

    const newMarker = {
      id: Date.now().toString(),
      lat,
      lng,
      comment: '',
      timestamp: Date.now(),
      saved: false
    }

    const updatedMarkers = [...markers, newMarker]
    setMarkers(updatedMarkers)

    addMarkersToMap([newMarker], true)
  }

//   const createPopupContent = (marker, leafletMarker) => {
//     const isMobile = window.innerWidth <= 768

//   const createPopupContent = (marker, leafletMarker) => {
//         const isMobile = typeof window !== "undefined" && window.innerWidth <= 768
      
//     const dialogContent = document.createElement('div')
//     dialogContent.className = `dialog-content${isMobile ? ' mobile' : ''}`

//     const isExistingMarker = marker.saved === true

//     if (isExistingMarker) {
//       const memoryText = document.createElement('p')
//       memoryText.className = `memory-text${isMobile ? ' mobile' : ''}`
//       memoryText.textContent = marker.comment
//       dialogContent.appendChild(memoryText)
//     } else {
//       const inputWrapper = document.createElement('div')
//       inputWrapper.className = `input-wrapper${isMobile ? ' mobile' : ''}`

//       const textarea = document.createElement('textarea')
//       textarea.className = `memory-textarea${isMobile ? ' mobile' : ''}`
//       textarea.placeholder = 'Tell us about a memory (20 characters min)...'
//       textarea.value = marker.comment

//       const saveButton = document.createElement('button')
//       saveButton.className = `save-memory-btn${isMobile ? ' mobile' : ''}`
//       saveButton.textContent = 'Save memory'
//       saveButton.disabled = textarea.value.trim().length < 20

//       textarea.addEventListener('input', () => {
//         const len = textarea.value.trim().length
//         saveButton.disabled = len < 20
//       })

//       let detachOnClose = attachRemoveOnClose(leafletMarker, textarea, marker.id)

//       saveButton.onclick = async () => {
//         const comment = textarea.value.trim()
//         if (comment.length < 20) return

//         saveButton.disabled = true
//         saveButton.textContent = 'Saving...'

//         try {
//           const savedMemory = await createMemory({
//             comment,
//             lat: marker.lat,
//             lng: marker.lng
//           })

//           if (savedMemory) {
//             const updatedMarkers = markers.map(m =>
//               m.id === marker.id
//                 ? {
//                     ...m,
//                     comment,
//                     timestamp: savedMemory.created_at
//                       ? new Date(savedMemory.created_at).getTime()
//                       : Date.now(),
//                     saved: true
//                   }
//                 : m
//             )
//             setMarkers(updatedMarkers)
//             detachOnClose()
            
//             leafletMarker.closePopup()
//           } else {
//             alert('Failed to save memory. Please try again.')
//           }
//         } catch (error) {
//           console.error('Error saving memory:', error)
//           alert('Failed to save memory. Please try again.')
//         } finally {
//           saveButton.disabled = false
//           saveButton.textContent = 'Save memory'
//         }
//       }

//       inputWrapper.appendChild(textarea)
//       inputWrapper.appendChild(saveButton)
//       dialogContent.appendChild(inputWrapper)
//     }

//     return dialogContent
//   }
const createPopupContent = (marker, leafletMarker) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768
    const dialogContent = document.createElement('div')
    dialogContent.className = `dialog-content${isMobile ? ' mobile' : ''}`
  
    // If already saved, show read-only memory text
    if (marker.saved) {
      const memoryText = document.createElement('p')
      memoryText.className = `memory-text${isMobile ? ' mobile' : ''}`
      memoryText.textContent = marker.comment
      dialogContent.appendChild(memoryText)
      return dialogContent
    }
  
    // Unsaved -> show input + save button
    const inputWrapper = document.createElement('div')
    inputWrapper.className = `input-wrapper${isMobile ? ' mobile' : ''}`
  
    const textarea = document.createElement('textarea')
    textarea.className = `memory-textarea${isMobile ? ' mobile' : ''}`
    textarea.placeholder = 'Tell us about a memory (20 characters min)...'
    textarea.value = marker.comment
  
    const saveButton = document.createElement('button')
    saveButton.className = `save-memory-btn${isMobile ? ' mobile' : ''}`
    saveButton.textContent = 'Save memory'
    saveButton.disabled = textarea.value.trim().length < 20
  
    textarea.addEventListener('input', () => {
      const len = textarea.value.trim().length
      saveButton.disabled = len < 20
    })
  
    // detachOnClose function returned from attachRemoveOnClose
    let detachOnClose = attachRemoveOnClose(leafletMarker, textarea, marker.id)
  
    saveButton.onclick = async () => {
      const comment = textarea.value.trim()
      if (comment.length < 20) return
  
      saveButton.disabled = true
      saveButton.textContent = 'Saving...'
  
      try {
        const savedMemory = await createMemory({
          comment,
          lat: marker.lat,
          lng: marker.lng
        })
  
        if (!savedMemory) {
          alert('Failed to save memory. Please try again.')
          return
        }
  
        // 1) Update React state safely (functional update to avoid stale closure)
        setMarkers(prev =>
          prev.map(m =>
            m.id === marker.id
              ? {
                  ...m,
                  comment,
                  timestamp: savedMemory.created_at
                    ? new Date(savedMemory.created_at).getTime()
                    : Date.now(),
                  saved: true
                }
              : m
          )
        )
  
        // 2) Detach the remove-on-close handler so popup-close won't remove marker
        if (typeof detachOnClose === 'function') detachOnClose()
  
        // 3) Build saved marker object and new popup content
        const savedMarker = {
          ...marker,
          comment,
          timestamp: savedMemory.created_at
            ? new Date(savedMemory.created_at).getTime()
            : Date.now(),
          saved: true
        }
        const newPopupContent = createPopupContent(savedMarker, leafletMarker)
  
        // 4) Replace popup content on the actual Leaflet popup instance
        // Use getPopup().setContent(...) if popup exists, otherwise rebind popup
        const popup = leafletMarker.getPopup && leafletMarker.getPopup()
        if (popup && typeof popup.setContent === 'function') {
          popup.setContent(newPopupContent)
        } else {
          // fallback: unbind and re-bind with same options
          leafletMarker.unbindPopup()
          leafletMarker.bindPopup(newPopupContent, {
            maxWidth: 420,
            minWidth: 220,
            className: 'custom-popup',
            offset: L.point(0, -20)
          })
        }
  
        // 5) Close the popup (or you could keep it open if you prefer)
        leafletMarker.closePopup()
      } catch (error) {
        console.error('Error saving memory:', error)
        alert('Failed to save memory. Please try again.')
      } finally {
        saveButton.disabled = false
        saveButton.textContent = 'Save memory'
      }
    }
  
    inputWrapper.appendChild(textarea)
    inputWrapper.appendChild(saveButton)
    dialogContent.appendChild(inputWrapper)
  
    return dialogContent
  }
  
  return (
    <div className="map-container">
      <div
        className="zoom-level-display"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#333',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        Zoom: {currentZoom}
      </div>

      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
