const el = document.documentElement
getComputedStyle(el).getPropertyValue('--el-color-primary')
el.style.setProperty('--el-color-primary', 'rgb(64, 158, 255)')
