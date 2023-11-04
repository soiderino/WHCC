import Pickr from '@simonwep/pickr'
import '@simonwep/pickr/dist/themes/classic.min.css'
import '@simonwep/pickr/dist/themes/nano.min.css'
import '@simonwep/pickr/dist/themes/monolith.min.css'
const { Registry } = require('rage-edit')
const tinycolor = require('tinycolor2')

import toast from 'react-hot-toast'

const hilight = await Registry.get('HKCU\\Control Panel\\Colors', 'Hilight')
const hotTrackingColor = await Registry.get('HKCU\\Control Panel\\Colors', 'HotTrackingColor')

document.getElementById('hilightBoxColor').style.backgroundColor = 'rgb(' + hilight + ')'
document.getElementById('hotTrackingBoxColor').style.backgroundColor =
  'rgb(' + hotTrackingColor + ')'

document.getElementById('hilightBoxText').textContent = hilight
document.getElementById('hotTrackingBoxText').textContent = hotTrackingColor

const pickr = Pickr.create({
  el: '#changeColor',
  theme: 'nano',
  useAsButton: true,
  autoReposition: true,
  components: {
    preview: true,
    opacity: false,
    hue: true,
    interaction: {
      save: true
    }
  }
})

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
}

pickr.on('save', (color) => {
  const hex = color.toHEXA().toString()

  const hilightColor = tinycolor(hex).toString('hex')
  const hotTrackingColor = tinycolor(hex).darken(9).toString('hex')

  document.getElementById('hilightBoxColor').style.backgroundColor = `${hilightColor}`
  document.getElementById('hotTrackingBoxColor').style.backgroundColor = `${hotTrackingColor}`

  document.getElementById('hilightBoxText').textContent = `${hexToRgb(hilightColor)}`.replace(
    /,/g,
    ' '
  )
  document.getElementById('hotTrackingBoxText').textContent = `${hexToRgb(
    hotTrackingColor
  )}`.replace(/,/g, ' ')
})

document.getElementById('saveColor').addEventListener('click', async () => {
  const hilightColor = document.getElementById('hilightBoxText').textContent
  const hotTrackingColor = document.getElementById('hotTrackingBoxText').textContent

  toast.success('Saved, please restart PC!', {
    duration: 3000
  })

  await Registry.set('HKCU\\Control Panel\\Colors', 'Hilight', hilightColor)
  await Registry.set('HKCU\\Control Panel\\Colors', 'HotTrackingColor', hotTrackingColor)
})

document.getElementById('resetColor').addEventListener('click', async () => {
  toast('Resetting!', {
    duration: 2000
  })

  await Registry.set('HKCU\\Control Panel\\Colors', 'Hilight', '0 120 215')
  await Registry.set('HKCU\\Control Panel\\Colors', 'HotTrackingColor', '0 102 204')

  setInterval(() => {
    window.location.reload()
  }, 2000)
})

// default colors
// hilight: 0 120 215
// hotTracking: 0 102 204
